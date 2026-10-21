# Personal Portfolio Site — Design Spec

**Date:** 2026-10-21
**Author:** Marco Sabatini
**Status:** Approved (design), pending implementation plan

## Purpose

A personal portfolio website to support a full-stack developer job search. Goal:
let a recruiter, in under a minute, understand who Marco is, see concrete shipped
projects, and get in touch or download the CV. The site itself doubles as a work
sample — so quality and taste matter as much as content.

## Scope

- **In scope:** a single-page, bilingual (IT/EN) static site with light/dark
  theming, a projects showcase, an about section, a grouped skills section, a
  contact section with direct links, and a tracked CV download.
- **Out of scope (deliberately):** backend server, database, Sequelize/Express,
  multi-page routing, contact form, blog/CMS, build-time i18n. See "Deferred" for
  when each becomes worth adding.

## Architecture

Static Angular 21 single-page application. No backend. All content ships in the
bundle; dynamic behavior (language, theme, CV-download tracking) runs client-side
or via hosted third-party services.

```
[ Angular 21 static build ]
          |
      Vercel (static hosting, free)
          |
   ├─ @ngx-translate/core  → IT/EN runtime toggle
   ├─ CSS custom properties → light/dark theme
   ├─ GoatCounter          → private CV-download count
   └─ direct links         → email (mailto), LinkedIn, GitHub, CV (PDF)
```

**Why static:** a portfolio shows static content. A backend would add hosting
cost, DB uptime, CORS, and deploy complexity for no user-facing gain. The one
requirement that smelled like a backend — a private CV-download counter — is
served by GoatCounter's hosted event tracking with a private dashboard, so no
server is needed.

## Tech stack

| Concern | Choice | Notes |
|---|---|---|
| Framework | Angular 21, standalone components | matches Marco's stack |
| Styling | SCSS + CSS custom properties | theme tokens live here |
| i18n | `@ngx-translate/core` | runtime toggle (built-in Angular i18n is build-time → two bundles, rejected) |
| UI primitives | Angular Material — behavior/a11y only | see "Material boundary" below |
| CV download count | GoatCounter (hosted, free, private dashboard) | fires a `cv_download` event on click |
| Contact | direct links only (mailto, LinkedIn, GitHub) | no form, no Formspree |
| Hosting | Vercel, static output | free tier, instant deploy |
| Quality gates | Husky + lint + CI | carried over from Marco's other repos |

### Material boundary (anti-slop rule)

Angular Material is used **only** for behavior and accessibility primitives:
the theme toggle, the language menu, focus management, and a dialog if one is
ever needed. Its default visual skin is **never** used. Every Material component
is restyled with custom SCSS tokens (colors, radii, shadows, typography).

**The rule, in one line:** *if a component is recognizable as "default Material,"
it is wrong.* Everything else — hero, project cards, layout, section rhythm — is
custom CSS.

## Page structure

Single page, vertical scroll, anchored nav. No router.

1. **Hero** — name, "Full-Stack Developer", one-line value proposition, language
   toggle, theme toggle, primary CTA (jump to projects) and secondary (contact).
2. **About** — short narrative: the IFTS path, what Marco builds, what drives him.
   No filler.
3. **Projects** — three cards, infopointSardinia featured largest:
   - infopointSardinia (primary) — full-stack Angular 21 + Express/Sequelize
   - celesterosa
   - sudoku
   Each card: screenshot or GIF, 1–2 line problem→build summary, tech tags,
   a "Code" button and a "Live demo" button. **The "Live demo" button renders
   only when a demo URL exists** — this handles the current mixed/unfinished
   deploy state gracefully, and demos can be linked in later without code change.
4. **Skills** — grouped (Frontend / Backend / Tooling), presented as real
   competencies, not a flat laundry list. Reinforced by the project tech tags.
5. **Contact** — email (mailto), LinkedIn, GitHub, and a "Scarica CV / Download CV"
   button (IT and EN PDF) that fires the GoatCounter `cv_download` event.

## Data & content model

All content is static, defined in typed config/constants (not hardcoded in
templates), so IT/EN strings live in translation files and projects live in a
single typed array:

```ts
interface Project {
  id: string;
  name: string;
  summaryKey: string;      // i18n key, resolves per language
  tech: string[];          // tech tags
  repoUrl: string;
  demoUrl?: string;        // optional → controls "Live demo" button
  image: string;           // screenshot/GIF asset path
}
```

Theme and language are client state persisted to `localStorage`; both default
from `prefers-color-scheme` / browser language on first visit.

## Design principles (anti-AI-slop)

- One accent color. Strong typographic hierarchy. Generous whitespace.
- Real content only — no lorem, no emoji piles, no generic purple gradients.
- Sober micro-interactions (subtle hover/transition), not decoration for its own
  sake.
- Accessibility baseline: sufficient contrast in both themes, full keyboard
  navigation, meaningful alt text on project images, visible focus states.
- A frontend-design/minimalist-ui taste skill is consulted during build to hold
  this line.

## Error & edge handling

- Missing `demoUrl` → "Live demo" button absent (not a dead link).
- GoatCounter unreachable → CV still downloads; tracking fails silently, never
  blocks the download.
- i18n key missing → falls back to the other language's string, never shows a raw
  key (configure ngx-translate default/fallback lang).
- Image fails to load → styled placeholder with alt text, no layout shift.

## Testing

- Unit (Vitest, matching Marco's other repos): theme toggle persists and flips
  CSS, language toggle switches strings and persists, project list renders demo
  button only when `demoUrl` present.
- A11y smoke check: keyboard-only nav through all sections, contrast check both
  themes.
- Manual: Lighthouse pass (performance + a11y) before deploy.

## Deployment

Static build deployed to Vercel on push to main via existing CI pattern
(Husky + lint + test gates). CV PDFs served from `/assets`.

## Deferred (YAGNI — add only when)

- **Contact form / Formspree** — only if direct links prove insufficient.
- **Backend + DB** — only if a feature needs server-side state (none does today).
- **Multi-page routing** — only if sections outgrow a single scroll page.
- **Blog / CMS** — only once Marco is actually writing articles regularly
  (ties into the LinkedIn daily-post habit).
- **Build-time i18n** — only if SEO per-language URLs become a requirement.
