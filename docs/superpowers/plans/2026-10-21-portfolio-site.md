# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual (IT/EN), light/dark, static single-page Angular portfolio site that showcases four projects and a tracked CV download, deployable to Vercel.

**Architecture:** Angular 21 standalone components, one per scroll section (hero, about, projects, skills, contact), composed in a single `App` shell with anchored nav. Client-side theme + language state persisted to `localStorage`. No backend: CV-download counting via GoatCounter, contact via direct links. Material used only for behavioral/a11y primitives, fully restyled.

**Tech Stack:** Angular 21, TypeScript, SCSS + CSS custom properties, `@ngx-translate/core`, `@angular/material` (behavior only), Vitest, GoatCounter, Vercel.

## Global Constraints

- Angular `^21.0.0`, standalone components only (no NgModules). Matches Marco's other repos (celesterosaFE, infopointSardiniaFE).
- Test runner: **Vitest** via `ng test` (not Karma/Jest) — matches celesterosaFE.
- Styling: SCSS with CSS custom properties for theme tokens. One accent color. No CSS framework.
- i18n: `@ngx-translate/core` runtime toggle. Default + fallback lang `it`. Strings live in `public/i18n/{it,en}.json`. No raw key ever shown.
- **Material boundary (anti-slop):** Material only for behavior/a11y (toggle, menu, focus, dialog). Its default visual skin is never shipped — every Material component is restyled with custom SCSS tokens. *If a component is recognizable as "default Material," it is wrong.*
- Design: generous whitespace, strong type hierarchy, sober micro-interactions, real content only. No lorem, no generic gradients, no emoji piles.
- Accessibility baseline: keyboard nav, visible focus, sufficient contrast in both themes, meaningful alt text.
- Project cards: "Code" button renders only when `repoUrl` set; "Live demo" only when `demoUrl` set. A card with neither shows description alone.
- GoatCounter failure must never block CV download.
- Prettier config matches celesterosaFE: `printWidth: 100`, `singleQuote: true`.
- Commit style: Conventional Commits.

---

### Task 1: Scaffold Angular 21 app

**Files:**
- Create: whole Angular workspace in `portfolioFE/` (root already git-inited, contains only `docs/`)
- Modify: `package.json`, `angular.json`

**Interfaces:**
- Consumes: nothing.
- Produces: a running Angular 21 standalone app with Vitest configured; `App` root component selector `app-root`.

- [ ] **Step 1: Scaffold into the existing directory**

Run from `portfolioFE/`:
```bash
npx -p @angular/cli@21 ng new portfolio --directory . --style scss --ssr false --routing false --skip-git
```
When prompted about the non-empty directory (`docs/` exists), accept. When prompted for zoneless/AI tooling, accept defaults.

- [ ] **Step 2: Switch test runner to Vitest**

Run:
```bash
ng generate config vitest
```
If that schematic is unavailable, add Vitest manually to match celesterosaFE: install `vitest`, `jsdom`, and set the `test` builder to `@angular/build:unit-test` with `runner: vitest` in `angular.json`.

- [ ] **Step 3: Verify dev server and tests run**

Run:
```bash
npm start -- --watch=false 2>&1 | head -5   # build sanity
npm test -- --run
```
Expected: build succeeds; test run completes (default spec passes or zero specs).

- [ ] **Step 4: Add Prettier config**

Add to `package.json`:
```json
"prettier": { "printWidth": 100, "singleQuote": true,
  "overrides": [{ "files": "*.html", "options": { "parser": "angular" } }] }
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: scaffold Angular 21 standalone app with Vitest"
```

---

### Task 2: Theme service (light/dark toggle)

**Files:**
- Create: `src/app/core/theme.service.ts`, `src/app/core/theme.service.spec.ts`
- Modify: `src/styles.scss`

**Interfaces:**
- Consumes: nothing.
- Produces: `ThemeService` with `readonly theme = signal<'light'|'dark'>()`, method `toggle(): void`, and `init(): void` that reads `localStorage['theme']` or `prefers-color-scheme`. Applies `data-theme` attribute to `document.documentElement`.

- [ ] **Step 1: Write the failing test**

`src/app/core/theme.service.spec.ts`:
```ts
import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    TestBed.configureTestingModule({});
  });

  it('defaults to light when no preference stored', () => {
    const s = TestBed.inject(ThemeService);
    s.init();
    expect(s.theme()).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('toggle flips theme and persists', () => {
    const s = TestBed.inject(ThemeService);
    s.init();
    s.toggle();
    expect(s.theme()).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('restores persisted theme on init', () => {
    localStorage.setItem('theme', 'dark');
    const s = TestBed.inject(ThemeService);
    s.init();
    expect(s.theme()).toBe('dark');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run theme.service`
Expected: FAIL — cannot find `./theme.service`.

- [ ] **Step 3: Write minimal implementation**

`src/app/core/theme.service.ts`:
```ts
import { Injectable, signal } from '@angular/core';

type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<Theme>('light');

  init(): void {
    const stored = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    this.apply(stored ?? (prefersDark ? 'dark' : 'light'));
  }

  toggle(): void {
    this.apply(this.theme() === 'light' ? 'dark' : 'light');
  }

  private apply(theme: Theme): void {
    this.theme.set(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }
}
```

- [ ] **Step 4: Add theme tokens to `src/styles.scss`**

```scss
:root,
:root[data-theme='light'] {
  --bg: #ffffff;
  --fg: #16161a;
  --muted: #6b7280;
  --accent: #2563eb;
  --card: #f7f8fa;
  --border: #e5e7eb;
}
:root[data-theme='dark'] {
  --bg: #0f1115;
  --fg: #e7e9ee;
  --muted: #9ca3af;
  --accent: #60a5fa;
  --card: #171a21;
  --border: #272b33;
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: var(--bg);
  color: var(--fg);
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  transition: background 0.2s ease, color 0.2s ease;
}
:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test -- --run theme.service`
Expected: PASS (3 tests).

- [ ] **Step 6: Commit**

```bash
git add src/app/core/theme.service.ts src/app/core/theme.service.spec.ts src/styles.scss
git commit -m "feat: theme service with light/dark toggle and persistence"
```

---

### Task 3: i18n setup + language service

**Files:**
- Create: `public/i18n/it.json`, `public/i18n/en.json`, `src/app/core/lang.service.ts`, `src/app/core/lang.service.spec.ts`
- Modify: `src/app/app.config.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: configured `TranslateService` (default+fallback `it`, loaded from `/i18n`); `LangService` with `readonly lang = signal<'it'|'en'>()`, `toggle(): void`, `init(): void` (reads `localStorage['lang']` or browser language, calls `translate.use`).

- [ ] **Step 1: Install ngx-translate**

Run:
```bash
npm i @ngx-translate/core @ngx-translate/http-loader
```

- [ ] **Step 2: Create translation files**

`public/i18n/it.json`:
```json
{
  "nav": { "projects": "Progetti", "about": "Chi sono", "contact": "Contatti" },
  "hero": {
    "role": "Full-Stack Developer",
    "tagline": "Costruisco web app con Angular, Node ed Express — testate, con CI/CD, pensate per durare.",
    "cta_projects": "Vedi i progetti",
    "cta_contact": "Contattami"
  },
  "about": {
    "title": "Chi sono",
    "body": "Sviluppatore full-stack junior con una formazione IFTS e un metodo preso sul serio: TypeScript ovunque, test prima del merge, CI/CD e lint come abitudine. Mi piace il lavoro che non si vede — architettura a layer, vincoli di integrità nel database, hardening di sicurezza — perché è lì che un progetto regge nel tempo. Costruisco con Angular, Node/Express e Sequelize. Cerco un team dove continuare a imparare e spedire codice di cui fidarsi."
  },
  "projects": { "title": "Progetti", "code": "Codice", "demo": "Demo live" },
  "skills": { "title": "Competenze", "frontend": "Frontend", "backend": "Backend", "tooling": "Tooling & Qualità" },
  "contact": {
    "title": "Contatti",
    "body": "Aperto a opportunità full-stack, anche remote.",
    "email": "Email", "cv": "Scarica il CV"
  }
}
```

`public/i18n/en.json`:
```json
{
  "nav": { "projects": "Projects", "about": "About", "contact": "Contact" },
  "hero": {
    "role": "Full-Stack Developer",
    "tagline": "I build web apps with Angular, Node and Express — tested, CI/CD-driven, built to last.",
    "cta_projects": "See projects",
    "cta_contact": "Get in touch"
  },
  "about": {
    "title": "About",
    "body": "Junior full-stack developer with an IFTS background and a method I take seriously: TypeScript everywhere, tests before merge, CI/CD and linting as a habit. I like the work you don't see — layered architecture, database-level integrity constraints, security hardening — because that's where a project holds up over time. I build with Angular, Node/Express and Sequelize. I'm looking for a team where I can keep learning and ship code worth trusting."
  },
  "projects": { "title": "Projects", "code": "Code", "demo": "Live demo" },
  "skills": { "title": "Skills", "frontend": "Frontend", "backend": "Backend", "tooling": "Tooling & Quality" },
  "contact": {
    "title": "Contact",
    "body": "Open to full-stack opportunities, remote-friendly.",
    "email": "Email", "cv": "Download CV"
  }
}
```

- [ ] **Step 3: Configure TranslateService in `src/app/app.config.ts`**

Add to the `providers` array:
```ts
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideHttpClient } from '@angular/common/http';

// inside providers: []
provideHttpClient(),
provideTranslateService({
  loader: provideTranslateHttpLoader({ prefix: '/i18n/', suffix: '.json' }),
  fallbackLang: 'it',
  lang: 'it',
}),
```
(If the installed ngx-translate version exposes `defaultLanguage` instead of `fallbackLang`, use that key — check `node_modules/@ngx-translate/core` exports.)

- [ ] **Step 4: Write the failing test**

`src/app/core/lang.service.spec.ts`:
```ts
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { LangService } from './lang.service';

describe('LangService', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideTranslateService({ fallbackLang: 'it', lang: 'it' })],
    });
  });

  it('defaults to it when nothing stored', () => {
    const s = TestBed.inject(LangService);
    s.init();
    expect(s.lang()).toBe('it');
  });

  it('toggle flips language and persists', () => {
    const t = TestBed.inject(TranslateService);
    const s = TestBed.inject(LangService);
    s.init();
    s.toggle();
    expect(s.lang()).toBe('en');
    expect(localStorage.getItem('lang')).toBe('en');
    expect(t.currentLang).toBe('en');
  });
});
```

- [ ] **Step 5: Run test to verify it fails**

Run: `npm test -- --run lang.service`
Expected: FAIL — cannot find `./lang.service`.

- [ ] **Step 6: Write minimal implementation**

`src/app/core/lang.service.ts`:
```ts
import { inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

type Lang = 'it' | 'en';

@Injectable({ providedIn: 'root' })
export class LangService {
  private readonly translate = inject(TranslateService);
  readonly lang = signal<Lang>('it');

  init(): void {
    const stored = localStorage.getItem('lang') as Lang | null;
    const browser = navigator.language?.startsWith('en') ? 'en' : 'it';
    this.use(stored ?? browser);
  }

  toggle(): void {
    this.use(this.lang() === 'it' ? 'en' : 'it');
  }

  private use(lang: Lang): void {
    this.lang.set(lang);
    localStorage.setItem('lang', lang);
    this.translate.use(lang);
  }
}
```

- [ ] **Step 7: Run test to verify it passes**

Run: `npm test -- --run lang.service`
Expected: PASS (2 tests).

- [ ] **Step 8: Commit**

```bash
git add src/app/core/lang.service.ts src/app/core/lang.service.spec.ts src/app/app.config.ts public/i18n
git commit -m "feat: ngx-translate setup with IT/EN language service"
```

---

### Task 4: Project data model + projects section

**Files:**
- Create: `src/app/data/projects.ts`, `src/app/sections/projects/projects.ts`, `src/app/sections/projects/projects.html`, `src/app/sections/projects/projects.scss`, `src/app/sections/projects/projects.spec.ts`

**Interfaces:**
- Consumes: `TranslateService` (pipe), `summaryKey` resolved via i18n. (Project summaries use literal strings for now; i18n keys optional later.)
- Produces: `interface Project` and `export const PROJECTS: Project[]`; `ProjectsComponent` selector `app-projects` rendering one card per project, "Code"/"Demo" links conditional on `repoUrl`/`demoUrl`.

- [ ] **Step 1: Create the typed project data**

`src/app/data/projects.ts`:
```ts
export interface Project {
  id: string;
  name: string;
  summary: string;      // IT; EN variant handled when i18n keys added later
  tech: string[];
  repoUrl?: string;     // absent → no "Code" button (e.g. private repo)
  demoUrl?: string;     // absent → no "Live demo" button
  image: string;        // path under public/img
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: 'progetto',
    name: 'Booking & Property Management',
    summary:
      'Piattaforma white-label full-stack per hotel e B&B: motore di prenotazione real-time, pagamenti Stripe/PayPal, front desk, housekeeping, chat live (Socket.IO), analytics, compliance italiana (Alloggiati Web, FatturaPA), sync OTA. 263 test, hardening OWASP.',
    tech: ['Node.js 22', 'Express 5', 'Sequelize', 'MariaDB', 'Socket.IO', 'Stripe', 'PayPal', 'JWT', 'Jest'],
    image: '/img/progetto.png',
    featured: true,
  },
  {
    id: 'infopoint',
    name: 'infopointSardinia',
    summary:
      'Portale per scoprire e consultare eventi attivi in Sardegna: ricerca, filtri, autenticazione, area admin. Angular 21 + Express/Sequelize. ~1017 test, CI/CD.',
    tech: ['Angular 21', 'TypeScript', 'Express', 'Sequelize', 'MySQL', 'Vitest', 'CI/CD'],
    repoUrl: '',   // fill with public repo URL
    demoUrl: '',   // fill with live Vercel URL
    image: '/img/infopoint.png',
  },
  {
    id: 'celesterosa',
    name: 'celesterosa',
    summary:
      'E-commerce di strumenti musicali. API Express 5 + Sequelize/MariaDB: catalogo a categorie gerarchiche (EAV), varianti, pagamenti Stripe (webhook), fatture PDF con IVA, email automatiche, storage immagini MinIO, docs Swagger.',
    tech: ['Angular 21', 'Express 5', 'Sequelize', 'MariaDB', 'Stripe', 'Swagger', 'JWT'],
    repoUrl: '',   // fill with public repo URL
    image: '/img/celesterosa.png',
  },
  {
    id: 'multigame',
    name: 'Multi-game Platform',
    summary:
      'API REST multi-gioco: Sudoku (4 difficoltà), Macchiavelli (1 umano vs 3 bot) e Cruciverba generato dal dizionario italiano. Salvataggio partite e record, formato JSend, Helmet + rate-limiting, test Jest + supertest.',
    tech: ['Node.js', 'Express 5', 'Sequelize', 'MariaDB', 'Joi', 'Jest'],
    repoUrl: '',   // fill with public repo URL
    image: '/img/multigame.png',
  },
];
```
> Empty-string `repoUrl`/`demoUrl` are placeholders for URLs Marco will paste in. The template treats empty string the same as absent (see Step 4 test).

- [ ] **Step 2: Write the failing test**

`src/app/sections/projects/projects.spec.ts`:
```ts
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';
import { ProjectsComponent } from './projects';

describe('ProjectsComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [ProjectsComponent],
      providers: [provideHttpClient(), provideTranslateService({ fallbackLang: 'it', lang: 'it' })],
    }),
  );

  it('renders one card per project', () => {
    const f = TestBed.createComponent(ProjectsComponent);
    f.detectChanges();
    const cards = f.nativeElement.querySelectorAll('[data-test="project-card"]');
    expect(cards.length).toBe(4);
  });

  it('hides Code/Demo links when url is empty', () => {
    const f = TestBed.createComponent(ProjectsComponent);
    f.detectChanges();
    const firstCard = f.nativeElement.querySelector('[data-test="project-card"]');
    // progetto (featured, first) has neither repoUrl nor demoUrl
    expect(firstCard.querySelector('[data-test="code-link"]')).toBeNull();
    expect(firstCard.querySelector('[data-test="demo-link"]')).toBeNull();
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npm test -- --run projects`
Expected: FAIL — cannot find `./projects`.

- [ ] **Step 4: Write the component**

`src/app/sections/projects/projects.ts`:
```ts
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { PROJECTS } from '../../data/projects';

@Component({
  selector: 'app-projects',
  imports: [TranslatePipe],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  readonly projects = PROJECTS;
}
```

`src/app/sections/projects/projects.html`:
```html
<section id="projects" class="projects">
  <h2>{{ 'projects.title' | translate }}</h2>
  <div class="grid">
    @for (p of projects; track p.id) {
      <article class="card" [class.featured]="p.featured" data-test="project-card">
        <img class="shot" [src]="p.image" [alt]="p.name" loading="lazy" />
        <h3>{{ p.name }}</h3>
        <p class="summary">{{ p.summary }}</p>
        <ul class="tech">
          @for (t of p.tech; track t) { <li>{{ t }}</li> }
        </ul>
        <div class="links">
          @if (p.repoUrl) {
            <a [href]="p.repoUrl" target="_blank" rel="noopener" data-test="code-link">
              {{ 'projects.code' | translate }}
            </a>
          }
          @if (p.demoUrl) {
            <a [href]="p.demoUrl" target="_blank" rel="noopener" class="primary" data-test="demo-link">
              {{ 'projects.demo' | translate }}
            </a>
          }
        </div>
      </article>
    }
  </div>
</section>
```

`src/app/sections/projects/projects.scss`:
```scss
.projects { max-width: 1040px; margin: 0 auto; padding: 6rem 1.5rem; }
h2 { font-size: 2rem; margin-bottom: 2.5rem; }
.grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 1.5rem;
  display: flex; flex-direction: column; gap: 0.75rem;
  transition: transform 0.15s ease, border-color 0.15s ease;
  &:hover { transform: translateY(-3px); border-color: var(--accent); }
  &.featured { grid-column: 1 / -1; }
}
.shot { width: 100%; border-radius: 8px; aspect-ratio: 16 / 9; object-fit: cover; background: var(--border); }
h3 { margin: 0; font-size: 1.25rem; }
.summary { color: var(--muted); margin: 0; }
.tech { list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: 0.4rem; }
.tech li { font-size: 0.75rem; padding: 0.2rem 0.55rem; border: 1px solid var(--border); border-radius: 999px; color: var(--muted); }
.links { margin-top: auto; display: flex; gap: 0.75rem; }
.links a { color: var(--accent); text-decoration: none; font-weight: 600; }
.links a.primary { padding: 0.45rem 0.9rem; background: var(--accent); color: #fff; border-radius: 8px; }
@media (max-width: 720px) { .grid { grid-template-columns: 1fr; } }
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test -- --run projects`
Expected: PASS (2 tests).

- [ ] **Step 6: Commit**

```bash
git add src/app/data/projects.ts src/app/sections/projects
git commit -m "feat: projects section with conditional repo/demo links"
```

---

### Task 5: Hero, About, Skills sections (presentational)

**Files:**
- Create: `src/app/sections/hero/hero.ts` (+ `.html`, `.scss`), `src/app/sections/about/about.ts` (+ `.html`, `.scss`), `src/app/sections/skills/skills.ts` (+ `.html`, `.scss`)

**Interfaces:**
- Consumes: `TranslatePipe`.
- Produces: standalone components `HeroComponent` (`app-hero`), `AboutComponent` (`app-about`), `SkillsComponent` (`app-skills`).

- [ ] **Step 1: Generate the three components**

Run:
```bash
ng g c sections/hero --inline-style=false
ng g c sections/about --inline-style=false
ng g c sections/skills --inline-style=false
```

- [ ] **Step 2: Hero component**

`src/app/sections/hero/hero.ts` — add `imports: [TranslatePipe]`, `changeDetection: OnPush`.
`src/app/sections/hero/hero.html`:
```html
<section id="hero" class="hero">
  <p class="role">{{ 'hero.role' | translate }}</p>
  <h1>Marco Sabatini</h1>
  <p class="tagline">{{ 'hero.tagline' | translate }}</p>
  <div class="cta">
    <a href="#projects" class="primary">{{ 'hero.cta_projects' | translate }}</a>
    <a href="#contact">{{ 'hero.cta_contact' | translate }}</a>
  </div>
</section>
```
`src/app/sections/hero/hero.scss`:
```scss
.hero { max-width: 1040px; margin: 0 auto; padding: 8rem 1.5rem 6rem; }
.role { color: var(--accent); font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; font-size: 0.85rem; margin: 0; }
h1 { font-size: clamp(2.5rem, 6vw, 4rem); margin: 0.5rem 0; }
.tagline { font-size: 1.25rem; color: var(--muted); max-width: 40ch; }
.cta { display: flex; gap: 1rem; margin-top: 2rem; }
.cta a { text-decoration: none; font-weight: 600; color: var(--accent); padding: 0.6rem 0; }
.cta a.primary { padding: 0.6rem 1.2rem; background: var(--accent); color: #fff; border-radius: 8px; }
```

- [ ] **Step 3: About component**

`src/app/sections/about/about.ts` — `imports: [TranslatePipe]`, `OnPush`.
`src/app/sections/about/about.html`:
```html
<section id="about" class="about">
  <h2>{{ 'about.title' | translate }}</h2>
  <p>{{ 'about.body' | translate }}</p>
</section>
```
`src/app/sections/about/about.scss`:
```scss
.about { max-width: 720px; margin: 0 auto; padding: 6rem 1.5rem; }
h2 { font-size: 2rem; margin-bottom: 1.5rem; }
p { font-size: 1.15rem; color: var(--fg); }
```

- [ ] **Step 4: Skills component**

`src/app/sections/skills/skills.ts`:
```ts
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-skills',
  imports: [TranslatePipe],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent {
  readonly groups = [
    { key: 'skills.frontend', items: ['Angular 21', 'TypeScript', 'RxJS', 'HTML5', 'CSS3/SCSS', 'Angular Material', 'Bootstrap'] },
    { key: 'skills.backend', items: ['Node.js', 'Express', 'Sequelize', 'MySQL/MariaDB', 'REST', 'JWT', 'Socket.IO'] },
    { key: 'skills.tooling', items: ['Git', 'Husky', 'ESLint', 'Prettier', 'CI/CD', 'Vitest', 'Jest'] },
  ];
}
```
`src/app/sections/skills/skills.html`:
```html
<section id="skills" class="skills">
  <h2>{{ 'skills.title' | translate }}</h2>
  <div class="groups">
    @for (g of groups; track g.key) {
      <div class="group">
        <h3>{{ g.key | translate }}</h3>
        <ul>@for (i of g.items; track i) { <li>{{ i }}</li> }</ul>
      </div>
    }
  </div>
</section>
```
`src/app/sections/skills/skills.scss`:
```scss
.skills { max-width: 1040px; margin: 0 auto; padding: 6rem 1.5rem; }
h2 { font-size: 2rem; margin-bottom: 2.5rem; }
.groups { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
.group h3 { font-size: 1rem; color: var(--accent); margin-bottom: 1rem; }
ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem; }
li { color: var(--muted); }
@media (max-width: 720px) { .groups { grid-template-columns: 1fr; } }
```

- [ ] **Step 5: Verify build**

Run: `npm start -- --watch=false 2>&1 | tail -5`
Expected: build succeeds, no template errors.

- [ ] **Step 6: Commit**

```bash
git add src/app/sections/hero src/app/sections/about src/app/sections/skills
git commit -m "feat: hero, about and skills sections"
```

---

### Task 6: Analytics wrapper + Contact section (CV download tracking)

**Files:**
- Create: `src/app/core/analytics.ts`, `src/app/core/analytics.spec.ts`, `src/app/sections/contact/contact.ts` (+ `.html`, `.scss`)
- Modify: `src/index.html`
- Add assets: `public/cv/marco-sabatini-it.pdf`, `public/cv/marco-sabatini-en.pdf`

**Interfaces:**
- Consumes: global `window.goatcounter` (optional).
- Produces: `countCvDownload(lang: 'it'|'en'): void` — fires a GoatCounter event, swallowing any error. `ContactComponent` selector `app-contact`.

- [ ] **Step 1: Write the failing test**

`src/app/core/analytics.spec.ts`:
```ts
import { countCvDownload } from './analytics';

describe('countCvDownload', () => {
  afterEach(() => { delete (window as any).goatcounter; });

  it('calls goatcounter.count with an event path', () => {
    const count = vi.fn();
    (window as any).goatcounter = { count };
    countCvDownload('it');
    expect(count).toHaveBeenCalledWith(
      expect.objectContaining({ path: 'cv-download-it', event: true }),
    );
  });

  it('does not throw when goatcounter is absent', () => {
    expect(() => countCvDownload('en')).not.toThrow();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run analytics`
Expected: FAIL — cannot find `./analytics`.

- [ ] **Step 3: Write implementation**

`src/app/core/analytics.ts`:
```ts
interface GoatCounter { count(opts: { path: string; title?: string; event?: boolean }): void; }
declare global { interface Window { goatcounter?: GoatCounter; } }

export function countCvDownload(lang: 'it' | 'en'): void {
  try {
    window.goatcounter?.count({ path: `cv-download-${lang}`, title: `CV download (${lang})`, event: true });
  } catch {
    /* tracking must never block the download */
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run analytics`
Expected: PASS (2 tests).

- [ ] **Step 5: Add GoatCounter script to `src/index.html`**

Before `</body>`:
```html
<script
  data-goatcounter="https://MARCO.goatcounter.com/count"
  async
  src="//gc.zgo.at/count.js"></script>
```
> Replace `MARCO` with the real GoatCounter site code after signup (free at goatcounter.com). Until then the script 404s harmlessly and `countCvDownload` no-ops.

- [ ] **Step 6: Add placeholder CV files**

Create `public/cv/marco-sabatini-it.pdf` and `public/cv/marco-sabatini-en.pdf` (drop the real PDFs here; a 1-page placeholder is fine for now).

- [ ] **Step 7: Contact component**

`src/app/sections/contact/contact.ts`:
```ts
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { countCvDownload } from '../../core/analytics';
import { LangService } from '../../core/lang.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [TranslatePipe],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  private readonly langSvc = inject(LangService);
  readonly email = 'marcosabatini213@gmail.com';
  readonly linkedin = 'https://www.linkedin.com/in/marco-sabatini';   // fill real handle
  readonly github = 'https://github.com/MarcoSabatini98';

  get cvHref(): string { return `/cv/marco-sabatini-${this.langSvc.lang()}.pdf`; }

  onCvDownload(): void { countCvDownload(this.langSvc.lang()); }
}
```
`src/app/sections/contact/contact.html`:
```html
<section id="contact" class="contact">
  <h2>{{ 'contact.title' | translate }}</h2>
  <p>{{ 'contact.body' | translate }}</p>
  <div class="links">
    <a [href]="'mailto:' + email">{{ 'contact.email' | translate }}</a>
    <a [href]="linkedin" target="_blank" rel="noopener">LinkedIn</a>
    <a [href]="github" target="_blank" rel="noopener">GitHub</a>
    <a [href]="cvHref" download (click)="onCvDownload()" class="primary">
      {{ 'contact.cv' | translate }}
    </a>
  </div>
</section>
```
`src/app/sections/contact/contact.scss`:
```scss
.contact { max-width: 720px; margin: 0 auto; padding: 6rem 1.5rem 8rem; text-align: center; }
h2 { font-size: 2rem; margin-bottom: 1rem; }
p { color: var(--muted); margin-bottom: 2rem; }
.links { display: flex; justify-content: center; flex-wrap: wrap; gap: 1rem; }
.links a { color: var(--accent); text-decoration: none; font-weight: 600; padding: 0.6rem 0; }
.links a.primary { padding: 0.6rem 1.2rem; background: var(--accent); color: #fff; border-radius: 8px; }
```

- [ ] **Step 8: Run tests + build**

Run: `npm test -- --run && npm start -- --watch=false 2>&1 | tail -3`
Expected: all specs pass; build succeeds.

- [ ] **Step 9: Commit**

```bash
git add src/app/core/analytics.ts src/app/core/analytics.spec.ts src/app/sections/contact src/index.html public/cv
git commit -m "feat: contact section with CV download and GoatCounter tracking"
```

---

### Task 7: App shell — nav, theme/lang toggles, section composition

**Files:**
- Modify: `src/app/app.ts`, `src/app/app.html`, `src/app/app.scss`

**Interfaces:**
- Consumes: all section components, `ThemeService`, `LangService`, `MatSlideToggle` / `MatButton` (behavior only, restyled).
- Produces: assembled single-page `App`.

- [ ] **Step 1: Install Angular Material (behavior primitives only)**

Run:
```bash
ng add @angular/material
```
Accept defaults. **Do not** import a prebuilt Material theme CSS into `styles.scss` — the custom tokens in Task 2 own all visuals. Use Material components only for the toggle/menu behavior, restyled via `::ng-deep`/token overrides scoped to `app.scss`.

- [ ] **Step 2: Wire the shell**

`src/app/app.ts`:
```ts
import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { HeroComponent } from './sections/hero/hero';
import { AboutComponent } from './sections/about/about';
import { ProjectsComponent } from './sections/projects/projects';
import { SkillsComponent } from './sections/skills/skills';
import { ContactComponent } from './sections/contact/contact';
import { ThemeService } from './core/theme.service';
import { LangService } from './core/lang.service';

@Component({
  selector: 'app-root',
  imports: [TranslatePipe, HeroComponent, AboutComponent, ProjectsComponent, SkillsComponent, ContactComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  readonly theme = inject(ThemeService);
  readonly lang = inject(LangService);

  ngOnInit(): void {
    this.theme.init();
    this.lang.init();
  }
}
```
`src/app/app.html`:
```html
<header class="nav">
  <a href="#hero" class="brand">MS</a>
  <nav>
    <a href="#projects">{{ 'nav.projects' | translate }}</a>
    <a href="#about">{{ 'nav.about' | translate }}</a>
    <a href="#contact">{{ 'nav.contact' | translate }}</a>
  </nav>
  <div class="controls">
    <button type="button" (click)="lang.toggle()" [attr.aria-label]="'language'">
      {{ lang.lang() === 'it' ? 'EN' : 'IT' }}
    </button>
    <button type="button" (click)="theme.toggle()"
            [attr.aria-label]="theme.theme() === 'dark' ? 'light mode' : 'dark mode'">
      {{ theme.theme() === 'dark' ? '☀' : '☾' }}
    </button>
  </div>
</header>

<main>
  <app-hero />
  <app-projects />
  <app-about />
  <app-skills />
  <app-contact />
</main>

<footer class="foot">© {{ year }} Marco Sabatini</footer>
```
> Add `readonly year = new Date().getFullYear();` to the `App` class.

`src/app/app.scss`:
```scss
.nav {
  position: sticky; top: 0; z-index: 10;
  display: flex; align-items: center; justify-content: space-between;
  padding: 1rem 1.5rem; max-width: 1040px; margin: 0 auto;
  background: color-mix(in srgb, var(--bg) 85%, transparent);
  backdrop-filter: blur(8px);
}
.brand { font-weight: 800; text-decoration: none; color: var(--fg); }
nav { display: flex; gap: 1.5rem; }
nav a { text-decoration: none; color: var(--muted); font-size: 0.95rem; }
nav a:hover { color: var(--fg); }
.controls { display: flex; gap: 0.5rem; }
.controls button {
  background: none; border: 1px solid var(--border); color: var(--fg);
  border-radius: 8px; padding: 0.35rem 0.6rem; cursor: pointer; font-weight: 600;
}
.foot { text-align: center; padding: 2rem; color: var(--muted); font-size: 0.85rem; }
@media (max-width: 560px) { nav { display: none; } }
```
> Plain `<button>` elements are used for the toggles — simpler and lighter than Material here, and the Material boundary rule means we only reach for Material when it earns its weight (it doesn't for a two-state button). `ng add @angular/material` from Step 1 stays available for a future dialog/menu; remove the dependency if nothing uses it by deploy. *(ponytail: native buttons over Material slide-toggle — zero slop, zero override.)*

- [ ] **Step 3: Run tests + build + manual check**

Run: `npm test -- --run && npm start`
Open `http://localhost:4200`: verify all sections render, theme toggle flips colors and persists on reload, language toggle switches all copy, nav anchors scroll.

- [ ] **Step 4: Commit**

```bash
git add src/app/app.ts src/app/app.html src/app/app.scss package.json
git commit -m "feat: app shell with nav, theme and language toggles"
```

---

### Task 8: Deploy config + quality gates

**Files:**
- Create: `vercel.json`, `.husky/pre-commit`
- Modify: `package.json` (lint-staged, scripts)

**Interfaces:**
- Consumes: the built app in `dist/portfolio/browser`.
- Produces: Vercel SPA config + commit-time lint gate.

- [ ] **Step 1: Add Vercel config**

`vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/portfolio/browser",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```
> Confirm the output path matches `angular.json` `outputPath` (default `dist/portfolio`). Adjust if the project name differs.

- [ ] **Step 2: Add Husky + lint-staged**

Run:
```bash
npm i -D husky lint-staged
npx husky init
```
Set `.husky/pre-commit` to:
```sh
npx lint-staged
```
Add to `package.json`:
```json
"lint-staged": { "*.{ts,html,scss,json}": "prettier --write" }
```

- [ ] **Step 3: Verify production build**

Run: `npm run build`
Expected: build succeeds, output in `dist/portfolio/browser`.

- [ ] **Step 4: Commit**

```bash
git add vercel.json .husky package.json package-lock.json
git commit -m "chore: vercel deploy config and husky pre-commit lint"
```

- [ ] **Step 5: Deploy**

Push to GitHub, import the repo in Vercel (framework preset: Angular, or override with `vercel.json`). Verify the live URL renders and the CV downloads. Sign up at goatcounter.com, set the real site code in `index.html`, redeploy.

---

## Self-Review

**Spec coverage:**
- Static Angular 21 SPA → Task 1 ✓
- IT/EN runtime toggle (ngx-translate) → Task 3 ✓
- Light/dark toggle (CSS custom props + prefers-color-scheme) → Task 2 ✓
- 4 project cards, conditional Code/Demo links → Task 4 ✓
- Hero/About/Skills/Contact sections → Tasks 5, 6 ✓
- CV download + private counter (GoatCounter) → Task 6 ✓
- Direct contact links, no form → Task 6 ✓
- Material boundary → Task 7 (native buttons chosen; Material available but unused by default) ✓
- Anti-slop design (tokens, whitespace, one accent) → Tasks 2, 4–7 ✓
- Vercel deploy + Husky/lint CI → Task 8 ✓
- Error handling (missing demoUrl, GoatCounter failure, missing i18n key) → Tasks 4, 6, 3 ✓

**Placeholder scan:** URLs (`repoUrl`/`demoUrl`, LinkedIn handle, GoatCounter site code) and CV PDFs are intentional data-fill points, flagged inline with notes — not logic gaps. No "TBD" in code or steps.

**Type consistency:** `ThemeService.theme()`, `LangService.lang()`, `Project` fields (`repoUrl?`/`demoUrl?`), `countCvDownload(lang)` used consistently across Tasks 2, 3, 4, 6, 7.

**Note on ngx-translate API:** config key (`fallbackLang` vs `defaultLanguage`) and loader provider names vary by major version — Step 3 of Task 3 flags verifying against the installed version. This is the one genuine version-dependent spot.
