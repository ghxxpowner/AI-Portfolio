import { reducedMotion } from './motion';

// Pointer spotlight for [data-spotlight] cards: write the cursor position into
// --mx/--my so a CSS radial glow can follow it. Pure progressive enhancement —
// the cards are fully styled and readable without this. Skipped under reduced
// motion and on coarse/touch pointers (where there's no hover to track).
function init() {
  if (reducedMotion.matches) return;
  if (!window.matchMedia('(pointer: fine)').matches) return;

  document.querySelectorAll<HTMLElement>('[data-spotlight]').forEach((card) => {
    if (card.dataset.spotlightReady) return;
    card.dataset.spotlightReady = '';
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  });
}

// Fires on the initial load and after every client-side navigation. Fresh
// elements each swap mean the old listeners are GC'd with their cards.
document.addEventListener('astro:page-load', init);
