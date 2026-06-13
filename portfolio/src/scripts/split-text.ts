import { reducedMotion } from './motion';

// Wraps [data-split] content in animatable spans. The original text moves to
// an aria-label so assistive tech reads one coherent string; the span soup is
// aria-hidden. Under reduced motion the DOM is left completely untouched.

function splitChars(el: HTMLElement) {
  const text = el.textContent ?? '';
  el.setAttribute('aria-label', text.trim());
  let index = 0;
  const words = text.split(/\s+/).filter(Boolean);
  const frag = document.createDocumentFragment();
  const wrapper = document.createElement('span');
  wrapper.setAttribute('aria-hidden', 'true');
  words.forEach((word, w) => {
    const wordSpan = document.createElement('span');
    wordSpan.className = 'split-word';
    for (const char of word) {
      const charSpan = document.createElement('span');
      charSpan.className = 'split-char';
      charSpan.style.setProperty('--index', String(index++));
      charSpan.textContent = char;
      wordSpan.appendChild(charSpan);
    }
    wrapper.appendChild(wordSpan);
    if (w < words.length - 1) wrapper.appendChild(document.createTextNode(' '));
  });
  frag.appendChild(wrapper);
  el.replaceChildren(frag);
}

function splitLines(el: HTMLElement) {
  Array.from(el.children).forEach((child, i) => {
    child.classList.add('split-line');
    (child as HTMLElement).style.setProperty('--index', String(i));
  });
}

function init() {
  if (reducedMotion.matches) return;
  // Guard against re-processing the same element (e.g. a double-fired event).
  // A fresh page after a router swap brings unprocessed elements, so the
  // marker is per-element, not global.
  document.querySelectorAll<HTMLElement>('[data-split="chars"]').forEach((el) => {
    if (el.dataset.splitDone) return;
    splitChars(el);
    el.dataset.splitDone = '';
  });
  document.querySelectorAll<HTMLElement>('[data-split="lines"]').forEach((el) => {
    if (el.dataset.splitDone) return;
    splitLines(el);
    el.dataset.splitDone = '';
  });
}

// Split immediately on first load (before paint) so headings never flash as
// plain text; the per-element guard makes the duplicate astro:page-load call
// on initial load a no-op. Subsequent swaps are handled by the event only.
init();
document.addEventListener('astro:page-load', init);
