// Mobile-screen gallery — content source, separated from the layout.
// Replace a placeholder: drop a real screenshot into
// src/assets/work/zdf-streaming-platform/gallery/ and change that screen's
// import below to the new file (e.g. screen-01.svg → screen-01.png). 9:19.5.
//
// `depth` (1–3) drives the 3D layer + parallax strength: 1 = near (moves most),
// 3 = far (moves least, sits deeper). Cycled for a staggered, non-grid feel.

import type { ImageMetadata } from 'astro';

import screen01 from '../assets/work/zdf-streaming-platform/gallery/screen-01.svg';
import screen02 from '../assets/work/zdf-streaming-platform/gallery/screen-02.svg';
import screen03 from '../assets/work/zdf-streaming-platform/gallery/screen-03.svg';
import screen04 from '../assets/work/zdf-streaming-platform/gallery/screen-04.svg';
import screen05 from '../assets/work/zdf-streaming-platform/gallery/screen-05.svg';
import screen06 from '../assets/work/zdf-streaming-platform/gallery/screen-06.svg';
import screen07 from '../assets/work/zdf-streaming-platform/gallery/screen-07.svg';
import screen08 from '../assets/work/zdf-streaming-platform/gallery/screen-08.svg';
import screen09 from '../assets/work/zdf-streaming-platform/gallery/screen-09.svg';
import screen10 from '../assets/work/zdf-streaming-platform/gallery/screen-10.svg';
import screen11 from '../assets/work/zdf-streaming-platform/gallery/screen-11.svg';
import screen12 from '../assets/work/zdf-streaming-platform/gallery/screen-12.svg';

export interface Screen {
  image: ImageMetadata;
  /** Required. Describe the actual screen once placeholders are replaced. */
  alt: string;
  caption?: string;
  /** Optional link (e.g. to a related case study). */
  projectUrl?: string;
  /** Depth layer: 1 = near, 2 = mid, 3 = far. */
  depth: 1 | 2 | 3;
}

export const screens: Screen[] = [
  { image: screen01, alt: '[PLATZHALTER]', depth: 1 },
  { image: screen02, alt: '[PLATZHALTER]', depth: 2 },
  { image: screen03, alt: '[PLATZHALTER]', depth: 3 },
  { image: screen04, alt: '[PLATZHALTER]', depth: 2 },
  { image: screen05, alt: '[PLATZHALTER]', depth: 1 },
  { image: screen06, alt: '[PLATZHALTER]', depth: 3 },
  { image: screen07, alt: '[PLATZHALTER]', depth: 2 },
  { image: screen08, alt: '[PLATZHALTER]', depth: 1 },
  { image: screen09, alt: '[PLATZHALTER]', depth: 3 },
  { image: screen10, alt: '[PLATZHALTER]', depth: 1 },
  { image: screen11, alt: '[PLATZHALTER]', depth: 2 },
  { image: screen12, alt: '[PLATZHALTER]', depth: 3 },
];
