// Platform carousel — content source, separated from presentation.
// The same ZDF home screen on every platform the product ships to. Web, Android
// and iOS carry two screens each (a large breakpoint plus the phone), the three
// TV platforms one.
//
// `-01` is always the large screen (desktop for web, tablet for the apps),
// `-02` the phone. The component composes them into one scene.

import type { ImageMetadata } from 'astro';

import webWide from '../assets/work/zdf-streaming-platform/showcase/carousel/web-01.png';
import webPhone from '../assets/work/zdf-streaming-platform/showcase/carousel/web-02.png';
import androidWide from '../assets/work/zdf-streaming-platform/showcase/carousel/android-01.png';
import androidPhone from '../assets/work/zdf-streaming-platform/showcase/carousel/android-02.png';
import iosWide from '../assets/work/zdf-streaming-platform/showcase/carousel/ios-01.png';
import iosPhone from '../assets/work/zdf-streaming-platform/showcase/carousel/ios-02.png';
import androidTv from '../assets/work/zdf-streaming-platform/showcase/carousel/android-tv-01.png';
import tvos from '../assets/work/zdf-streaming-platform/showcase/carousel/tvos-01.png';
import hbbtv from '../assets/work/zdf-streaming-platform/showcase/carousel/hbbtv-01.png';

export interface PlatformView {
  /** Used for the radio input's id and value, and to match its scene. */
  id: string;
  /** Chip label. */
  label: string;
  /** The large screen — desktop on web, tablet in the apps. */
  wide: ImageMetadata;
  /** The phone screen. Only where a second breakpoint is shown. */
  phone?: ImageMetadata;
  /** Required — describes the scene for assistive tech. */
  alt: string;
}

export const platformViews: PlatformView[] = [
  {
    id: 'web',
    label: 'Web',
    wide: webWide,
    phone: webPhone,
    alt: 'The ZDF home screen on the web — the desktop layout beside the narrow mobile-web breakpoint.',
  },
  {
    id: 'android',
    label: 'Android',
    wide: androidWide,
    phone: androidPhone,
    alt: 'The ZDF home screen in the Android app — the tablet layout beside the phone layout.',
  },
  {
    id: 'ios',
    label: 'iOS',
    wide: iosWide,
    phone: iosPhone,
    alt: 'The ZDF home screen in the iOS app — the tablet layout beside the phone layout.',
  },
  {
    id: 'android-tv',
    label: 'AndroidTV',
    wide: androidTv,
    alt: 'The ZDF home screen on Android TV, laid out for remote-control focus and viewing from a distance.',
  },
  {
    id: 'tvos',
    label: 'tvOS',
    wide: tvos,
    alt: 'The ZDF home screen on Apple tvOS.',
  },
  {
    id: 'hbbtv',
    label: 'HbbTV',
    wide: hbbtv,
    alt: 'The ZDF home screen on HbbTV, the broadcast-connected TV platform.',
  },
];
