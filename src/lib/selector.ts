/**
 * Slide positions of the selector carousel (styles/selector.css, scripts/selector.ts), shared by the server render
 * (initial positions, so nothing shifts when the script takes over) and the script.
 */

/** Position of slide i relative to the active one, centred: 0 = middle, ±1 = beside it, further = out of view */
export const slideOffset = (i: number, active: number, n: number) =>
  ((((i - active + Math.floor(n / 2)) % n) + n) % n) - Math.floor(n / 2);

/** data-pos and data-side of a slide at offset o */
export const slidePos = (o: number) => (o === 0 ? 'center' : Math.abs(o) === 1 ? 'side' : 'hidden');
export const slideSide = (o: number) => (o < 0 ? 'left' : o > 0 ? 'right' : 'center');
