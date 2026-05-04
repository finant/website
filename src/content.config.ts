import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const linkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const founderSchema = z.object({
  role: z.string(),
  name: z.string(),
  bio: z.string(),
  prev: z.array(z.string()),
  linkedin: z.string(),
});

const pillarSchema = z.object({
  num: z.string(),
  title: z.string(),
  body: z.string(),
});

const site = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/site' }),
  schema: z.object({
    // Nav
    nav_links: z.array(linkSchema),
    nav_cta_label: z.string(),

    // Hero
    hero_eyebrow: z.string(),
    hero_headline: z.string(),
    hero_lede: z.string(),
    hero_cta_label: z.string(),
    hero_meta: z.array(z.string()),

    // Ticker
    ticker_items: z.array(z.string()),

    // Manifesto (Thesis)
    manifesto_label: z.string(),
    manifesto_body: z.string(),

    // Pillars (What we're building)
    pillars_eyebrow: z.string(),
    pillars_heading: z.string(),
    pillars: z.array(pillarSchema),

    // Audiences (Built for)
    audiences_label: z.string(),
    audiences_heading: z.string(),
    audiences_intro: z.string(),
    audiences: z.array(z.string()),

    // Founders (Team)
    founders_eyebrow: z.string(),
    founders_heading: z.string(),
    founders: z.array(founderSchema),

    // Contact
    contact_label: z.string(),
    contact_heading: z.string(),
    contact_body: z.string(),
    contact_email: z.string(),
    contact_form_name_label: z.string(),
    contact_form_email_label: z.string(),
    contact_form_role_label: z.string(),
    contact_form_role_placeholder: z.string(),
    contact_form_role_options: z.array(z.string()),
    contact_form_note_label: z.string(),
    contact_form_note_placeholder: z.string(),
    contact_form_submit_label: z.string(),
    contact_form_fineprint: z.string(),

    // Footer
    footer_tagline: z.string(),
    footer_links: z.array(linkSchema),
    footer_copyright: z.string(),
    footer_status: z.string(),
  }),
});

export const collections = { site };
