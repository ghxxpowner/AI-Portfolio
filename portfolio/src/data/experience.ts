// Experience timeline — content source, separated from presentation.
// Add or edit stations here; the layout lives in components/ExperienceTimeline.astro.
// Order: newest station first. `end` omitted → ongoing ("Today"). `[PLATZHALTER]`
// marks values to replace with real data.

export interface ExperienceEntry {
  role: string;
  company: string;
  /** Optional link for the company/client (e.g. its site or a case study). */
  companyUrl?: string;
  location: string;
  /** Year or YYYY-MM — used as the <time datetime> value and shown as-is. */
  start: string;
  /** Omit for an ongoing role → renders as "Today". */
  end?: string;
  /** 1–2 sentences. */
  summary: string;
  /** 2–4 concrete outcomes. */
  highlights: string[];
  /** Short skill/tool tags. */
  skills: string[];
  /** Marks the ongoing role (adds a "Now" marker). */
  current?: boolean;
}

export const experience: ExperienceEntry[] = [
  {
    role: 'Product Designer, Design Systems',
    company: 'Jakala',
    location: 'Germany',
    start: '2022',
    current: true,
    summary:
      'Leading token architecture, component libraries, governance and accessibility for multi-brand, multi-platform products.',
    highlights: [
      'Built the primitive → semantic → component token architecture now carried across 12 brands.',
      'Established the contribution model, review SLAs and adoption metrics that keep the system self-sustaining.',
      'Made WCAG 2.2 AA a system property — contrast-verified ramps and executable acceptance criteria.',
    ],
    skills: ['Design tokens', 'Component libraries', 'Governance', 'Accessibility', 'Figma'],
  },
  {
    role: 'Design System Architect — ZDF DetLines',
    company: 'ZDF',
    location: 'Germany',
    start: '2024',
    end: '2026',
    summary:
      "Led the cross-platform design system behind ZDF's 2025 streaming launch — one source of truth across web, mobile and smart TV.",
    highlights: [
      'One source of truth reconciled across Figma, Zeroheight and Storybook.',
      'Six platforms and thirteen breakpoints from a single responsive foundation.',
      'Shipped the design cornerstone of the ARD × ZDF Streaming OS initiative.',
    ],
    skills: ['Cross-platform', 'Design tokens', 'Smart TV', 'Figma', 'Storybook'],
  },
  {
    role: 'Product Designer',
    company: 'Digital product agency', // [PLATZHALTER] — replace with the real agency name
    location: '[PLATZHALTER] — Standort',
    start: '2019',
    end: '2022',
    summary:
      'Shipped product UI across web and mobile and migrated legacy style guides toward token-based foundations.',
    highlights: [
      '[PLATZHALTER] — key outcome or shipped product',
      '[PLATZHALTER] — measurable result or responsibility',
    ],
    skills: ['UI design', 'Prototyping', 'Design tokens'],
  },
  {
    role: 'UI/Visual Designer',
    company: 'Brand & digital studio', // [PLATZHALTER] — replace with the real studio name
    location: '[PLATZHALTER] — Standort',
    start: '2016',
    end: '2019',
    summary:
      'Brand systems, visual design and the first component libraries that set me on the systems path.',
    highlights: [
      '[PLATZHALTER] — notable brand or project',
      '[PLATZHALTER] — skill or recognition',
    ],
    skills: ['Visual design', 'Brand systems', 'Typography'],
  },
];
