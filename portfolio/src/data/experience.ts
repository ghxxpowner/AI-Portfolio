// Experience timeline — content source, separated from presentation.
// Add or edit stations here; the layout lives in components/ExperienceTimeline.astro.
// Order: newest first by start date. `end` omitted → ongoing ("Today").
// `[PLATZHALTER]` marks values still to be replaced with real copy.

import type { ImageMetadata } from 'astro';

// Symbol-only marks, cropped from the supplied full lockups (the originals stay
// in the same folder). A 48px chip cannot carry a wordmark legibly.
import jakalaLogo from '../assets/logos/jakala-mark.png';
import ffwLogo from '../assets/logos/ffw-mark.png';

export interface ExperienceEntry {
  role: string;
  company: string;
  /** Optional link for the company/client (e.g. its site or a case study). */
  companyUrl?: string;
  /** Company logo. Without one, the monogram initial is shown instead. */
  logo?: ImageMetadata;
  /**
   * Machine-readable `YYYY-MM` (or bare `YYYY`) — used verbatim as the
   * <time datetime> value and formatted for display, e.g. `2018-03` → "Mar 2018".
   */
  start: string;
  /** Omit for an ongoing role → renders as "Today". Same format as `start`. */
  end?: string;
  /** 1–2 sentences. */
  summary: string;
  /** Concrete outcomes. An empty array renders nothing. */
  highlights: string[];
  /** Marks an ongoing role (adds a "Now" marker). More than one is fine. */
  current?: boolean;
  /** Not rendered anywhere today — kept for future use, so optional. */
  location?: string;
  /** Not rendered anywhere today — kept for future use, so optional. */
  skills?: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: 'Product Designer',
    company: 'JAKALA',
    logo: jakalaLogo,
    start: '2024-11',
    current: true,
    summary: '[PLATZHALTER] — 1–2 Sätze zu dieser Rolle.',
    highlights: [
      '[PLATZHALTER] — Ergebnis oder Verantwortung',
      '[PLATZHALTER] — messbares Resultat',
      '[PLATZHALTER] — Produkt oder System',
    ],
  },
  {
    role: 'Junior Product Designer',
    company: 'FFW/JAKALA',
    logo: ffwLogo,
    start: '2023-01',
    end: '2024-11',
    summary: '[PLATZHALTER] — 1–2 Sätze zu dieser Rolle.',
    highlights: [
      '[PLATZHALTER] — Ergebnis oder Verantwortung',
      '[PLATZHALTER] — messbares Resultat',
    ],
  },
  {
    role: 'UI/UX Designer',
    company: 'Fraunhofer ISST',
    start: '2019-09',
    end: '2022-10',
    summary: '[PLATZHALTER] — 1–2 Sätze zu dieser Rolle.',
    highlights: [
      '[PLATZHALTER] — Ergebnis oder Verantwortung',
      '[PLATZHALTER] — messbares Resultat',
    ],
  },
  {
    role: 'Freelance Graphic Designer',
    // Kein Arbeitgeber — bewusst neutral formuliert, gern umbenennen.
    company: 'Self-employed',
    start: '2018-08',
    current: true,
    summary: '[PLATZHALTER] — 1–2 Sätze zu dieser Rolle.',
    highlights: [
      '[PLATZHALTER] — Kunde oder Projekt',
      '[PLATZHALTER] — Leistung oder Ergebnis',
    ],
  },
  {
    role: 'Graphic Designer',
    company: 'SKP-Werbeagentur',
    start: '2018-03',
    end: '2019-08',
    summary: '[PLATZHALTER] — 1–2 Sätze zu dieser Rolle.',
    highlights: [
      '[PLATZHALTER] — Ergebnis oder Verantwortung',
      '[PLATZHALTER] — Marke oder Projekt',
    ],
  },
];
