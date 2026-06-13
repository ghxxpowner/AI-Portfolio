import { reducedMotion } from './motion';

// The `js` class is the gate that allows motion.css to hide anything at all.
// Without JS (or with reduced motion) every element stays fully visible.
document.documentElement.classList.add('js');

// Build a fresh observer for the current page's elements. After a router swap
// the previous page's observer and its (now-detached) targets are GC'd.
function init() {
  document.documentElement.classList.add('js');
  if (reducedMotion.matches) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
  );

  document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
}

// Fires on the initial load and after every client-side navigation.
document.addEventListener('astro:page-load', init);
