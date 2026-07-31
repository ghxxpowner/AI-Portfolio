import { reducedMotion } from './motion';

// Scopes the shared-element morph (project card ↔ case-study hero) so it only
// ever runs when it actually reads as a morph:
//
//   1. Exactly ONE image may participate per navigation — the one belonging to
//      the case study being entered or left. Without this, home → /work/ would
//      pair all four shared cards at once and send them across the screen.
//   2. It must be substantially on screen on BOTH sides. A named element that
//      is scrolled out of view still morphs, flying in from off-screen.
//
// Timing matters and is easy to get wrong (verified against Astro 5.18.2):
//   • The OLD snapshot is taken when `startViewTransition()` is called, which is
//     BEFORE `astro:before-swap` fires. So the outgoing page must be handled in
//     the preparation phase — `astro:after-preparation` is the last hook before
//     that call.
//   • `astro:after-swap` runs inside the update callback and after Astro's
//     `moveToLocation()` (which sets scroll), so the new DOM is live, laid out
//     and scrolled to its final position — and mutations there still land in the
//     NEW snapshot. `astro:page-load` is too late (it sits behind `runScripts()`
//     and can cross a frame boundary).

// How much of the element must be in view for a morph to look deliberate.
// Deliberately low: what makes the morph look broken is travelling in from
// somewhere the user cannot see at all, not being partly cropped. The case-study
// hero starts ~430px down the page and is ~680px tall, so at scroll 0 barely
// half of it is ever visible — a 0.5 threshold silently killed every forward
// morph on viewports shorter than ~768px, i.e. most laptops.
const MIN_VISIBLE_RATIO = 0.25;

/** `/work/<slug>/` → `cs-<slug>`. Anything else (incl. `/work/`) → null. */
function morphName(url: URL | undefined): string | null {
  const match = url?.pathname.match(/^\/work\/([^/]+)\/$/);
  return match ? `cs-${match[1]}` : null;
}

/** The only pages that render project cards, i.e. the possible counterparts. */
const CARD_PAGES = new Set(['/', '/work/']);

/**
 * A morph is only possible between a case study (which has the hero) and a page
 * that lists cards. Navigating a case study → /resume/ can never pair, so naming
 * anything there would just make the hero fade out on its own.
 */
function participatingName(from: URL | undefined, to: URL | undefined): string | null {
  const toName = morphName(to);
  const fromName = morphName(from);
  if (toName && !fromName && from && CARD_PAGES.has(from.pathname)) return toName;
  if (fromName && !toName && to && CARD_PAGES.has(to.pathname)) return fromName;
  return null;
}

/** Vertical overlap with the viewport, relative to whichever is smaller. */
function isOnScreen(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();
  if (rect.height <= 0) return false;
  const vh = window.innerHeight;
  const overlap = Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0));
  return overlap / Math.min(rect.height, vh) >= MIN_VISIBLE_RATIO;
}

function clearNames(root: Document) {
  root.querySelectorAll<HTMLElement>('[data-vt-name]').forEach((el) => {
    el.style.removeProperty('view-transition-name');
  });
}

// Carried across the two halves of a single navigation.
let allowedName: string | null = null;
let oldQualified = false;

document.addEventListener('astro:before-preparation', (event) => {
  allowedName = null;
  oldQualified = false;
  if (reducedMotion.matches) return;

  const { to, from } = event as unknown as { to?: URL; from?: URL };
  allowedName = participatingName(from, to);
});

// Last hook before `startViewTransition()` — i.e. before the old snapshot.
document.addEventListener('astro:after-preparation', () => {
  clearNames(document);
  if (!allowedName) return;

  const el = document.querySelector<HTMLElement>(`[data-vt-name="${allowedName}"]`);
  if (!el || !isOnScreen(el)) return;

  el.style.setProperty('view-transition-name', allowedName);
  oldQualified = true;
});

// Inside the update callback: new DOM live, scroll final, still pre-snapshot.
document.addEventListener('astro:after-swap', () => {
  clearNames(document);
  // Only pair up. A name on just one side animates that element on its own,
  // which is the artefact this whole script exists to remove.
  if (!allowedName || !oldQualified) return;

  const el = document.querySelector<HTMLElement>(`[data-vt-name="${allowedName}"]`);
  if (!el || !isOnScreen(el)) return;

  el.style.setProperty('view-transition-name', allowedName);
  // The morph is this element's entrance now, so the blur-reveal must not also
  // claim it — it would hide the very box the morph is landing on.
  el.removeAttribute('data-reveal-item');
});
