import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const site = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/site' }),
  schema: z.object({
    hero_eyebrow: z.string(),
    footer_tagline: z.string(),
  }),
});

export const collections = { site };
