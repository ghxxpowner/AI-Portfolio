// Adds `is-scrolling` to <html> while the page is actively scrolling and removes
// it shortly after scrolling stops. CSS uses this to pause continuous animations
// (the accent-hue drift, the hero mesh drift) during scroll, so their per-frame
// repaints don't compete with scrolling. The animations resume — frozen at their
// current frame, so there's no jump — once scrolling settles.

const root = document.documentElement;
let idleTimer = 0;

function onScroll() {
  root.classList.add('is-scrolling');
  clearTimeout(idleTimer);
  idleTimer = window.setTimeout(() => root.classList.remove('is-scrolling'), 160);
}

// Attached once; `document`/`window` persist across router swaps, so this keeps
// working without re-binding.
window.addEventListener('scroll', onScroll, { passive: true });
