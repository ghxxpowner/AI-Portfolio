import { reducedMotion } from './motion';

// Cursor parallax for [data-glow-parallax] blobs: a pointermove rAF-throttled to
// one update per frame writes --gx/--gy (CSS eases them, and the pulse keyframes
// run independently). Pure progressive enhancement — skipped under reduced motion
// and on coarse pointers, where the blobs simply breathe (or sit still) in place.
function init() {
  if (reducedMotion.matches) return;
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const blobs = Array.from(document.querySelectorAll<HTMLElement>('[data-glow-parallax]'));
  if (!blobs.length) return;

  let frame = 0;
  let lastX = 0;
  let lastY = 0;

  const apply = () => {
    frame = 0;
    const nx = (lastX / window.innerWidth - 0.5) * 2; // -1..1
    const ny = (lastY / window.innerHeight - 0.5) * 2;
    for (const blob of blobs) {
      const strength = Number.parseFloat(blob.dataset.strength ?? '28');
      blob.style.setProperty('--gx', `${nx * strength}px`);
      blob.style.setProperty('--gy', `${ny * strength}px`);
    }
  };

  const onMove = (event: PointerEvent) => {
    lastX = event.clientX;
    lastY = event.clientY;
    if (!frame) frame = requestAnimationFrame(apply);
  };

  window.addEventListener('pointermove', onMove, { passive: true });
  // Drop the window-level listener before the router swaps in a new page so it
  // can't leak or drive blobs that no longer exist.
  document.addEventListener(
    'astro:before-swap',
    () => {
      window.removeEventListener('pointermove', onMove);
      if (frame) cancelAnimationFrame(frame);
    },
    { once: true }
  );
}

// Fires on the initial load and after every client-side navigation.
document.addEventListener('astro:page-load', init);
