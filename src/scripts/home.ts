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
