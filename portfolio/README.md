# Daniel Klinke — Portfolio

A design-systems portfolio built with Astro 5. Static output, no client framework, vanilla CSS with a two-tier token system, light + dark themes, WCAG 2.2 AA. Design language inspired by wondermakers.digital: neon accent (#e1fc06) on neutral grays, Onest Variable, fluid type/spacing scales, scroll-reveal and split-text animations, Lenis smooth scrolling and a session preloader — all behind a strict reduced-motion/no-JS contract (nothing is ever hidden unless JS runs *and* the visitor allows motion). The system documents itself at `/styleguide`.

## Commands

```sh
npm install      # once
npm run dev      # dev server at localhost:4321
npm run build    # static build to dist/
npm run preview  # serve the built site locally
```

## Replacing the placeholder content

The four case studies are realistic placeholders. Each one is **a single MDX file** in `src/content/work/` — replacing a project means editing one file:

1. Copy an existing `.mdx` file, e.g. `multi-brand-design-system.mdx`.
2. Fill in the frontmatter (`title`, `summary`, `client`, `role`, `stats`, …). The schema in `src/content.config.ts` validates it at build time — a missing field fails the build with a clear error.
3. Write the body. The artifact components are imported at the top and used inline:
   - `<TokenTable>` — token specimen table with color swatches
   - `<ComponentAnatomy>` — labeled component diagram
   - `<BeforeAfter>` — two-panel comparison
   - `<Figure>` — generic captioned figure (drop real images/screenshots in here later)
   - `<Callout>` — decision/trade-off asides
   - `<StatRow>` / `<PullQuote>` — metrics and quotes
4. Set `featured: true` and an `order` to control the homepage and sorting.

Hero artwork is keyed by the `artwork` frontmatter field (`multi-brand | tokens | governance | a11y`). To add a new one, create a component in `src/components/artwork/`, register it in `Artwork.astro`, and extend the enum in `content.config.ts`.

## Things to personalize before going live

- **Site URL** — `astro.config.mjs` (`site`) and `public/robots.txt`
- **Email & LinkedIn** — `src/components/Footer.astro` and `src/pages/about.astro` (currently `hello@danielklinke.design` placeholders)
- **Bio & experience** — `src/pages/about.astro`
- **OG image** — regenerate from `og-source.svg` (root) after editing:
  `qlmanage -t -s 1200 -o /tmp og-source.svg && sips -c 630 1200 /tmp/og-source.svg.png --out public/og-default.png`

## Architecture notes

- `src/styles/tokens.css` is the design system of the site itself: primitives (tier 1) feed semantic tokens (tier 2); components consume **only** semantic tokens. Dark mode remaps the semantic layer under `[data-theme='dark']` and respects `prefers-color-scheme` until the toggle stores an explicit choice. Guardrail: neon is never a text color and only ever carries `--color-on-accent`.
- Motion layer (`src/scripts/` + `src/styles/motion.css`): one IntersectionObserver flips `.is-visible`, CSS transitions with `--index` staggers do the rest; `split-text.ts` builds the masked char/line reveals (a11y-safe via `aria-label` + `aria-hidden` spans). Hidden states exist only under `html.js` + `prefers-reduced-motion: no-preference` — no JS or reduced motion means everything renders instantly.
- Lenis smooth scrolling is destroyed under reduced motion; the preloader is session-gated, skipped for reduced motion, and self-dismisses via a CSS animation even if the JS bundle never loads.
- Total client JS ≈ 19KB minified (Lenis + motion layer + theme toggle).
