// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://danielklinke.design',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
});
