/**
 * Landing-page choreography (imported only by pages/index.astro; shared effects stay in motion.ts).
 *
 * 1. Hero: the logo's spotlight grows from behind the headline until it floods the screen while the hero copy blurs
 *    out and the next message (the heading of “Results, up front”) comes in out of blur. The hero is pinned with
 *    plain CSS `position: sticky` for a short stretch; scroll progress drives everything (reversible, no timers).
 * 2. Selected work: bands of portrait cards drift right → left on their own inside the normal document flow.
 *
 * Everything is progressive enhancement: with no JS, with reduced motion, or when the hero does not fit the
 * viewport, the page keeps its static stacked layout and all text stays visible.
 */
import { scroll } from 'motion';

/** Every tunable number of the landing choreography. Pin length and band gap live in styles/home.css (--pin, --work-gap). */
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
  band: {
    /** px per second, desktop / narrow screens */
    speed: [44, 32],
    /** seconds for the band to glide to a stop on hover/focus/pause, and to pick up speed again */
    ease: 0.2,
  },
  cursor: {
    /** ms the “View” label stays on while the pointer crosses the gap between two cards */
    linger: 140,
  },
} as const;

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const coarse = window.matchMedia('(hover: none) and (pointer: coarse)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
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
initBand();

function initHero() {
  const intro = document.querySelector<HTMLElement>('[data-home-intro]');
  const stage = intro?.querySelector<HTMLElement>('[data-stage]');
  const sceneA = stage?.querySelector<HTMLElement>('[data-scene-a]');
  const sceneB = stage?.querySelector<HTMLElement>('[data-scene-b]');
  const spot = stage?.querySelector<HTMLElement>('.home-spot');
  const inner = sceneA?.querySelector<HTMLElement>('.scene-inner');
  if (!intro || !stage || !sceneA || !sceneB || !spot || !inner) return;

  const root = document.documentElement;
  let stopScroll: (() => void) | undefined;
  let lastP = 0;
  let smax = 1;

  /**
   * Does the hero copy fit one screen under the header? The type scales with the viewport height, so this only
   * fails on landscape phones or with heavy text zoom; the static layout is kinder there.
   */
  const fits = () => inner.offsetHeight + 96 <= window.innerHeight;

  const resetInline = () => {
    [sceneA, sceneB].forEach((el) => {
      el.removeAttribute('style');
      setInert(el, false);
    });
    spot.removeAttribute('style');
    delete spot.dataset.placed;
    stage.classList.remove('is-filled');
  };

  /** Place the spotlight behind the highlighted words of the headline and work out the scale that covers the screen. */
  const layout = () => {
    const anchor = sceneA.querySelector<HTMLElement>('[data-spot-anchor]');
    const sr = stage.getBoundingClientRect();
    const mobile = narrow();
    const h0 = Math.min(window.innerHeight * HOME_MOTION.spot.heightVh[mobile ? 1 : 0], HOME_MOTION.spot.maxHeight, mobile ? window.innerWidth * 0.95 : Infinity);
    const w0 = h0 * BOX_RATIO;

    let cx = sr.width * 0.68;
    let cy = sr.height * 0.4;
    if (anchor) {
      const rects = Array.from(anchor.getClientRects());
      const big = rects.sort((a, b) => b.width - a.width)[0];
      if (big) {
        // like the logo: the head sits behind the words, the tail trails off down and to the left
        cx = big.left - sr.left + big.width / 2 + w0 * 0.1;
        cy = big.top - sr.top + big.height / 2 - h0 * 0.06;
      }
    }
    cx = clamp(cx, w0 * 0.25, sr.width - w0 * 0.25);

    Object.assign(spot.style, {
      width: `${w0}px`,
      height: `${h0}px`,
      left: `${cx - w0 * HEAD.cx}px`,
      top: `${cy - h0 * HEAD.cy}px`,
      right: 'auto',
    });

    // The head circle must reach the farthest corner; the oblique body then covers everything else.
    const reach = Math.max(
      Math.hypot(cx, cy),
      Math.hypot(sr.width - cx, cy),
      Math.hypot(cx, sr.height - cy),
      Math.hypot(sr.width - cx, sr.height - cy),
    );
    smax = (reach / (h0 * HEAD.r)) * HOME_MOTION.spot.overshoot;
  };

  const update = (p: number) => {
    lastP = p;
    const mobile = narrow();

    // Linear in log-scale: the shape zooms at a steady perceived rate, visibly from the first pixels of scroll.
    const [g0, g1] = HOME_MOTION.spot.range;
    const grow = clamp((p - g0) / (g1 - g0));
    spot.style.transform = grow > 0 ? `scale(${Math.pow(smax, grow)})` : '';
    stage.classList.toggle('is-filled', grow >= 1);

    const out = span(p, HOME_MOTION.sceneA.range);
    const outBlur = out * HOME_MOTION.sceneA.blur[mobile ? 1 : 0];
    sceneA.style.opacity = String(1 - out);
    sceneA.style.transform = out ? `translate3d(0, ${out * HOME_MOTION.sceneA.lift}px, 0)` : '';
    sceneA.style.filter = outBlur > 0.2 ? `blur(${outBlur}px)` : '';
    sceneA.style.visibility = out >= 1 ? 'hidden' : '';
    setInert(sceneA, out > 0.6);

    const inn = span(p, HOME_MOTION.sceneB.range);
    const inBlur = (1 - inn) * HOME_MOTION.sceneB.blur[mobile ? 1 : 0];
    sceneB.style.opacity = String(inn);
    sceneB.style.transform = inn < 1 ? `translate3d(0, ${(1 - inn) * HOME_MOTION.sceneB.drop}px, 0)` : '';
    sceneB.style.filter = inBlur > 0.2 ? `blur(${inBlur}px)` : '';
    sceneB.style.visibility = inn <= 0 ? 'hidden' : '';
  };

  // `home-ready` is usually already on <html>: an inline script in pages/index.astro sets it before the first paint,
  // so the pinned layout never replaces the stacked one in front of the reader (layout shift). The scroll
  // choreography is tracked separately and only starts once the spotlight has been measured.
  const enable = () => {
    if (stopScroll) return;
    root.classList.add('home-ready');
    layout();
    spot.dataset.placed = '';
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

  // Wait for fonts: they change how the headline wraps, and the spotlight is anchored to it.
  document.fonts.ready.then(sync);
  let raf = 0;
  window.addEventListener('resize', () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(sync);
  });
  reduced.addEventListener('change', sync);
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

/** Selected work: bands of portrait cards that scroll themselves right → left. */
function initBand() {
  const band = document.querySelector<HTMLElement>('[data-band]');
  const track = band?.querySelector<HTMLElement>('.work-track');
  const set = band?.querySelector<HTMLElement>('[data-band-set]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-band-toggle]');
  const label = toggle?.querySelector<HTMLElement>('[data-band-toggle-label]');
  if (!band || !track || !set) return;

  let paused = false;
  let lastWidth = 0;
  let token = 0;

  const clearClones = () => track.querySelectorAll('[data-clone]').forEach((n) => n.remove());

  /** Reduced motion and touch screens get a manual, swipeable gallery: no autoplay, no vertical-gesture capture. */
  const canAutoplay = () => !reduced.matches && !coarse.matches;

  const build = async () => {
    const mine = ++token;
    clearClones();
    band.style.removeProperty('--shift');
    band.scrollLeft = 0;

    if (!canAutoplay()) {
      band.dataset.mode = 'manual';
      if (toggle) toggle.hidden = true;
      return;
    }

    // Card widths come from CSS and images carry their own dimensions, so only fonts can change the measurement.
    // (Waiting for the lazy images would delay the switch until the band is on screen: a visible layout shift.)
    await document.fonts.ready;
    if (mine !== token) return;

    band.dataset.mode = 'auto'; // the seam padding is part of the measurement
    const setWidth = set.getBoundingClientRect().width;
    if (!setWidth) return;

    // Enough copies that the visible window never runs out while one set slides away.
    const copies = Math.ceil(window.innerWidth / setWidth);
    for (let i = 0; i < Math.max(1, copies); i++) {
      const clone = set.cloneNode(true) as HTMLElement;
      clone.removeAttribute('data-band-set');
      clone.dataset.clone = '';
      // Duplicates stay clickable for the mouse, but are skipped by Tab and not announced by screen readers.
      // (Not `inert`: that would also make them dead to the pointer.)
      clone.setAttribute('aria-hidden', 'true');
      clone.querySelectorAll('a, button').forEach((n) => n.setAttribute('tabindex', '-1'));
      clone.querySelectorAll('[id]').forEach((n) => n.removeAttribute('id'));
      // The count-up only runs on the original set, which may still read 0 or be mid-count: show the final figure.
      clone.querySelectorAll<HTMLElement>('[data-count]').forEach((n) => {
        if (n.dataset.count) n.textContent = n.dataset.count;
      });
      track.append(clone);
    }

    const speed = HOME_MOTION.band.speed[narrow() ? 1 : 0];
    band.style.setProperty('--shift', `${setWidth}px`);
    band.style.setProperty('--work-duration', `${setWidth / speed}s`);
    if (toggle) toggle.hidden = false;
  };

  const rebuildIfWidthChanged = () => {
    if (Math.abs(window.innerWidth - lastWidth) < 1) return;
    lastWidth = window.innerWidth;
    build();
  };
  lastWidth = window.innerWidth;
  build();
  let t = 0;
  window.addEventListener('resize', () => {
    clearTimeout(t);
    t = window.setTimeout(rebuildIfWidthChanged, 150);
  });
  reduced.addEventListener('change', build);
  coarse.addEventListener('change', build);

  // Hover, keyboard focus and the pause button all ease the band to a stop (and back), instead of freezing it:
  // one loop eases the animation's playbackRate towards 0 or 1. Resuming continues from where it stopped.
  let hovered = false;
  let focused = false;
  let rate = 1;
  let last = 0;
  let easing = false;
  const ease = (now: number) => {
    const anim = track.getAnimations()[0];
    const target = hovered || focused || paused ? 0 : 1;
    const dt = last ? Math.min((now - last) / 1000, 0.1) : 0.016;
    last = now;
    rate += (target - rate) * (1 - Math.exp(-dt / HOME_MOTION.band.ease));
    if (Math.abs(target - rate) < 0.002) rate = target;
    if (anim) anim.playbackRate = rate;
    if (rate !== target) requestAnimationFrame(ease);
    else easing = false;
  };
  const settle = () => {
    if (easing) return;
    easing = true;
    last = 0;
    requestAnimationFrame(ease);
  };

  band.addEventListener('pointerenter', (e) => {
    if (e.pointerType !== 'mouse') return;
    hovered = true;
    settle();
  });
  band.addEventListener('pointerleave', () => {
    hovered = false;
    settle();
  });
  band.addEventListener('focusin', () => {
    focused = true;
    settle();
  });
  band.addEventListener('focusout', (e) => {
    if (band.contains(e.relatedTarget as Node)) return;
    focused = false;
    settle();
    // undo the browser's scroll-into-view offset on the clipped band
    if (band.dataset.mode === 'auto') band.scrollLeft = 0;
  });

  // Explicit pause control
  toggle?.addEventListener('click', () => {
    paused = !paused;
    toggle.setAttribute('aria-pressed', String(paused));
    if (label) label.textContent = paused ? 'Play motion' : 'Pause motion';
    settle();
  });

  // Don't animate what nobody can see
  new IntersectionObserver(([entry]) => band.classList.toggle('is-offscreen', !entry.isIntersecting), { rootMargin: '100px' }).observe(band);

  initCursor(band);
}

/**
 * Decorative “View” label that follows the pointer over a project card. Links keep working and keep their own names.
 * What is under the pointer is re-checked every frame, because the cards keep moving (and the page may scroll)
 * under a pointer that stands still.
 */
function initCursor(band: HTMLElement) {
  const cursor = document.querySelector<HTMLElement>('[data-work-cursor]');
  if (!cursor || !finePointer.matches) return;
  const half = () => cursor.offsetWidth / 2;
  let x = 0;
  let y = 0;
  let tx = 0;
  let ty = 0;
  let inside = false;
  let on = false;
  let offAt = 0;
  let running = false;

  const overCard = () => {
    const el = document.elementFromPoint(tx, ty);
    return !!el && band.contains(el) && !!el.closest('.work-link');
  };

  const frame = (now: number) => {
    const over = inside && overCard();
    if (over) {
      if (!on) {
        x = tx; // appear right under the pointer, not sliding in from its last spot
        y = ty;
      }
      on = true;
      offAt = 0;
    } else if (on) {
      offAt ||= now;
      if (!inside || now - offAt > HOME_MOTION.cursor.linger) on = false;
    }
    cursor.classList.toggle('is-on', on);

    x += (tx - x) * 0.25;
    y += (ty - y) * 0.25;
    const h = half();
    cursor.style.translate = `${x - h}px ${y - h}px`;

    if (inside || on || Math.abs(tx - x) + Math.abs(ty - y) > 0.5) requestAnimationFrame(frame);
    else running = false;
  };
  const start = () => {
    if (running) return;
    running = true;
    requestAnimationFrame(frame);
  };

  band.addEventListener('pointerenter', (e) => {
    if (e.pointerType !== 'mouse') return;
    inside = true;
    tx = e.clientX;
    ty = e.clientY;
    start();
  });
  band.addEventListener('pointermove', (e) => {
    tx = e.clientX;
    ty = e.clientY;
  });
  band.addEventListener('pointerleave', () => {
    inside = false;
  });
}
