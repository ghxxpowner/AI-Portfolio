import Lenis from 'lenis';
import { reducedMotion } from './motion';

let lenis: Lenis | null = null;
let rafId = 0;

function start() {
  if (lenis) return;
  lenis = new Lenis({ lerp: 0.12, anchors: true });
  const raf = (time: number) => {
    lenis?.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);
}

function stop() {
  cancelAnimationFrame(rafId);
  lenis?.destroy();
  lenis = null;
}

// Tear the Lenis instance + rAF loop down before the router swaps the body,
// then spin up a fresh one for the new page. Without this the loop leaks and
// drives a detached document.
document.addEventListener('astro:before-swap', stop);
document.addEventListener('astro:page-load', () => {
  if (!reducedMotion.matches) start();
});

reducedMotion.addEventListener('change', (e) => (e.matches ? stop() : start()));
