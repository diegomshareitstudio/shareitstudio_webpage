/**
 * Landing-page choreography (imported only by pages/index.astro; shared effects stay in motion.ts).
 *
 * 1. Hero: the logo's spotlight grows from behind the headline until it floods the screen while the hero copy blurs
 *    out and the next message (the heading of “Results, up front”) comes in out of blur. The hero is pinned with
 *    plain CSS `position: sticky` for a short stretch; scroll progress drives everything (reversible, no timers).
 * 2. Selected work: a selector; the centred case shows its image, result and story, the neighbours only their image.
 *
 * Everything is progressive enhancement: with no JS, with reduced motion, or when the hero does not fit the
 * viewport, the page keeps its static stacked layout and all text stays visible.
 */
import { scroll } from 'motion';
import { initSelector } from './selector';

/** Every tunable number of the landing choreography. Pin length lives in styles/home.css (--pin); selector sizes in .wk. */
export const HOME_MOTION = {
  spot: {
    /** scroll progress (0–1 of the pinned stretch) over which the spotlight grows; it covers the screen at the end */
    range: [0.02, 0.6],
    /** head height as a share of the viewport height (desktop, mobile) and an absolute cap in px */
    heightVh: [0.6, 0.44],
    maxHeight: 560,
    /** scale safety margin beyond the farthest viewport corner */
    overshoot: 1.04,
  },
  sceneA: {
    /** hero copy fades and blurs out over this range (it holds still while the shape starts growing) */
    range: [0.3, 0.55],
    blur: [18, 0], // px, desktop / mobile (a full-screen blur is too costly to repaint while scrolling on phones)
    lift: -26, // px
  },
  sceneB: {
    /** the next message resolves out of blur over this range, only once the old one is nearly gone */
    range: [0.5, 0.8],
    blur: [16, 0],
    drop: 26,
  },
  exit: {
    /** share of its own height the spotlight tip retreats while services scrolls in */
    retreat: 0.92,
  },
  work: {
    /** seconds the centred result takes to count up */
    count: 1.1,
  },
} as const;

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const narrow = () => window.innerWidth < 768;

const clamp = (n: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, n));
const smooth = (t: number) => t * t * (3 - 2 * t);
const span = (p: number, [a, b]: readonly [number, number] | readonly number[]) => smooth(clamp((p - a) / (b - a)));
const setInert = (el: HTMLElement, on: boolean) => {
  el.inert = on;
};

// Head circle of the spotlight inside its 545×645 box (see components/ui/Spotlight.astro)
const HEAD = { cx: 330 / 545, cy: 215 / 645, r: 215 / 645 };
const BOX_RATIO = 545 / 645;

initHero();
initExit();
initWork();

function initHero() {
  const intro = document.querySelector<HTMLElement>('[data-home-intro]');
  const stage = intro?.querySelector<HTMLElement>('[data-stage]');
  const sceneA = stage?.querySelector<HTMLElement>('[data-scene-a]');
  const sceneB = stage?.querySelector<HTMLElement>('[data-scene-b]');
  const spot = stage?.querySelector<HTMLElement>('.home-spot');
  const inner = sceneA?.querySelector<HTMLElement>('.scene-inner');
  if (!intro || !stage || !sceneA || !sceneB || !spot || !inner) return;
  // The logo in the hero carries a copy of the spotlight; the big one takes its exact place
  const logo = sceneA.querySelector<HTMLElement>('[data-spot-logo]');

  const root = document.documentElement;
  let stopScroll: (() => void) | undefined;
  let lastP = 0;
  let smax = 1;

  /**
   * Does the hero copy fit one screen under the header? The type scales with the viewport height, so this only
   * fails on landscape phones or with heavy text zoom; the static layout is kinder there.
   */
  const fits = () => inner.offsetHeight + 96 <= window.innerHeight;

  // Style writes only when a value changes: the scroll callback runs every frame, and most frames change little
  const written = new WeakMap<Element, Map<string, string>>();
  const put = (el: HTMLElement, prop: string, value: string) => {
    let m = written.get(el);
    if (!m) written.set(el, (m = new Map()));
    if (m.get(prop) === value) return;
    m.set(prop, value);
    el.style.setProperty(prop, value);
  };
  const inertNow = new WeakMap<HTMLElement, boolean>();
  const setInertOnce = (el: HTMLElement, on: boolean) => {
    if (inertNow.get(el) === on) return;
    inertNow.set(el, on);
    setInert(el, on);
  };

  const resetInline = () => {
    [sceneA, sceneB, spot].forEach((el) => {
      el.removeAttribute('style');
      written.delete(el);
    });
    [sceneA, sceneB].forEach((el) => {
      inertNow.delete(el);
      setInert(el, false);
    });
    delete spot.dataset.placed;
    stage.removeAttribute('data-spot-placed');
    stage.classList.remove('is-filled');
  };

  /** Layout position of `el` inside the stage, from offsets: transforms (entrance, scroll lift) never skew it. */
  const offsetIn = (el: HTMLElement) => {
    let x = 0;
    let y = 0;
    let n: HTMLElement | null = el;
    while (n && n !== stage) {
      x += n.offsetLeft;
      y += n.offsetTop;
      n = n.offsetParent as HTMLElement | null;
    }
    return n === stage ? { x, y } : null;
  };

  /**
   * Lay the spotlight exactly over the logo's own copy of it (its box comes from the --spot-* custom properties of
   * .home-logo, the same ones the CSS uses) and work out the scale that covers the screen.
   */
  const layout = () => {
    const sw = stage.clientWidth;
    const sh = stage.clientHeight;
    const at = logo && offsetIn(logo);
    let w0: number, x0: number, y0: number;
    if (logo && at && logo.offsetWidth > 0) {
      const cs = getComputedStyle(logo);
      const pct = (name: string) => parseFloat(cs.getPropertyValue(name)) / 100;
      w0 = logo.offsetWidth * pct('--spot-w');
      x0 = at.x + logo.offsetWidth * pct('--spot-l');
      y0 = at.y + logo.offsetHeight * pct('--spot-t');
    } else {
      // No logo: to the right of the headline, as tall as the viewport allows
      const h = Math.min(window.innerHeight * HOME_MOTION.spot.heightVh[narrow() ? 1 : 0], HOME_MOTION.spot.maxHeight);
      w0 = h * BOX_RATIO;
      x0 = sw * 0.68 - w0 * HEAD.cx;
      y0 = sh * 0.4 - h * HEAD.cy;
    }
    const h0 = w0 / BOX_RATIO;
    const cx = x0 + w0 * HEAD.cx;
    const cy = y0 + h0 * HEAD.cy;

    put(spot, 'width', `${w0}px`);
    put(spot, 'height', `${h0}px`);
    put(spot, 'left', `${x0}px`);
    put(spot, 'top', `${y0}px`);
    put(spot, 'right', 'auto');

    // The head circle must reach the farthest corner; the oblique body then covers everything else.
    const reach = Math.max(Math.hypot(cx, cy), Math.hypot(sw - cx, cy), Math.hypot(cx, sh - cy), Math.hypot(sw - cx, sh - cy));
    smax = (reach / (h0 * HEAD.r)) * HOME_MOTION.spot.overshoot;
  };

  const update = (p: number) => {
    lastP = p;
    const mobile = narrow();

    // Linear in log-scale: the shape zooms at a steady perceived rate, visibly from the first pixels of scroll.
    const [g0, g1] = HOME_MOTION.spot.range;
    const grow = clamp((p - g0) / (g1 - g0));
    put(spot, 'transform', grow > 0 ? `scale(${Math.pow(smax, grow).toFixed(4)})` : 'none');
    stage.classList.toggle('is-filled', grow >= 1);

    const out = span(p, HOME_MOTION.sceneA.range);
    const outBlur = out * HOME_MOTION.sceneA.blur[mobile ? 1 : 0];
    put(sceneA, 'opacity', (1 - out).toFixed(3));
    put(sceneA, 'transform', out ? `translate3d(0, ${(out * HOME_MOTION.sceneA.lift).toFixed(1)}px, 0)` : 'none');
    put(sceneA, 'filter', outBlur > 0.2 ? `blur(${outBlur.toFixed(1)}px)` : 'none');
    put(sceneA, 'visibility', out >= 1 ? 'hidden' : 'visible');
    setInertOnce(sceneA, out > 0.6);

    const inn = span(p, HOME_MOTION.sceneB.range);
    const inBlur = (1 - inn) * HOME_MOTION.sceneB.blur[mobile ? 1 : 0];
    put(sceneB, 'opacity', inn.toFixed(3));
    put(sceneB, 'transform', inn < 1 ? `translate3d(0, ${((1 - inn) * HOME_MOTION.sceneB.drop).toFixed(1)}px, 0)` : 'none');
    put(sceneB, 'filter', inBlur > 0.2 ? `blur(${inBlur.toFixed(1)}px)` : 'none');
    put(sceneB, 'visibility', inn <= 0 ? 'hidden' : 'visible');
  };

  // `home-ready` is usually already on <html>: an inline script in pages/index.astro sets it before the first paint,
  // so the pinned layout never replaces the stacked one in front of the reader (layout shift). The scroll
  // choreography is tracked separately and only starts once the spotlight has been placed.
  const enable = () => {
    if (stopScroll) return;
    root.classList.add('home-ready');
    layout();
    // The big spotlight now sits exactly where the logo's copy is: swap them in the same frame (no fade, no seam)
    spot.dataset.placed = '';
    stage.setAttribute('data-spot-placed', '');
    stopScroll = scroll(update, { target: intro, offset: ['start start', 'end end'] }) as unknown as () => void;
    update(lastP);
  };
  const disable = () => {
    stopScroll?.();
    stopScroll = undefined;
    root.classList.remove('home-ready');
    resetInline();
  };

  const sync = () => {
    if (reduced.matches || !fits()) return disable();
    if (stopScroll) {
      layout();
      update(lastP);
    } else {
      enable();
    }
  };
  let raf = 0;
  const queue = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(sync);
  };

  // Re-place whenever the hero can have moved: fonts swapping in, the copy rewrapping, the window resizing.
  // Phones resize on every address-bar show/hide; the offsets above ignore the scroll lift, so nothing jumps.
  document.fonts.ready.then(queue);
  new ResizeObserver(queue).observe(inner);
  new ResizeObserver(queue).observe(stage);
  window.addEventListener('resize', queue);
  reduced.addEventListener('change', sync);
  sync();
}

/** Results → services: the enlarged lower tip of the spotlight retreats upward and uncovers the services surface. */
function initExit() {
  const tip = document.querySelector<SVGElement>('[data-spot-exit]');
  const section = tip?.closest<HTMLElement>('section');
  if (!tip || !section) return;
  let stop: (() => void) | undefined;
  const sync = () => {
    stop?.();
    stop = undefined;
    tip.style.transform = '';
    if (reduced.matches) return; // the tip stays as a still edge
    stop = scroll(
      (p: number) => {
        tip.style.transform = `translate3d(0, ${-p * HOME_MOTION.exit.retreat * 100}%, 0)`;
      },
      { target: section, offset: ['start end', 'start start'] },
    ) as unknown as () => void;
  };
  sync();
  reduced.addEventListener('change', sync);
}

/** Selected work: the shared selector (scripts/selector.ts); here the centred result also counts up. */
function initWork() {
  const root = document.querySelector<HTMLElement>('[data-wk]');
  if (!root) return;
  const selector = initSelector(root, countUp);
  if (!selector) return;
  // The first result counts up once the reader actually sees it
  new IntersectionObserver(
    (entries, io) => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      countUp(selector.active());
    },
    { threshold: 0.5 },
  ).observe(selector.stage);
}

/** The result of the centred case counts up from zero; the final text is always restored at the end. */
function countUp(slide: HTMLElement) {
  const el = slide.querySelector<HTMLElement>('[data-wk-count]');
  const final = el?.dataset.wkCount;
  const match = final?.match(/\d[\d,]*(\.\d+)?/);
  if (!el || !final || !match || reduced.matches) return;
  const [raw] = match;
  const to = parseFloat(raw.replace(/,/g, ''));
  const decimals = raw.split('.')[1]?.length ?? 0;
  const start = performance.now();
  const duration = HOME_MOTION.work.count * 1000;
  const frame = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = t < 1 ? final.replace(raw, (to * eased).toFixed(decimals)) : final;
    if (t < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}
