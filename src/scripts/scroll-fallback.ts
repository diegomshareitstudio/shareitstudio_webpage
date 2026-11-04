/**
 * Scroll-driven animations for browsers without CSS `animation-timeline` (Firefox, Safari before 26).
 * Chrome, Edge and Android run these effects natively from styles/motion.css and styles/home.css; there this file
 * is never downloaded (scripts/motion.ts only imports it when `CSS.supports` says no).
 *
 * Those browsers drop `animation-timeline` and `animation-range` while parsing the CSS, so the rules can't be read
 * back from the stylesheet: they are mirrored here. KEEP IN SYNC with the `@supports (animation-timeline: view())`
 * blocks in motion.css and home.css (same selectors, keyframes and ranges).
 *
 * How it works: each element gets a paused Web Animation with the same keyframes; on every scroll frame its
 * progress through the CSS range (entry / cover / exit of the viewport, or a scroll offset) sets the animation time.
 */

type Range = 'entry' | 'cover' | 'exit';
type Edge = [Range, number];
type Frames = Keyframe[];

const DURATION = 1000;

const KEYFRAMES: Record<string, Frames> = {
  rise: [
    { opacity: 0, transform: 'translateY(1.25rem)' },
    { opacity: 1, transform: 'none' },
  ],
  riseTiltLeft: [
    { opacity: 0, transform: 'translateY(2.5rem) rotate(-2.5deg) scale(0.94)' },
    { opacity: 1, transform: 'none' },
  ],
  riseTiltRight: [
    { opacity: 0, transform: 'translateY(2.5rem) rotate(2.5deg) scale(0.94)' },
    { opacity: 1, transform: 'none' },
  ],
  slideFromLeft: [
    { opacity: 0, transform: 'translateX(-3rem)' },
    { opacity: 1, transform: 'none' },
  ],
  wipeX: [
    { clipPath: 'inset(0 100% 0 0 round 1.5rem)', scale: '0.92' },
    { clipPath: 'inset(0 0 0 0 round 1.5rem)', scale: '1' },
  ],
  wipeY: [
    { clipPath: 'inset(100% 0 0 0 round 1.5rem)', rotate: '3deg' },
    { clipPath: 'inset(0 0 0 0 round 1.5rem)', rotate: '0deg' },
  ],
  iris: [
    { clipPath: 'circle(0% at 50% 50%)', scale: '0.8' },
    { clipPath: 'circle(80% at 50% 50%)', scale: '1' },
  ],
  drawMarker: [{ backgroundSize: '0% 100%' }, { backgroundSize: '100% 100%' }],
  bandTilt: [
    { transform: 'rotate(-1.5deg) scale(1.02)' },
    { transform: 'none', offset: 0.5 },
    { transform: 'rotate(1.5deg) scale(1.02)' },
  ],
  grow: [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }],
  show: [
    { opacity: 0, visibility: 'hidden', transform: 'translateY(0.75rem)' },
    { opacity: 1, visibility: 'visible', transform: 'none' },
  ],
  workOpen: [{ clipPath: 'inset(0 5% 0 5% round 3rem)' }, { clipPath: 'inset(0 0 0 0 round 0)' }],
};

/** Position of the element in the page, ignoring its own transforms (like a CSS view timeline does) */
const pageTop = (el: HTMLElement) => {
  let top = 0;
  for (let node: HTMLElement | null = el; node; node = node.offsetParent as HTMLElement | null) top += node.offsetTop;
  return top;
};

/**
 * A CSS view timeline follows the nearest scroll container. Inside one that doesn't scroll (overflow: hidden/auto on a
 * carousel or a clipped card) the timeline is inactive and the element simply shows as normal, so it is skipped here.
 */
const scrollsWithPage = (el: HTMLElement) => {
  for (let node = el.parentElement; node && node !== document.body; node = node.parentElement) {
    const { overflowX, overflowY } = getComputedStyle(node);
    if (/hidden|auto|scroll/.test(overflowX + overflowY)) return false;
  }
  return true;
};

interface Tracked {
  animation: Animation;
  progress: () => number;
}

const clamp = (n: number) => Math.min(1, Math.max(0, n));

/** Progress through a view-timeline range, from `start` to `end`, e.g. [['entry', 0], ['entry', 40]] */
function viewTrack(el: HTMLElement, frames: Frames, start: Edge, end: Edge): Tracked | null {
  if (!scrollsWithPage(el)) return null;
  let top = pageTop(el);
  let height = el.offsetHeight;
  const refresh = () => {
    top = pageTop(el);
    height = el.offsetHeight;
  };
  layoutListeners.push(refresh);
  const animation = el.animate(frames, { duration: DURATION, fill: 'both', easing: 'linear' });
  animation.pause();
  return {
    animation,
    progress: () => {
      const viewport = window.innerHeight;
      // How far the element's top edge has travelled past the bottom of the viewport
      const travelled = viewport - (top - window.scrollY);
      const span = Math.min(height, viewport);
      const at = ([range, percent]: Edge) =>
        range === 'entry'
          ? (percent / 100) * span
          : range === 'exit'
            ? viewport + height - (1 - percent / 100) * span
            : (percent / 100) * (viewport + height);
      const from = at(start);
      const to = at(end);
      return clamp((travelled - from) / (to - from || 1));
    },
  };
}

/** Progress through the page scroll; `range` in px, or the whole page */
function scrollTrack(el: HTMLElement, frames: Frames, range?: [number, number]): Tracked {
  const animation = el.animate(frames, { duration: DURATION, fill: 'both', easing: 'linear' });
  animation.pause();
  return {
    animation,
    progress: () => {
      const y = window.scrollY;
      if (range) return clamp((y - range[0]) / (range[1] - range[0]));
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return max > 0 ? clamp(y / max) : 0;
    },
  };
}

const layoutListeners: (() => void)[] = [];

/** Elements of `main > section` matching `selector`, outside long-form articles (.prose-sis) */
const inSections = (selector: string) =>
  Array.from(document.querySelectorAll<HTMLElement>(`main > section ${selector}`)).filter(
    (el) => !el.closest('.prose-sis'),
  );

/** 1-based position among its siblings, like :nth-child */
const nth = (el: Element) => Array.prototype.indexOf.call(el.parentElement?.children ?? [], el) + 1;

export function startScrollFallback() {
  const tracked: Tracked[] = [];
  const add = (t: Tracked | null) => t && tracked.push(t);

  // Section headings rise in (motion.css: rise, entry 0%–40%)
  for (const h2 of inSections('h2')) add(viewTrack(h2, KEYFRAMES.rise, ['entry', 0], ['entry', 40]));

  // Grid cards: alternating tilt, staggered ranges by position (4n+1 … 4n)
  for (const li of inSections(':is(ul, ol).grid > li')) {
    const i = nth(li);
    const delay = [18, 0, 6, 12][i % 4];
    const frames = i % 2 === 0 ? KEYFRAMES.riseTiltRight : KEYFRAMES.riseTiltLeft;
    add(viewTrack(li, frames, ['entry', delay], ['entry', delay + 40]));
  }

  // Case-study rows slide in (entry 0%–50%)
  for (const li of inSections('ul.divide-y > li'))
    add(viewTrack(li, KEYFRAMES.slideFromLeft, ['entry', 0], ['entry', 50]));

  // Image placeholders: wipe across, wipe up, or iris, by the position of their list item (entry 0% – cover 35%)
  for (const el of inSections('.placeholder')) {
    const li = el.closest('li');
    const i = li ? nth(li) : 1;
    const frames = li && i % 3 === 2 ? KEYFRAMES.wipeY : li && i % 3 === 0 ? KEYFRAMES.iris : KEYFRAMES.wipeX;
    add(viewTrack(el, frames, ['entry', 0], ['cover', 35]));
  }

  // Highlighter marker is drawn as its section arrives (entry 30%–90%)
  for (const el of inSections('.marker')) add(viewTrack(el, KEYFRAMES.drawMarker, ['entry', 30], ['entry', 90]));

  // Text bands sway as they cross the screen (entry 0% – exit 100%)
  for (const el of document.querySelectorAll<HTMLElement>('.marquee--text'))
    add(viewTrack(el, KEYFRAMES.bandTilt, ['entry', 0], ['exit', 100]));

  // Homepage: the selected-work surface opens out (home.css, entry 0%–45%)
  for (const el of document.querySelectorAll<HTMLElement>('.home-work'))
    add(viewTrack(el, KEYFRAMES.workOpen, ['entry', 0], ['entry', 45]));

  // Reading-progress bar and back-to-top button (hidden by default in motion.css)
  const bar = document.querySelector<HTMLElement>('.scroll-progress');
  if (bar) {
    bar.style.display = 'block';
    bar.style.transformOrigin = '0 50%';
    tracked.push(scrollTrack(bar, KEYFRAMES.grow));
  }
  const backToTop = document.querySelector<HTMLElement>('.back-to-top');
  if (backToTop) {
    backToTop.style.display = 'grid';
    tracked.push(scrollTrack(backToTop, KEYFRAMES.show, [500, 800]));
  }

  let queued = false;
  const update = () => {
    queued = false;
    for (const t of tracked) t.animation.currentTime = t.progress() * DURATION;
  };
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  };
  const relayout = () => {
    for (const refresh of layoutListeners) refresh();
    schedule();
  };

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', relayout);
  window.addEventListener('load', relayout);
  // Images, fonts and the pinned hero change the page height after start-up
  new ResizeObserver(relayout).observe(document.body);
  update();
}
