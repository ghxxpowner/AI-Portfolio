import { reducedMotion } from './motion';

// Parallax fallback for the layered multi-device scene, ONLY for browsers
// without CSS scroll-driven animations. Where `animation-timeline: view()` is
// supported the component handles everything in CSS and this stays inert.
// Under reduced motion (or no JS) the scene is a calm static composition and
// nothing runs here. Each layer reads its amplitude from the inline `--amp`.

let cleanup: (() => void) | null = null;

function init() {
  if (reducedMotion.matches) return;
  if (CSS.supports('animation-timeline: view()')) return; // CSS path handles it
  if (window.matchMedia('(max-width: 48rem)').matches) return; // static on mobile

  const scene = document.querySelector<HTMLElement>('[data-multi-device]');
  if (!scene || scene.dataset.mdsReady) return;
  scene.dataset.mdsReady = 'true';

  const layers = Array.from(scene.querySelectorAll<HTMLElement>('.mds-layer'));
  if (!layers.length) return;

  // Read each layer's amplitude once (px) from the inline custom property.
  const amps = layers.map((el) => parseFloat(getComputedStyle(el).getPropertyValue('--amp')) || 0);

  let frame = 0;
  const update = () => {
    frame = 0;
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const rect = scene.getBoundingClientRect();
    const center = rect.top + rect.height / 2;
    // -1 (scene below viewport) … 0 (centered) … 1 (above), gently clamped.
    const p = Math.max(-1, Math.min(1, (vh / 2 - center) / (vh / 2 + rect.height / 2)));
    layers.forEach((el, i) => {
      el.style.setProperty('--mds-shift', `${(p * amps[i]).toFixed(1)}px`);
    });
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
