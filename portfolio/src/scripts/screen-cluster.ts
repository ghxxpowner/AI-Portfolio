import { reducedMotion } from './motion';

// Pin-progress fallback for the screen cluster, ONLY for browsers without CSS
// scroll-driven animations. Where `animation-timeline: view()` is supported the
// component drives --cluster-progress entirely in CSS via the `contain` range,
// and this stays inert. Under reduced motion, no JS, or below the desktop
// breakpoint the cluster is a plain scrollable row and nothing runs here.

let cleanup: (() => void) | null = null;

function init() {
  if (reducedMotion.matches) return;
  if (CSS.supports('animation-timeline: view()')) return; // CSS path handles it
  if (window.matchMedia('(max-width: 64rem)').matches) return; // plain row below desktop

  const wrapper = document.querySelector<HTMLElement>('[data-screen-cluster]');
  const viewport = wrapper?.querySelector<HTMLElement>('.sc-viewport');
  if (!wrapper || !viewport || wrapper.dataset.scReady) return;
  wrapper.dataset.scReady = 'true';

  const itemCount = parseFloat(getComputedStyle(wrapper).getPropertyValue('--item-count')) || 1;

  let frame = 0;
  const update = () => {
    frame = 0;
    const vh = window.innerHeight || document.documentElement.clientHeight;
    // Mirrors the CSS `contain` range: 0 the instant the wrapper's box fully
    // contains the viewport (pin engages), 1 the instant it no longer does
    // (pin releases) — geometrically identical to the sticky pin window.
    const rect = wrapper.getBoundingClientRect();
    const t = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - vh)));
    viewport.style.setProperty('--sc-shift', (t * (itemCount - 1)).toFixed(3));
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
