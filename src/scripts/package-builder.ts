/**
 * Package builder behaviour (components/packages/PackageBuilder.astro): style switch, service tabs, selection,
 * running total and the per-service breakdown. Reads its data from the JSON the component renders into the page.
 */

type Tier = 'ai' | 'hybrid' | 'organic';
type Price = number | 'na' | 'nr';
interface Service {
  id: string;
  tab: string;
  name: string;
  prices: Record<Tier, Price>;
  includes: Record<Tier, string[]>;
  note: string | null;
}

const root = document.querySelector<HTMLElement>('[data-pkg]');
if (root) init(root);

function init(root: HTMLElement) {
  const data = JSON.parse(root.querySelector('[data-pkg-data]')!.textContent!) as {
    tiers: { id: Tier; name: string; tagline: string; detail: string }[];
    services: Service[];
  };
  const byId = new Map(data.services.map((s) => [s.id, s]));
  const money = (n: number) => `$${n.toLocaleString('en-US')}`;
  const label = (p: Price) => (typeof p === 'number' ? money(p) : p === 'nr' ? 'Not recommended' : 'Not offered');
  const $ = <T extends HTMLElement>(sel: string) => root.querySelector<T>(sel)!;
  const $$ = <T extends HTMLElement>(sel: string) => [...root.querySelectorAll<T>(sel)];

  const tierBtns = $$<HTMLButtonElement>('[data-pkg-tier]');
  const tabBtns = $$<HTMLButtonElement>('[data-pkg-tab]');
  const panels = $$('[data-pkg-panel]');
  const rows = $$<HTMLButtonElement>('[data-pkg-service]');
  const list = $('[data-pkg-list]');

  let tier: Tier = 'hybrid';
  const selected: string[] = []; // in the order they were picked
  let openId: string | null = null; // the one breakdown that is expanded

  const price = (id: string) => byId.get(id)!.prices[tier];
  const available = (id: string) => typeof price(id) === 'number';

  function render(announce = '') {
    const info = data.tiers.find((t) => t.id === tier)!;
    tierBtns.forEach((b) => b.setAttribute('aria-checked', String(b.dataset.pkgTier === tier)));
    $('[data-pkg-tierinfo]').innerHTML = '';
    const strong = document.createElement('strong');
    strong.className = 'text-brand-green';
    strong.textContent = `${info.tagline}.`;
    $('[data-pkg-tierinfo]').append(strong, ` ${info.detail}`);

    // A service the chosen style doesn't offer drops out of the selection
    const dropped = selected.filter((id) => !available(id)).map((id) => byId.get(id)!.name);
    for (let i = selected.length - 1; i >= 0; i--) if (!available(selected[i])) selected.splice(i, 1);
    if (openId && !selected.includes(openId)) openId = selected[selected.length - 1] ?? null;

    rows.forEach((r) => {
      const id = r.dataset.pkgService!;
      r.disabled = !available(id);
      r.setAttribute('aria-checked', String(selected.includes(id)));
      r.querySelector('[data-pkg-price]')!.textContent = label(price(id));
    });

    // Selected count on each tab
    tabBtns.forEach((t) => {
      const n = selected.filter((id) => byId.get(id)!.tab === t.dataset.pkgTab).length;
      const badge = t.querySelector<HTMLElement>('.pkg-badge')!;
      badge.hidden = n === 0;
      badge.textContent = String(n);
    });

    const total = selected.reduce((sum, id) => sum + (price(id) as number), 0);
    const countText = selected.length ? `${selected.length} selected` : 'Nothing selected yet';
    $('[data-pkg-title]').textContent = `${info.name} breakdown`;
    $('[data-pkg-count]').textContent = countText;
    $('[data-pkg-total]').textContent = money(total);
    $('[data-pkg-empty]').hidden = selected.length > 0;
    $('[data-pkg-clear]').hidden = selected.length === 0;
    $('[data-pkg-bar]').hidden = selected.length === 0;
    $('[data-pkg-barcount]').textContent = countText;
    $('[data-pkg-bartotal]').textContent = money(total);

    const frag = document.createDocumentFragment();
    for (const id of selected) {
      const s = byId.get(id)!;
      const d = document.createElement('details');
      d.open = id === openId;
      d.dataset.id = id;
      const sum = document.createElement('summary');
      const name = document.createElement('span');
      name.className = 'pkg-sname';
      name.textContent = s.name;
      const p = document.createElement('span');
      p.className = 'pkg-sprice';
      p.textContent = money(price(id) as number);
      const x = document.createElement('button');
      x.type = 'button';
      x.className = 'pkg-x';
      x.dataset.remove = id;
      x.setAttribute('aria-label', `Remove ${s.name}`);
      x.textContent = '×';
      sum.append(name, p, x);
      const ul = document.createElement('ul');
      for (const line of s.includes[tier]) {
        const li = document.createElement('li');
        li.textContent = line;
        ul.append(li);
      }
      d.append(sum, ul);
      if (s.note) {
        const n = document.createElement('p');
        n.className = 'pkg-note';
        n.textContent = s.note;
        d.append(n);
      }
      frag.append(d);
    }
    list.replaceChildren(frag);

    $('[data-pkg-status]').textContent =
      announce || (dropped.length ? `${dropped.join(', ')} removed: not offered in ${info.name}.` : '');
  }

  function toggle(id: string) {
    const i = selected.indexOf(id);
    if (i >= 0) {
      selected.splice(i, 1);
      if (openId === id) openId = selected[selected.length - 1] ?? null;
    } else {
      selected.push(id);
      openId = id; // the newest pick opens, the rest fold
    }
    render();
  }

  tierBtns.forEach((b) =>
    b.addEventListener('click', () => {
      tier = b.dataset.pkgTier as Tier;
      render(`${data.tiers.find((t) => t.id === tier)!.name} selected.`);
    }),
  );
  rows.forEach((r) =>
    r.addEventListener('click', () => available(r.dataset.pkgService!) && toggle(r.dataset.pkgService!)),
  );

  tabBtns.forEach((t) =>
    t.addEventListener('click', () => {
      tabBtns.forEach((o) => o.setAttribute('aria-selected', String(o === t)));
      panels.forEach((p) => (p.hidden = p.dataset.pkgPanel !== t.dataset.pkgTab));
    }),
  );

  // Breakdown: the × removes a service; opening one folds the others
  list.addEventListener('click', (e) => {
    const x = (e.target as HTMLElement).closest<HTMLElement>('[data-remove]');
    if (x) {
      e.preventDefault();
      toggle(x.dataset.remove!);
    }
  });
  list.addEventListener(
    'toggle',
    (e) => {
      const d = e.target as HTMLDetailsElement;
      if (!d.open) {
        if (openId === d.dataset.id) openId = null;
        return;
      }
      openId = d.dataset.id!;
      list.querySelectorAll<HTMLDetailsElement>('details[open]').forEach((o) => o !== d && (o.open = false));
    },
    true,
  );

  $('[data-pkg-clear]').addEventListener('click', () => {
    selected.length = 0;
    openId = null;
    render('Selection cleared.');
  });

  // Arrow keys move between the three styles
  $('[role="radiogroup"]').addEventListener('keydown', (e) => {
    const k = (e as KeyboardEvent).key;
    if (!['ArrowRight', 'ArrowLeft'].includes(k)) return;
    e.preventDefault();
    const i = tierBtns.findIndex((b) => b.dataset.pkgTier === tier);
    const next = tierBtns[(i + (k === 'ArrowRight' ? 1 : -1) + tierBtns.length) % tierBtns.length];
    next.click();
    next.focus();
  });

  render();
}
