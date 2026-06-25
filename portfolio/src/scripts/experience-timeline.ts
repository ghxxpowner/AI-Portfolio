import { reducedMotion } from './motion';

// Experience timeline motion. Two independent, progressive-enhancement layers:
//   1. Node/card reveal — IntersectionObserver activates each station top-to-bottom
//      as it rises into view and keeps it active (no re-animation on scroll up).
//   2. Progress line — preferred path is the CSS scroll-driven animation in the
//      component; this only supplies a requestAnimationFrame fallback for browsers
//      without animation-timeline support.
// Under reduced motion (or no JS) none of this runs and the component's default
// styles show every station fully visible and active.

let cleanupLine: (() => void) | null = null;

function init() {
  if (reducedMotion.matches) return;

  const root = document.querySelector<HTMLElement>('[data-exp-timeline]');
  if (!root || root.dataset.expReady) return;
  root.dataset.expReady = 'true';

  // 1. Reveal stations as they enter the lower part of the viewport.
  const observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-active');
          obs.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -30% 0px', threshold: 0 }
  );
  root.querySelectorAll('.exp-item').forEach((item) => observer.observe(item));

  // 2. Progress line fallback only where scroll-driven animations are missing.
  if (!CSS.supports('animation-timeline: view()')) {
    cleanupLine = startLineFallback(root);
  }
}

function startLineFallback(root: HTMLElement): () => void {
  let frame = 0;

  const update = () => {
    frame = 0;
    const rect = root.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    // Mirror the CSS `cover` range: 0 when the list's top is at the viewport
    // bottom, 1 once its bottom has passed the viewport top.
    const progress = (vh - rect.top) / (vh + rect.height);
    root.style.setProperty('--exp-progress', String(Math.min(1, Math.max(0, progress))));
  };

  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();

  return () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    if (frame) cancelAnimationFrame(frame);
  };
}

// Tear down the scroll listener before the router swaps the page away.
document.addEventListener('astro:before-swap', () => {
  cleanupLine?.();
  cleanupLine = null;
});

// Fires on the initial load and after every client-side navigation.
document.addEventListener('astro:page-load', init);
