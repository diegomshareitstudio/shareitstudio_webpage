/**
 * Interaction layer (runs on every page, imported from Layout).
 * Built on `motion` (the framework-free build of Framer Motion); Lenis smooths wheel scrolling on desktop only.
 * CSS in styles/motion.css handles the rest (reveals, marquee, hover lifts).
 * Everything here is progressive enhancement: the page is fully usable without it,
 * and none of it runs for visitors who ask for reduced motion.
 */
import { animate, inView, scroll, stagger } from 'motion';

const reduced = false; // animations are always on, regardless of the OS reduced-motion setting
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));

/** Work that can wait until the browser is idle, so it never competes with the first paint or the first tap. */
const idle = (fn: () => void) =>
  'requestIdleCallback' in window ? requestIdleCallback(fn, { timeout: 1500 }) : setTimeout(fn, 200);

if (!reduced) {
  // Smooth wheel scrolling only matters with a mouse/trackpad; touch screens keep native scrolling and skip the download
  if (finePointer) import('lenis').then(({ default: Lenis }) => new Lenis({ autoRaf: true, anchors: true }));
  hideHeaderOnScroll();
  splitHeadings();
  countUp();
  scrubText();
  popOnReveal();
  heroParallax();
  idle(() => {
    marqueeVelocity();
    decorateSections();
    spinOnScroll();
    footerSlide();
    ripple();
    confetti();
  });
}

/**
 * Every marquee reacts to scroll: down speeds it up, up runs it backwards.
 * The frame loop only runs while the page is moving and stops once the belts have settled.
 */
function marqueeVelocity() {
  const tracks = $$('.marquee-track')
    .map((el) => el.getAnimations()[0])
    .filter(Boolean);
  if (!tracks.length) return;
  const marquees = $$('.marquee');
  let rate = 1;
  let skew = 0;
  let lastY = window.scrollY;
  let running = false;
  const tick = () => {
    const y = window.scrollY;
    const velocity = y - lastY;
    lastY = y;
    const wantSkew = Math.max(-10, Math.min(-velocity * 0.45, 10));
    skew += (wantSkew - skew) * 0.12;
    if (Math.abs(skew) < 0.02) skew = 0;
    marquees.forEach((m) => m.style.setProperty('--skew', `${skew}deg`));
    const target = 1 + Math.max(-7, Math.min(velocity * 0.6, 7));
    rate += (target - rate) * 0.08;
    if (Math.abs(rate - 1) < 0.01) rate = 1;
    tracks.forEach((a) => (a.playbackRate = rate));
    running = velocity !== 0 || skew !== 0 || rate !== 1;
    if (running) requestAnimationFrame(tick);
  };
  window.addEventListener(
    'scroll',
    () => {
      if (running) return;
      running = true;
      lastY = window.scrollY;
      requestAnimationFrame(tick);
    },
    { passive: true },
  );
}

/** Sticky header tucks away while reading down and returns on scroll up. */
function hideHeaderOnScroll() {
  const header = document.querySelector<HTMLElement>('body > header');
  if (!header) return;
  let last = window.scrollY;
  let queued = false;
  window.addEventListener(
    'scroll',
    () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        const y = window.scrollY;
        const menuOpen = document.getElementById('menu-toggle')?.getAttribute('aria-expanded') === 'true';
        header.classList.toggle('is-scrolled', y > 24);
        header.classList.toggle('is-hidden', y > last && y > 240 && !menuOpen);
        last = y;
      });
    },
    { passive: true },
  );
}

/** Numbered badges (methodology steps) pop in with a little overshoot. */
function popOnReveal() {
  const nums = $$('.step-num');
  nums.forEach((n) => (n.style.opacity = '0'));
  inView(
    '.step-num',
    (el) => {
      animate(
        el,
        { opacity: [0, 1], scale: [0.2, 1], rotate: [-25, 0] },
        { type: 'spring', stiffness: 300, damping: 12 },
      );
    },
    { amount: 0.8 },
  );
}

/** Metrics ("+120%", "$1.2M", "3.4x") count up from zero every time they scroll into view. */
function countUp() {
  const targets = $$('.prose-sis dd, [data-count]');
  targets.forEach((el) => {
    const node = Array.from(el.childNodes).find((n) => n.nodeType === Node.TEXT_NODE && /\d/.test(n.textContent ?? ''));
    const match = node?.textContent?.match(/\d[\d,]*(\.\d+)?/);
    if (!node || !match) return;
    const [raw] = match;
    const to = parseFloat(raw.replace(/,/g, ''));
    const decimals = raw.split('.')[1]?.length ?? 0;
    const grouped = raw.includes(',');
    const fmt = (n: number) =>
      n.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        useGrouping: grouped,
      });
    const text = node.textContent!;
    const render = (n: number) => (node.textContent = text.replace(raw, fmt(n)));
    render(0);
    inView(
      el,
      () => {
        const counting = animate(0, to, { duration: 1.4, ease: [0.22, 1, 0.36, 1], onUpdate: render });
        // Returning a leave handler keeps the element observed, so the count replays on every re-entry
        return () => {
          counting.stop();
          render(0);
        };
      },
      { amount: 0.6 },
    );
  });
}

/** Hero shapes follow the mouse at different depths; the hero visual drifts as you scroll. */
function heroParallax() {
  const hero = document.querySelector<HTMLElement>('main > header');
  if (!hero) return;

  if (finePointer) {
    const layers = $$('.motion-float, [data-depth]', hero);
    let pointer: PointerEvent | undefined;
    window.addEventListener(
      'pointermove',
      (e) => {
        if (!pointer)
          requestAnimationFrame(() => {
            const x = (pointer!.clientX / innerWidth - 0.5) * 2;
            const y = (pointer!.clientY / innerHeight - 0.5) * 2;
            pointer = undefined;
            layers.forEach((el, i) => {
              const depth = Number(el.dataset.depth ?? 14 + (i % 3) * 10);
              el.style.translate = `${-x * depth}px ${-y * depth}px`;
            });
          });
        pointer = e;
      },
      { passive: true },
    );
  }

  const visual = hero.querySelector<HTMLElement>('.container-x > div:last-child');
  if (visual) {
    scroll(
      (progress: number) => {
        visual.style.translate = `0 ${progress * -70}px`;
      },
      { target: hero, offset: ['start start', 'end start'] },
    );
  }
}

/** Material-style ripple on every button. */
function ripple() {
  document.addEventListener('pointerdown', (e) => {
    const btn = (e.target as Element).closest<HTMLElement>('.btn-primary, .btn-dark, .btn-outline');
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const size = Math.max(r.width, r.height) * 2;
    const dot = document.createElement('span');
    dot.className = 'ripple';
    dot.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px`;
    btn.append(dot);
    animate(dot, { scale: [0, 1], opacity: [0.35, 0] }, { duration: 0.6, ease: 'easeOut' }).then(() => dot.remove());
  });
}

/** Section headings: words rise in one by one as they scroll into view. */
function splitHeadings() {
  $$('main h2').forEach((h2) => {
    if (h2.closest('.prose-sis, [data-no-split]') || h2.classList.contains('sr-only') || h2.closest('header')) return;
    const words: HTMLElement[] = [];
    const walk = (node: Node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === Node.ELEMENT_NODE) return walk(child);
        if (child.nodeType !== Node.TEXT_NODE || !child.textContent?.trim()) return;
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (!part.trim()) return frag.append(part);
          const w = document.createElement('span');
          w.className = 'split-word';
          w.textContent = part;
          w.style.opacity = '0';
          words.push(w);
          frag.append(w);
        });
        child.replaceWith(frag);
      });
    };
    walk(h2);
    inView(
      h2,
      () => {
        animate(
          words,
          { opacity: [0, 1], y: ['0.8em', 0], rotate: [6, 0] },
          { type: 'spring', stiffness: 200, damping: 16, delay: stagger(0.05) },
        );
      },
      { amount: 0.8 },
    );
  });
}

/** Floating shapes tucked behind each tinted section; they drift and spin with the scroll. */
function decorateSections() {
  const shapes = [
    '<span class="deco deco-ring" style="right:4%;top:8%;width:7rem;height:7rem"></span>',
    '<span class="deco deco-dot" style="left:3%;bottom:10%;width:2.5rem;height:2.5rem"></span>',
    '<span class="deco deco-plus" style="left:8%;top:12%">+</span>',
    '<span class="deco deco-star" style="right:7%;bottom:12%">✦</span>',
  ];
  $$('main > section.bg-brand-cream').forEach((section, i) => {
    if (section.querySelector('.prose-sis') || section.hasAttribute('data-no-deco')) return;
    section.classList.add('has-deco');
    section.insertAdjacentHTML('afterbegin', shapes.slice(i % 2 ? 2 : 0, i % 2 ? 4 : 2).join(''));
    $$('.deco', section).forEach((el, n) => {
      const dir = n % 2 ? 1 : -1;
      el.setAttribute('aria-hidden', 'true');
      scroll(
        (p: number) => {
          el.style.transform = `translateY(${(p - 0.5) * 140 * dir}px) rotate(${p * 360 * dir}deg)`;
        },
        { target: section, offset: ['start end', 'end start'] },
      );
    });
  });
}

/** The ✦ sparkles spin as the page scrolls. */
function spinOnScroll() {
  const stars = $$('.star-spin');
  if (!stars.length) return;
  scroll((p: number) => stars.forEach((s) => (s.style.rotate = `${p * 1440}deg`)));
}

/** Intro paragraphs light up word by word as you read down the page. */
function scrubText() {
  $$('.scrub-text').forEach((p) => {
    const words: HTMLElement[] = [];
    const walk = (node: Node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === Node.ELEMENT_NODE) return walk(child);
        if (child.nodeType !== Node.TEXT_NODE || !child.textContent?.trim()) return;
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (!part.trim()) return frag.append(part);
          const w = document.createElement('span');
          w.textContent = part;
          w.style.opacity = '0.18';
          words.push(w);
          frag.append(w);
        });
        child.replaceWith(frag);
      });
    };
    walk(p);
    scroll(
      (progress: number) => {
        const active = progress * (words.length + 4);
        words.forEach((w, i) => {
          const o = String(Math.round((0.18 + 0.82 * Math.max(0, Math.min(active - i, 1))) * 100) / 100);
          if (w.style.opacity !== o) w.style.opacity = o;
        });
      },
      { target: p, offset: ['start 0.92', 'start 0.5'] },
    );
  });
}

/** The giant "share it" in the footer slides in sideways as the footer arrives. */
function footerSlide() {
  const footer = document.querySelector('footer');
  const word = footer?.querySelector<HTMLElement>('p[aria-hidden]');
  if (!footer || !word) return;
  scroll(
    (p: number) => {
      word.style.translate = `${-30 + p * 30}% 0`;
    },
    { target: footer, offset: ['start end', 'end end'] },
  );
}

/** Primary buttons burst into confetti when pressed. */
function confetti() {
  const colors = ['#ffc845', '#ff8a00', '#1c3a3a', '#fff4d6'];
  document.addEventListener('pointerdown', (e) => {
    if (!(e.target as Element).closest('.btn-primary')) return;
    for (let i = 0; i < 26; i++) {
      const bit = document.createElement('span');
      const size = 6 + Math.random() * 7;
      bit.style.cssText = `position:fixed;z-index:90;pointer-events:none;left:${e.clientX}px;top:${e.clientY}px;width:${size}px;height:${size * (Math.random() > 0.5 ? 1 : 0.4)}px;background:${colors[i % colors.length]};border-radius:${Math.random() > 0.6 ? '50%' : '2px'}`;
      document.body.append(bit);
      const angle = Math.random() * Math.PI * 2;
      const dist = 60 + Math.random() * 150;
      animate(
        bit,
        {
          x: [0, Math.cos(angle) * dist],
          y: [0, Math.sin(angle) * dist - 40, Math.sin(angle) * dist + 120],
          rotate: [0, Math.random() * 720 - 360],
          opacity: [1, 1, 0],
        },
        { duration: 0.9 + Math.random() * 0.5, ease: 'easeOut' },
      ).then(() => bit.remove());
    }
  });
}
