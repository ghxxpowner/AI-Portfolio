import { reducedMotion } from './motion';

// Drives the AnimatedCardStatusList: clicking "Synchronize" on an updates-found
// card sends it to syncing, then to completed after a beat, and reorders so
// completed cards settle to the top (FLIP-animated unless motion is reduced).
// SPA-safe: re-inits on every astro:page-load and clears its timers on swap.

type Status = 'completed' | 'updates-found' | 'syncing';
const LABELS: Record<Status, string> = {
  completed: '',
  'updates-found': 'Updates found',
  syncing: 'Syncing',
};

let timers: ReturnType<typeof setTimeout>[] = [];

function setStatus(card: HTMLElement, status: Status) {
  card.dataset.status = status;
  const label = card.querySelector<HTMLElement>('[data-label]');
  if (label) label.textContent = LABELS[status];
}

function reorder(list: HTMLElement, card: HTMLElement) {
  const items = Array.from(list.children) as HTMLElement[];
  const firstTops = new Map(items.map((el) => [el, el.getBoundingClientRect().top]));

  const firstPending = items.find((el) => el !== card && el.dataset.status !== 'completed');
  if (firstPending) list.insertBefore(card, firstPending);
  else list.appendChild(card);

  if (reducedMotion.matches) return;

  // FLIP: play every moved card from its old position to its new one.
  for (const el of items) {
    const delta = (firstTops.get(el) ?? 0) - el.getBoundingClientRect().top;
    if (!delta) continue;
    el.style.transition = 'none';
    el.style.transform = `translateY(${delta}px)`;
    requestAnimationFrame(() => {
      el.style.transition = 'transform 450ms var(--ease-out-cubic)';
      el.style.transform = '';
    });
  }
}

function init() {
  document.querySelectorAll<HTMLElement>('[data-card-status]').forEach((panel) => {
    if (panel.dataset.cslReady) return;
    panel.dataset.cslReady = '';

    const list = panel.querySelector<HTMLElement>('.csl-list');
    if (!list) return;

    panel.querySelectorAll<HTMLButtonElement>('[data-sync]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const card = btn.closest<HTMLElement>('[data-card]');
        if (!card || card.dataset.status !== 'updates-found') return;

        setStatus(card, 'syncing');
        const delay = reducedMotion.matches ? 600 : 2500;
        const timer = setTimeout(() => {
          setStatus(card, 'completed');
          if (!reducedMotion.matches) {
            card.classList.add('csl-pop');
            card.addEventListener('animationend', () => card.classList.remove('csl-pop'), {
              once: true,
            });
          }
          reorder(list, card);
        }, delay);
        timers.push(timer);
      });
    });
  });
}

// Cancel pending syncs before the router swaps the page away.
document.addEventListener('astro:before-swap', () => {
  timers.forEach(clearTimeout);
  timers = [];
});

document.addEventListener('astro:page-load', init);
