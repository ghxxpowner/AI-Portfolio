// The inline head snippet in BaseLayout sets `data-preload` on <html> only
// when this session hasn't seen the loader and reduced motion is off.
// This script just plays the sequence and tears the overlay down.

const root = document.documentElement;
const overlay = document.querySelector<HTMLElement>('[data-preloader]');

function finish() {
  root.removeAttribute('data-preload');
  overlay?.remove();
}

if (root.hasAttribute('data-preload') && overlay) {
  sessionStorage.setItem('preloaded', '1');
  overlay.classList.add('is-playing');
  overlay.addEventListener('transitionend', finish, { once: true });
  // Failsafe: never trap the page behind the overlay.
  setTimeout(finish, 2000);
} else {
  finish();
}
