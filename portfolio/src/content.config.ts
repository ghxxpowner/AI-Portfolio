import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const work = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    client: z.string(),
    year: z.string(),
    role: z.string(),
    team: z.string(),
    timeline: z.string(),
    platform: z.string(),
    discipline: z.array(z.string()),
    artwork: z.enum(['multi-brand', 'tokens', 'governance', 'a11y']),
    featured: z.boolean().default(false),
    order: z.number(),
    stats: z.array(z.object({ value: z.string(), label: z.string() })),
    draft: z.boolean().default(false),
  }),
});

export const collections = { work };
