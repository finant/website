# finant — website

The marketing site for finant. Lives at [finant.ai](https://finant.ai).

Built with **Astro** (static site generator), tokens from the canonical
[finant design system v1.0](../design-system), and **Decap CMS** so non-engineers
can edit copy without touching code.

---

## How content editing works

1. Go to [finant.ai/admin](https://finant.ai/admin).
2. Log in with the email you were invited from (Netlify Identity).
3. Edit the fields, hit **Save**, then **Publish** (or open as a PR for review).
4. Netlify rebuilds the site in ~30 seconds. The change is live.

The `editorial_workflow` mode is on, so saves create a PR-style draft instead of
publishing instantly. Toggle to `simple` in `public/admin/config.yml` if you'd
rather publish in one click.

What's editable today: hero eyebrow text, footer tagline. Everything else is
hardcoded in the page until we extend the Decap config (see "Extending Decap" below).

---

## Local development

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to ./dist
npm run preview  # serve the production build locally
```

Requires Node 22+.

---

## Project layout

```
finant-website/
├── public/
│   ├── admin/                # Decap CMS — single-page admin app
│   │   ├── index.html
│   │   └── config.yml
│   └── assets/               # logo files
├── src/
│   ├── content/site/
│   │   └── settings.md       # ← Decap edits this
│   ├── content.config.ts     # Astro content collection schema
│   ├── layouts/Layout.astro  # <head>, fonts, scripts
│   ├── pages/index.astro     # the home page
│   ├── scripts/site.ts       # reveal-on-scroll, smooth scroll, contact form mailto
│   └── styles/
│       ├── colors_and_type.css   # design system tokens (verbatim from handoff)
│       └── site.css              # site styles (orange/blue/pink, Fraunces/Geist/Mono)
├── astro.config.mjs
├── netlify.toml              # build command, node version, /admin headers
├── package.json
└── tsconfig.json
```

---

## Deploying to Netlify (one-time setup)

1. Push this repo to GitHub (already done — `finant/website`).
2. In Netlify: **Add new site → Import an existing project → GitHub → finant/website.**
   Build command and publish dir are auto-detected from `netlify.toml`.
3. Add the custom domain `finant.ai` and follow Netlify's DNS instructions
   (one CNAME or use Netlify DNS).
4. Enable **Identity** (Site settings → Identity → Enable). Set registration
   to **Invite only**.
5. Enable **Git Gateway** (Site settings → Identity → Services → Git Gateway → Enable).
6. Invite editors via **Identity → Invite users**. They'll get a sign-up email.
7. Done. Editors go to `https://finant.ai/admin` and log in.

---

## Extending Decap (adding more editable content)

The pattern is always the same:

1. Add a field (or a whole new collection) to `public/admin/config.yml`.
2. Add the matching field to the Zod schema in `src/content.config.ts`.
3. Update `src/content/site/settings.md` (or create a new content file) with a default value.
4. Reference the new field in the relevant Astro page.

For example, to make the hero headline editable:

- In `config.yml`, add a `markdown` widget under the `site/settings` fields.
- In `content.config.ts`, add `hero_headline: z.string()` to the schema.
- In `index.astro`, replace the hardcoded `<h1>` markup with `{hero_headline}`.

To add a **new page** that the cofounder can author end-to-end, define a folder
collection in `config.yml` (e.g., `pages/`), add a corresponding content collection
in `content.config.ts`, and create a dynamic route in `src/pages/[slug].astro`
that reads from it.

---

## Design system

Tokens (colors, type, spacing) come from `src/styles/colors_and_type.css`,
copied verbatim from `design_handoff_finant_design_system/`. Don't introduce new
colors, fonts, or radii — extend the token file if something is genuinely missing.

The hard rules from the handoff still hold:

- Italic `<em>` is always orange.
- Pink under-stripe, **once per page max** (currently on "markets." in the hero
  and the "look?" in the contact heading — note that's two; revisit before launch).
- Orange never floods. Default buttons are ink-on-white.
- Default radius is `0`. Mostly square.
- Mono carries the labels (eyebrows, statuses, timestamps).

See `design_handoff_finant_design_system/HANDOFF.md` for the full rules.
