import { reducedMotion } from './motion';

// Cycles the `.is-active` class through the hero's rotating words. The first
// word carries `is-active` in the markup, so no-JS and reduced-motion visitors
// see a single static word; this script only *moves* the class when motion is
// allowed. SPA-safe: re-inits per page, clears its timer before a router swap.

let timer: number | undefined;

function stop() {
  if (timer !== undefined) {
    clearInterval(timer);
    timer = undefined;
  }
}

function init() {
  stop();
  const rotator = document.querySelector<HTMLElement>('[data-rotator]');
  if (!rotator) return;
  const words = Array.from(rotator.querySelectorAll<HTMLElement>('.rotator-word'));
  if (words.length < 2) return;

  let i = Math.max(
    0,
    words.findIndex((w) => w.classList.contains('is-active'))
  );
  words.forEach((w, n) => w.classList.toggle('is-active', n === i));

  if (reducedMotion.matches) return; // static first word — no cycling

  timer = window.setInterval(() => {
    words[i].classList.remove('is-active');
    i = (i + 1) % words.length;
    words[i].classList.add('is-active');
  }, 2200);
}

document.addEventListener('astro:page-load', init);
document.addEventListener('astro:before-swap', stop);
reducedMotion.addEventListener('change', init);
