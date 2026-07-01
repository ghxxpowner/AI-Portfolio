// Phone-wall scene — content source, separated from the layout.
// The 12 individual iPhone mockups that make up the reference image
// parallax-phones.png, arranged into a staggered three-column wall.
//
// `column` (1–3) places the phone left / middle / right.
// `depth` (1–3) drives the 2.5D layering: 1 = near (bigger, fully opaque, moves
// most on scroll), 3 = far (smaller, dimmer, moves least). Scattered across the
// wall so it reads layered rather than center-forward.

import type { ImageMetadata } from 'astro';

import homeMaiThink from '../assets/work/zdf-streaming-platform/phone-scene/CC-Home-1-ios.webp';
import homeAlwaysHamburg from '../assets/work/zdf-streaming-platform/phone-scene/CC-Home-2-ios.webp';
import homeSatire from '../assets/work/zdf-streaming-platform/phone-scene/CC-Home-3-ios.webp';
import seriesFolgen from '../assets/work/zdf-streaming-platform/phone-scene/375 – Smart Collection – Folgen.webp';
import seriesEmpfehlungen from '../assets/work/zdf-streaming-platform/phone-scene/375 – Smart Collection – Folgen-1.webp';
import seriesExtras from '../assets/work/zdf-streaming-platform/phone-scene/375 – Smart Collection – Folgen-2.webp';
import seriesDoku from '../assets/work/zdf-streaming-platform/phone-scene/375 – Smart Collection – Folgen-3.webp';
import seriesEmpfehlungen2 from '../assets/work/zdf-streaming-platform/phone-scene/375 – Smart Collection – Folgen-4.webp';
import seriesDetails from '../assets/work/zdf-streaming-platform/phone-scene/375 – Smart Collection – Folgen-5.webp';
import collectionDokus from '../assets/work/zdf-streaming-platform/phone-scene/Meta-1-ios.webp';
import meinZdf from '../assets/work/zdf-streaming-platform/phone-scene/ios-meinZDF-loggedIn.webp';
import liveTv from '../assets/work/zdf-streaming-platform/phone-scene/liveTV-ios.webp';

export interface PhoneScreen {
  image: ImageMetadata;
  /** Required — describes the actual screen for assistive tech. */
  alt: string;
  /** Left (1), middle (2) or right (3) column of the wall. */
  column: 1 | 2 | 3;
  /** Depth layer: 1 = near, 2 = mid, 3 = far. */
  depth: 1 | 2 | 3;
}

// Grouped column-by-column (left → middle → right); this is also the DOM order,
// which the calm mobile grid falls back to.
export const phoneScreens: PhoneScreen[] = [
  // Left column
  { image: homeMaiThink, column: 1, depth: 2, alt: 'Die personalisierte Startseite der ZDF-App mit der Show „Mai Think“ als Empfehlung' },
  { image: seriesFolgen, column: 1, depth: 1, alt: 'Die Serienseite von „Love Sucks“ mit dem Reiter „Folgen“' },
  { image: seriesDoku, column: 1, depth: 3, alt: 'Die Seite der Doku-Serie „Always Hamburg“' },
  { image: liveTv, column: 1, depth: 1, alt: 'Der Live-TV-Bereich mit dem laufenden Programm auf ZDFneo' },

  // Middle column
  { image: homeAlwaysHamburg, column: 2, depth: 1, alt: 'Die Startseite mit der Sport-Dokumentation „Always Hamburg“' },
  { image: seriesEmpfehlungen, column: 2, depth: 3, alt: 'Der Empfehlungen-Reiter einer Serie mit ähnlichen Titeln' },
  { image: seriesEmpfehlungen2, column: 2, depth: 2, alt: 'Weitere Empfehlungen mit Sport- und Dokumentations-Titeln' },
  { image: collectionDokus, column: 2, depth: 1, alt: 'Die Sammlung „Dokus“ mit Inhalten mehrerer Sender' },

  // Right column
  { image: homeSatire, column: 3, depth: 3, alt: 'Die Startseite mit der Satire-Show „Always Hamburg“' },
  { image: seriesExtras, column: 3, depth: 1, alt: 'Der Extras-Reiter einer Serie mit einer Liste von Trailern' },
  { image: seriesDetails, column: 3, depth: 2, alt: 'Empfehlungen mit „heute-show spezial“ und „Till Tonight“' },
  { image: meinZdf, column: 3, depth: 3, alt: 'Der persönliche Bereich „Mein ZDF“ mit Merkliste und Einstellungen' },
];
