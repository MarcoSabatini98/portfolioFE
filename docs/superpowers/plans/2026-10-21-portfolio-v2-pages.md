# Portfolio v2 — Routed Pages, Reveal Animations, Rich Footer

> Execution: subagent-driven, task-by-task, review after each. Builds on v1 (SaaS indigo theme, Plus Jakarta Sans, theme+lang services, ngx-translate, 19 tests). Do NOT regress the existing design system or tests.

**Goal:** Turn the single-page site into a multi-page routed site (Angular Router) with dedicated pages, sober scroll-reveal animations, detailed per-project pages, and a rich footer — keeping the existing SaaS visual theme, IT/EN, light/dark.

**Architecture:** Angular Router (standalone, `provideRouter`), lazy where sensible. Shared shell (nav + footer + toggles) wraps a `<router-outlet>`. A reusable `appReveal` directive (IntersectionObserver) drives fade+rise reveals. Project data gains detail fields consumed by `/progetti/:id`.

## Global Constraints (carry from v1)
- Angular ^21, standalone only, no NgModules. Vitest (`ng test --watch false`). All existing tests stay green.
- Theme tokens unchanged (`--bg --card --fg --muted --border --accent --accent-2 --accent-soft --accent-fg --shadow`), both light/dark. Font Plus Jakarta Sans. No raw `#fff`/`#000` in component scss — use tokens (`--accent-fg` for text on accent).
- i18n: every visible string via ngx-translate (it/en), default/fallback `it`. No raw key shown. Proper nouns + name may be literal.
- Preserve all `data-test` hooks used by tests (`project-card`, `code-be`, `code-fe`, `demo-link`).
- a11y: keyboard nav, visible focus, aria on controls, `prefers-reduced-motion` must disable reveal animation. Alt text on images.
- Responsive: clean at 360 / 768 / 1024 / 1440; no horizontal overflow; toggles always reachable ≥40px targets.
- No contact form (direct links only). No new heavy deps (no jQuery, no Tailwind, no animation lib — native IntersectionObserver + CSS + Angular animations only if needed).

## Routes
| Path | Page | Content |
|---|---|---|
| `/` | Home | hero, short about teaser, skills strip, featured projects preview (2-3 cards linking to detail), contact teaser/CTA |
| `/progetti` | Projects list | all 4 projects, large cards, each links to detail |
| `/progetti/:id` | Project detail | full detail (see content appendix); unknown id → redirect `/progetti` |
| `/chi-sono` | About | full about + skills |
| `/contatti` | Contact | email, LinkedIn, GitHub, CV download (tracked) |
| `**` | Not found | styled 404 with link home |

Nav: `routerLink` with `routerLinkActive` for current-page styling. Footer repeats nav + contacts.

## Reveal directive
`src/app/core/reveal.directive.ts` — selector `[appReveal]`. On init, if `prefers-reduced-motion: reduce` → add `is-visible` immediately and stop. Else set base hidden state and observe; on intersection (threshold ~0.15) add `is-visible`, unobserve. Optional `@Input() appRevealDelay` (ms) sets `transition-delay` / inline delay for stagger. Base + visible CSS lives in `styles.scss`:
```scss
[appReveal]{opacity:0;transform:translateY(16px);transition:opacity .5s ease,transform .5s ease}
[appReveal].is-visible{opacity:1;transform:none}
@media (prefers-reduced-motion: reduce){[appReveal]{opacity:1;transform:none;transition:none}}
```
Directive uses IntersectionObserver; cleans up in `ngOnDestroy`. Unit test: given a mock element, after observer callback fires with isIntersecting, host gets `is-visible`; with reduced-motion stubbed, `is-visible` applied without observing. (Test the class-application logic; IO can be stubbed via `vi.stubGlobal('IntersectionObserver', ...)`.)

## Tasks

### Task 1 — Router + shell + nav/active + 404
Add `provideRouter(routes)` in `app.config.ts`. `app.ts`/`app.html` become the shell: sticky nav (brand tile, `routerLink` nav to `/progetti` `/chi-sono` `/contatti`, `routerLinkActive="active"`), theme+lang toggles (unchanged logic), `<router-outlet/>`, then the rich footer component (Task 3). Create `app.routes.ts`. Create a `NotFoundComponent`. Home/list/detail/about/contact pages created as empty-but-rendering placeholders in THIS task only enough to make routes resolve; real content in later tasks. Keep `ngOnInit` theme/lang init. Update `app.spec.ts` for the new shell (nav is routerLinks now; assert brand + a nav link + footer presence; provide `provideRouter([])`, http, translate). All tests green.

### Task 2 — Reveal directive (+ test)
Implement `appReveal` as specified + styles.scss base rules + unit test. TDD.

### Task 3 — Rich footer component
`src/app/shared/footer/footer.ts` standalone `app-footer`. Columns/rows: (1) brand `M` tile + name + short tagline (i18n `footer.tagline`); (2) nav links (routerLink, same as header); (3) contatti: email (mailto), LinkedIn, GitHub, CV download (reuse `countCvDownload` + `cvHref` pattern — inject LangService); (4) bottom bar: `© {{year}} Marco Sabatini` + "built with Angular 21" + back-to-top link (`#` to top, smooth). Token-driven, responsive (columns stack on mobile). New i18n keys under `footer.*`.

### Task 4 — Extend Project model + content
Add fields to `Project` (and populate all 4 from the appendix): `tagline`, `problem`, `build`, `features: string[]`, `role?`, `year?`. Existing fields unchanged. No test change beyond compile; add a tiny assertion that every project has non-empty `tagline`/`problem`/`build`/`features`.

### Task 5 — Projects list page `/progetti`
Full grid of all 4 projects (featured first, spanning). Reuse the v1 card styling; each card is a `routerLink` to `/progetti/:id` (whole card clickable) with the existing code/demo links still working (stopPropagation so link clicks don't double-trigger). Apply `appReveal` with stagger. Preserve `data-test` hooks.

### Task 6 — Project detail page `/progetti/:id`
Reads `id` from route, looks up `PROJECTS`; unknown → `router.navigate(['/progetti'])`. Layout: back link, project name + tagline + year/role, hero image (placeholder svg), sections: "Il problema", "Cosa ho costruito", "Funzionalità" (features list), "Stack" (tech chips), links (Code BE/FE/demo, conditional, `data-test` preserved). `appReveal` on sections. i18n for section headings (`detail.problem`, `detail.build`, `detail.features`, `detail.stack`, `detail.back`). Project text content stays Italian literals from the data (per v1 precedent).

### Task 7 — Home + Chi-sono + Contatti pages
- Home: hero (existing styling) + about teaser (short, link to /chi-sono) + skills strip + featured projects preview (2-3 cards → detail) + contact CTA (→ /contatti). Reveal applied.
- Chi-sono: full about body + skills cards.
- Contatti: the v1 contact section content as a page (email/LinkedIn/GitHub/CV), centered, reveal.
Move existing hero/about/skills/contact/projects section components into these pages (reuse, don't duplicate). Delete or repurpose now-unused composition. Keep selectors/data-test where tests depend.

### Task 8 — Responsive + a11y + reveal polish pass
Audit all pages at 360/768/1024/1440: nav (mobile: links collapse but routes reachable — a simple wrap or a minimal menu; keep toggles visible), footer stacks, detail page readable (~65ch), featured card behavior. Ensure `prefers-reduced-motion` disables reveals. Verify focus states, aria-current on active nav. Final build + full test suite.

## Content appendix (real per-project detail — Italian literals)

**progetto** — Booking & Property Management (flagship)
- tagline: Piattaforma gestionale white-label per hotel e B&B.
- problem: Le piccole strutture ricettive si appoggiano a gestionali costosi e frammentati, con alte commissioni OTA e adempimenti italiani (Alloggiati Web, fatturazione elettronica, tassa di soggiorno) gestiti a mano.
- build: Una singola installazione che fa girare sito pubblico e booking diretto, portale ospite e back office (front desk, housekeeping, amministrazione). API REST e real-time in Node/Express, MariaDB con viste, trigger e stored routine per i vincoli di integrità, auth JWT con refresh token rotante, pagamenti Stripe/PayPal via checkout ospitato.
- features: Motore prenotazioni con disponibilità real-time e blocchi temporanei; pricing (stagioni, promo, codici sconto, pacchetti, city tax); online check-in; board housekeeping con assegnazione automatica; ticket di manutenzione; chat live (Socket.IO); analytics ADR/RevPAR; programma fedeltà a 5 livelli; sync iCal Booking/Airbnb/Expedia; Alloggiati Web; fatturazione FatturaPA; contenuti in 5 lingue; 5 ruoli con permessi; 263 test; hardening OWASP.
- tech: Node.js 22 · Express 5 · Sequelize · MariaDB · Socket.IO · Stripe · PayPal · JWT · Jest
- year: 2026 · role: progetto full-stack personale (flagship)

**infopoint** — infopointSardinia (in produzione)
- tagline: Portale per scoprire eventi attivi in Sardegna.
- problem: Gli eventi attivi sull'isola sono dispersi tra fonti diverse; manca un posto unico per cercarli e filtrarli.
- build: Frontend Angular 21 su Vercel, backend Express/Sequelize su Render. Ricerca e filtri eventi, autenticazione, area admin per la gestione dei contenuti. ~1017 test e pipeline CI/CD con quality gate.
- features: Catalogo eventi con ricerca e filtri; autenticazione; area admin; deploy FE Vercel + BE Render; CI/CD con quality gate; ~1017 test.
- tech: Angular 21 · TypeScript · Express · Sequelize · MySQL · Vitest · CI/CD
- year: 2026 · demo: https://infopointsardinia.vercel.app

**celesterosa** — e-commerce (in sviluppo)
- tagline: E-commerce di strumenti musicali.
- problem: Vendere strumenti musicali online richiede un catalogo ricco con attributi diversi per categoria, varianti di prodotto, pagamenti e fatturazione italiana.
- build: API REST Express 5 + Sequelize/MariaDB. Catalogo a categorie gerarchiche con modello EAV, varianti prodotto (finitura, mano, taglia con SKU/stock/prezzo), pagamenti Stripe via webhook, fatturazione PDF con IVA, email automatiche, storage immagini S3-compatibile (MinIO), documentazione API con Swagger. Frontend Angular 21 in sviluppo.
- features: Catalogo EAV con categorie gerarchiche; varianti prodotto; carrello e ordini a stati; pagamenti Stripe (webhook); fatture PDF con IVA; email automatiche; storage immagini MinIO; docs Swagger.
- tech: Angular 21 · Express 5 · Sequelize · MariaDB · Stripe · Swagger · JWT
- year: 2026

**multigame** — Multi-game Platform (side project)
- tagline: API REST multi-gioco: Sudoku, Macchiavelli e Cruciverba.
- problem: Un backend unico per più giochi, con generazione di puzzle, persistenza delle partite e record per difficoltà.
- build: API REST Express 5 + Sequelize/MariaDB in formato JSend, hardening con Helmet e rate-limiting, test Jest + supertest. Tre giochi: Sudoku (generatore a 4 difficoltà), Macchiavelli (1 umano contro 3 bot, logica e AI lato frontend) e un cruciverba denso generato dal dizionario italiano (it.wiktionary).
- features: Generatore Sudoku a 4 difficoltà; salvataggio partite e record per difficoltà; persistenza Macchiavelli; cruciverba generato da dizionario; risposte JSend; Helmet + rate-limiting; test Jest + supertest.
- tech: Node.js · Express 5 · Sequelize · MariaDB · Joi · Jest
- year: 2026
