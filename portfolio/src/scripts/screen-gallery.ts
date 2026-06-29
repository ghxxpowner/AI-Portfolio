import { reducedMotion } from './motion';

// Parallax fallback for the 3D screen gallery, ONLY for browsers without CSS
// scroll-driven animations. Where `animation-timeline: view()` is supported the
// component handles everything in CSS and this stays inert. Under reduced motion
// (or no JS) the gallery is a calm flat grid and nothing runs here.

const DEPTH_AMP: Record<string, number> = { '1': 46, '2': 28, '3': 14 };

let cleanup: (() => void) | null = null;

function init() {
  if (reducedMotion.matches) return;
  if (CSS.supports('animation-timeline: view()')) return; // CSS path handles it
  if (window.matchMedia('(max-width: 48rem)').matches) return; // flat on mobile

  const root = document.querySelector<HTMLElement>('[data-screen-gallery]');
  if (!root || root.dataset.sgReady) return;
  root.dataset.sgReady = 'true';

  const items = Array.from(root.querySelectorAll<HTMLElement>('.sg-item'));
  if (!items.length) return;

  let frame = 0;
  const update = () => {
    frame = 0;
    const vh = window.innerHeight || document.documentElement.clientHeight;
    for (const item of items) {
      const rect = item.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      // -1 (below viewport) … 0 (centered) … 1 (above viewport), gently clamped.
      const p = Math.max(-1, Math.min(1, (vh / 2 - center) / (vh / 2 + rect.height / 2)));
      const amp = DEPTH_AMP[item.dataset.depth ?? '1'] ?? 46;
      item.style.setProperty('--sg-shift', `${(p * amp).toFixed(1)}px`);
    }
  };

  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();

  cleanup = () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    if (frame) cancelAnimationFrame(frame);
  };
}

document.addEventListener('astro:before-swap', () => {
  cleanup?.();
  cleanup = null;
});

document.addEventListener('astro:page-load', init);
