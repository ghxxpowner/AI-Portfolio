// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://danielklinke.design',
  trailingSlash: 'always',
  // <ClientRouter /> turns prefetching on with strategy "hover", i.e. hovering
  // any internal link fetches and parses that whole page. "tap" moves that work
  // to mousedown instead, so hovering a button costs nothing. Navigation still
  // gets prefetched — just a fraction of a second later.
  prefetch: { prefetchAll: true, defaultStrategy: 'tap' },
  integrations: [mdx(), sitemap()],
});
