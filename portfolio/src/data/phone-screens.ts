// Screen cluster — content source, separated from the layout.
// The same 12 individual iPhone mockups previously arranged as a 3-column
// wall now form one ordered row for the horizontal 3D cluster. Order here is
// display order — reorder the array to change the sequence, no other change
// needed.

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
}

export const phoneScreens: PhoneScreen[] = [
  { image: homeMaiThink, alt: 'Die personalisierte Startseite der ZDF-App mit der Show „Mai Think“ als Empfehlung' },
  { image: seriesFolgen, alt: 'Die Serienseite von „Love Sucks“ mit dem Reiter „Folgen“' },
  { image: seriesDoku, alt: 'Die Seite der Doku-Serie „Always Hamburg“' },
  { image: liveTv, alt: 'Der Live-TV-Bereich mit dem laufenden Programm auf ZDFneo' },
  { image: homeAlwaysHamburg, alt: 'Die Startseite mit der Sport-Dokumentation „Always Hamburg“' },
  { image: seriesEmpfehlungen, alt: 'Der Empfehlungen-Reiter einer Serie mit ähnlichen Titeln' },
  { image: seriesEmpfehlungen2, alt: 'Weitere Empfehlungen mit Sport- und Dokumentations-Titeln' },
  { image: collectionDokus, alt: 'Die Sammlung „Dokus“ mit Inhalten mehrerer Sender' },
  { image: homeSatire, alt: 'Die Startseite mit der Satire-Show „Always Hamburg“' },
  { image: seriesExtras, alt: 'Der Extras-Reiter einer Serie mit einer Liste von Trailern' },
  { image: seriesDetails, alt: 'Empfehlungen mit „heute-show spezial“ und „Till Tonight“' },
  { image: meinZdf, alt: 'Der persönliche Bereich „Mein ZDF“ mit Merkliste und Einstellungen' },
];
