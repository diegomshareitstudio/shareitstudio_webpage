/**
 * Selector carousel (styles/selector.css): arrows, dots, keys, swipes or a click on a neighbour bring a slide to the
 * centre. Slides only change their `--o` offset and `data-pos`; CSS turns that into transform/opacity transitions.
 * Used by the landing case studies (scripts/home.ts) and the services page.
 */
import { slideOffset, slidePos, slideSide } from '../lib/selector';

/** Wires one [data-wk] selector. `onChange` runs with the slide that just reached the centre. */
export function initSelector(root: HTMLElement, onChange?: (slide: HTMLElement) => void) {
  const slides = Array.from(root.querySelectorAll<HTMLElement>('[data-wk-slide]'));
  const dots = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-wk-dot]'));
  const stage = root.querySelector<HTMLElement>('[data-wk-stage]');
  const status = root.querySelector<HTMLElement>('[data-wk-status]');
  const n = slides.length;
  if (!stage || n < 2) return;

  let active = 0;
  // Visual offset of each slide, as rendered in the HTML
  const offsets = slides.map((s) => Number(s.style.getPropertyValue('--o')) || 0);
  const place = (slide: HTMLElement, o: number) => {
    slide.style.setProperty('--o', String(o));
    slide.dataset.pos = slidePos(o);
    slide.dataset.side = slideSide(o);
  };

  const go = (target: number) => {
    const next = ((target % n) + n) % n;
    if (next === active) return;
    const delta = slideOffset(next, active, n);
    const dir = Math.sign(delta) || 1;

    slides.forEach((slide, i) => {
      const old = offsets[i];
      let o = slideOffset(i, next, n);
      if (Math.abs(o) <= 1) {
        // Arriving from the far side or from out of view: start just outside the frame on its own side, unseen
        if (Math.abs(o - old) > 1) {
          slide.dataset.instant = '';
          place(slide, o === 0 ? 2 * dir : o + Math.sign(o));
          void slide.offsetWidth; // commit the start position before the transition
          delete slide.dataset.instant;
        }
      } else {
        // Leaving: fade out on the side it was already on (never fly across the centre)
        o = Math.abs(old) >= 2 ? old : old !== 0 ? 2 * Math.sign(old) : -2 * dir;
      }
      offsets[i] = o;
      place(slide, o);
      const isActive = i === next;
      slide.toggleAttribute('aria-hidden', !isActive);
      slide.querySelector('a')?.setAttribute('tabindex', isActive ? '0' : '-1');
      const panel = slide.querySelector<HTMLElement>('.wk-panel');
      if (panel) panel.inert = !isActive;
    });

    dots.forEach((d, i) => d.setAttribute('aria-current', String(i === next)));
    active = next;
    onChange?.(slides[next]);
    if (status) status.textContent = slides[next].getAttribute('aria-label') ?? '';
  };

  root.querySelector('[data-wk-prev]')?.addEventListener('click', () => go(active - 1));
  root.querySelector('[data-wk-next]')?.addEventListener('click', () => go(active + 1));
  dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') go(active - 1);
    else if (e.key === 'ArrowRight') go(active + 1);
  });

  // A neighbour is selected, not opened; swipes move one step and never count as a click
  let swiped = false;
  slides.forEach((slide, i) =>
    slide.addEventListener('click', (e) => {
      if (swiped) {
        e.preventDefault();
        swiped = false;
      } else if (i !== active) {
        e.preventDefault();
        go(i);
      }
    }),
  );
  let startX = 0;
  let startY = 0;
  stage.addEventListener(
    'pointerdown',
    (e) => {
      startX = e.clientX;
      startY = e.clientY;
      swiped = false;
    },
    { passive: true },
  );
  stage.addEventListener(
    'pointerup',
    (e) => {
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(e.clientY - startY)) {
        swiped = true;
        go(active + (dx < 0 ? 1 : -1));
      }
    },
    { passive: true },
  );

  // Images out of view are lazy; fetch all of them once the section gets close, so a new slide never pops in empty
  new IntersectionObserver(
    (entries, io) => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      root.querySelectorAll('img').forEach((img) => (img.loading = 'eager'));
    },
    { rootMargin: '400px 0px' },
  ).observe(root);

  return { stage, active: () => slides[active] };
}
