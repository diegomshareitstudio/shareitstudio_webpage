/**
 * Site-wide motion layer (uses `motion`, the vanilla successor of Framer Motion).
 * Everything is progressive enhancement: with JS off or `prefers-reduced-motion`, content just shows.
 *
 *  - Reveal on scroll: auto-targets section headings, blocks, card grids (staggered) and article content.
 *    Opt in/out manually with data-reveal="up|left|right|scale|fade" / data-no-reveal.
 *  - Hero intro (stagger on load) via [data-hero-intro], parallax drift via [data-parallax="0.15"].
 *  - Scroll progress bar, header elevation, magnetic primary buttons, animated FAQ accordions.
 */
import { animate, inView, scroll, stagger } from 'motion';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduced) {
  init();
}

type Variant = 'up' | 'left' | 'right' | 'scale' | 'fade';

const from = (v: Variant) => {
  switch (v) {
    case 'left':
      return { opacity: 0, x: -40 };
    case 'right':
      return { opacity: 0, x: 40 };
    case 'scale':
      return { opacity: 0, scale: 0.92 };
    case 'fade':
      return { opacity: 0 };
    default:
      return { opacity: 0, y: 32 };
  }
};

const to = { opacity: 1, x: 0, y: 0, scale: 1 };
const ease = [0.22, 1, 0.36, 1] as const;

function hide(el: HTMLElement, v: Variant) {
  const f = from(v) as Record<string, number>;
  el.style.opacity = '0';
  el.style.transform = `translate(${f.x ?? 0}px, ${f.y ?? 0}px) scale(${f.scale ?? 1})`;
  el.style.willChange = 'transform, opacity';
}

function reveal(els: HTMLElement[], v: Variant, step = 0.08, delay = 0) {
  els.forEach((el) => hide(el, v));
  return (trigger: Element) =>
    inView(
      trigger,
      () => {
        animate(
          els,
          { opacity: 1, transform: 'translate(0px, 0px) scale(1)' },
          { duration: 0.8, ease, delay: stagger(step, { startDelay: delay }) },
        ).finished.then(() =>
          els.forEach((el) => {
            el.style.transform = '';
            el.style.opacity = '';
            el.style.willChange = '';
          }),
        );
      },
      { amount: 0.2, margin: '0px 0px -8% 0px' },
    );
}

function init() {
  const main = document.querySelector('main');
  if (!main) return;
  const taken = new WeakSet<Element>();
  const claim = (el: Element) => (taken.has(el) || el.closest('[data-no-reveal]') ? false : (taken.add(el), true));

  /* ---- Hero intro ---- */
  main.querySelectorAll<HTMLElement>('[data-hero-intro]').forEach((hero) => {
    const kids = Array.from(hero.children) as HTMLElement[];
    kids.forEach((k) => {
      claim(k);
      hide(k, 'up');
    });
    animate(kids, { opacity: 1, transform: 'translate(0px, 0px) scale(1)' }, { duration: 0.9, ease, delay: stagger(0.1, { startDelay: 0.1 }) });
    hero.querySelectorAll('li').forEach((li) => taken.add(li));
  });
  main.querySelectorAll<HTMLElement>('[data-hero-visual]').forEach((v) => {
    claim(v);
    hide(v, 'right');
    animate(v, { opacity: 1, transform: 'translate(0px, 0px) scale(1)' }, { duration: 1, ease, delay: 0.25 });
  });

  /* ---- Explicit [data-reveal] ---- */
  main.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    if (!claim(el)) return;
    const v = (el.dataset.reveal || 'up') as Variant;
    reveal([el], v, 0, Number(el.dataset.revealDelay ?? 0))(el);
  });

  /* ---- Lists / grids: children stagger together ---- */
  main
    .querySelectorAll<HTMLElement>('section ul, section ol, [data-stagger]')
    .forEach((list) => {
      if (list.closest('.marquee, .prose-sis, details, [data-no-reveal]')) return;
      const items = Array.from(list.children).filter((c) => c.tagName === 'LI' || list.hasAttribute('data-stagger')) as HTMLElement[];
      const fresh = items.filter((i) => !taken.has(i) && !i.closest('[data-hero-intro]'));
      if (fresh.length < 2) return;
      fresh.forEach((i) => taken.add(i));
      taken.add(list);
      reveal(fresh, 'up', 0.09)(list);
    });

  /* ---- Section headings and loose blocks ---- */
  main
    .querySelectorAll<HTMLElement>('section h2, section .eyebrow, section > .container-x > p, section > .container-x > a, section a.btn-outline, section article, section figure, section > .container-x > div > p')
    .forEach((el) => {
      if (el.closest('.prose-sis, .marquee, [data-hero-intro], header')) return;
      if (!claim(el) || el.closest('[data-stagger]')) return;
      // Skip anything already inside a staggered item
      if (el.closest('li') && taken.has(el.closest('li') as Element)) return;
      reveal([el], 'up')(el);
    });

  /* ---- Long-form articles / case studies ---- */
  main
    .querySelectorAll<HTMLElement>('.prose-sis h2, .prose-sis h3, .prose-sis > .article-body > section > p, .prose-sis figure, .prose-sis blockquote, .prose-sis aside, .prose-sis dl, .prose-sis .table-wrap, .prose-sis ol.steps-list > li, .prose-sis ul > li')
    .forEach((el) => {
      if (!claim(el)) return;
      reveal([el], el.matches('blockquote, aside, dl, figure') ? 'scale' : 'up', 0)(el);
    });

  /* ---- Alternating side reveals for 2-column "split" blocks ---- */
  main.querySelectorAll<HTMLElement>('[data-reveal-split]').forEach((wrap) => {
    const [a, b] = Array.from(wrap.children) as HTMLElement[];
    if (a && claim(a)) reveal([a], 'left')(a);
    if (b && claim(b)) reveal([b], 'right', 0, 0.1)(b);
  });

  /* ---- Parallax ---- */
  main.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const speed = Number(el.dataset.parallax || 0.15);
    scroll(animate(el, { y: [-120 * speed, 120 * speed] }, { ease: 'linear' }), { target: el, offset: ['start end', 'end start'] });
  });

  /* ---- Floating decorative shapes ---- */
  document.querySelectorAll<HTMLElement>('[data-float]').forEach((el, i) => {
    animate(el, { y: [0, i % 2 ? 14 : -14, 0] }, { duration: 5 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 });
  });

  progressBar();
  headerElevation();
  magneticButtons();
  smoothDetails();
}

/** Thin yellow bar at the top showing page scroll progress. */
function progressBar() {
  const bar = document.createElement('div');
  bar.setAttribute('aria-hidden', 'true');
  bar.className = 'fixed left-0 top-0 z-[70] h-1 w-full origin-left bg-brand-yellow';
  bar.style.transform = 'scaleX(0)';
  document.body.appendChild(bar);
  scroll(animate(bar, { transform: ['scaleX(0)', 'scaleX(1)'] }, { ease: 'linear' }));
}

/** Header gains a soft shadow once the page is scrolled. */
function headerElevation() {
  const header = document.querySelector<HTMLElement>('body > header');
  if (!header) return;
  header.style.transition = 'box-shadow .3s ease';
  const update = () => {
    header.style.boxShadow = window.scrollY > 8 ? '0 8px 24px -12px rgba(28,58,58,.25)' : 'none';
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
}

/** Primary buttons subtly follow the cursor (fine pointers only). */
function magneticButtons() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  document.querySelectorAll<HTMLElement>('.btn-primary, .btn-dark').forEach((btn) => {
    btn.addEventListener('pointermove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * 0.18;
      const y = (e.clientY - (r.top + r.height / 2)) * 0.28;
      animate(btn, { x, y }, { duration: 0.25, ease: 'easeOut' });
    });
    btn.addEventListener('pointerleave', () => animate(btn, { x: 0, y: 0 }, { type: 'spring', stiffness: 300, damping: 15 }));
  });
}

/** FAQ <details> open/close with an animated height instead of snapping. */
function smoothDetails() {
  document.querySelectorAll<HTMLDetailsElement>('main details').forEach((d) => {
    const summary = d.querySelector('summary');
    if (!summary) return;
    summary.addEventListener('click', (e) => {
      e.preventDefault();
      const body = Array.from(d.children).filter((c) => c !== summary) as HTMLElement[];
      const done = () => {
        d.style.height = '';
        d.style.overflow = '';
      };
      d.style.overflow = 'hidden';
      const start = d.offsetHeight;
      if (d.open) {
        const style = getComputedStyle(d);
        const end = summary.offsetHeight + parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
        animate(d, { height: [`${start}px`, `${end}px`] }, { duration: 0.3, ease }).finished.then(() => {
          d.open = false;
          done();
        });
      } else {
        d.open = true;
        const end = d.scrollHeight;
        animate(d, { height: [`${start}px`, `${end}px`] }, { duration: 0.35, ease }).finished.then(done);
        animate(body, { opacity: [0, 1], y: [-6, 0] }, { duration: 0.35, delay: 0.05 });
      }
    });
  });
}
