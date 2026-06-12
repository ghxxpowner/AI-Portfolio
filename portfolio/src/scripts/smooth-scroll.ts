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

if (!reducedMotion.matches) start();
reducedMotion.addEventListener('change', (e) => (e.matches ? stop() : start()));
