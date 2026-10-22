# Marco Sabatini — Portfolio

**Full-Stack Developer** — Angular davanti, Node/Express dietro, real-time nel mezzo.

🔗 **Live:** deploy su Vercel · 💼 [LinkedIn](https://www.linkedin.com/in/marco-sabatini-dev/) · 🐙 [GitHub](https://github.com/MarcoSabatini98) · ✉️ marcosabatini213@gmail.com

---

## 🇮🇹 Italiano

Portfolio single-page veloce, accessibile e bilingue (IT/EN), costruito con Angular 21: standalone components, Signals, pagine con routing, animazioni di scroll-reveal, tema chiaro/scuro e manifest PWA. È il mio biglietto da visita e, allo stesso tempo, un esempio concreto di come lavoro.

### Chi sono

Sviluppatore full-stack con formazione IFTS e un metodo preso sul serio: TypeScript ovunque, test prima del merge, CI/CD e lint come abitudine. Mi piace il lavoro che non si vede — architettura a layer, vincoli di integrità nel database, hardening di sicurezza — perché è lì che un progetto regge nel tempo.

Non arrivo da un percorso informatico classico: sono perito elettrotecnico e prima dello sviluppo ho lavorato come impiantista, in magazzino e nelle consegne — lavori concreti, dove le cose devono funzionare. Porto lo stesso approccio nel codice. Inglese a livello C2: documentazione, team internazionali e lavoro da remoto sono terreno naturale.

### Stack

- **Frontend** — Angular 21 (Signals, standalone components, typed forms), TypeScript, RxJS, ngx-translate, SCSS
- **Backend** — Node.js, Express, Sequelize, Socket.IO, JWT, MySQL / MariaDB
- **Tooling & Qualità** — Vitest, Prettier, Husky + lint-staged, Git Flow, Docker, CI/CD, Agile/Jira

### Progetti in evidenza

| Progetto | Cos'è | Stack | Link |
|---|---|---|---|
| **Booking & Property Management** *(flagship)* | Piattaforma white-label full-stack per hotel e B&B: motore di prenotazione real-time, pagamenti Stripe/PayPal, front desk, housekeeping, chat live, analytics, compliance italiana (Alloggiati Web, FatturaPA), sync OTA. 263 test, hardening OWASP. | Node · Express · Sequelize · MariaDB · Socket.IO · Stripe | [BE](https://github.com/MarcoSabatini98/progettoBE) · [FE](https://github.com/MarcoSabatini98/progettoFE) · [Demo](https://hotellequerce.vercel.app) |
| **infopointSardinia** | Portale per scoprire eventi attivi in Sardegna: ricerca, filtri, autenticazione, area admin. ~1017 test, CI/CD. | Angular 21 · Express · Sequelize · MySQL | [BE](https://github.com/MarcoSabatini98/infopointSardiniaBE) · [FE](https://github.com/MarcoSabatini98/infopointSardiniaFE) · [Demo](https://infopointsardinia.vercel.app) |
| **celesterosa** | E-commerce di strumenti musicali: catalogo, carrello, checkout, admin. | Angular · Node · Express · Sequelize | [BE](https://github.com/MarcoSabatini98/celesterosaBE) · [FE](https://github.com/MarcoSabatini98/celesterosaFE) · [Demo](https://celesterosa.vercel.app) |
| **multigame** | API REST multi-gioco — Sudoku, Machiavelli, Cruciverba. | Node · Express · Sequelize | [BE](https://github.com/MarcoSabatini98/sudokuBE) · [FE](https://github.com/MarcoSabatini98/sudokuFE) · [Demo](https://multigame-m.vercel.app) |

### Avvio in locale

```bash
npm install
npm start        # dev server su http://localhost:4200
npm run build    # build di produzione → dist/portfolio/browser
npm test         # Vitest
```

**Requisiti:** Node.js 20+ e npm.

### Deploy

Build statica Angular su **Vercel**. Configurazione in [`vercel.json`](vercel.json): `npm run build` → `dist/portfolio/browser`, con rewrite SPA così le rotte lato client risolvono su `index.html`.

### Contatti

- **Email** — marcosabatini213@gmail.com
- **LinkedIn** — [marco-sabatini-dev](https://www.linkedin.com/in/marco-sabatini-dev/)
- **GitHub** — [MarcoSabatini98](https://github.com/MarcoSabatini98)

Aperto a opportunità full-stack, anche da remoto.

---

## 🇬🇧 English

A fast, accessible, bilingual (IT/EN) single-page portfolio built with Angular 21: standalone components, Signals, routed pages, scroll-reveal animations, light/dark theme, and a PWA manifest. It's both my business card and a working sample of how I build.

### About

Full-stack developer with an IFTS background and a method I take seriously: TypeScript everywhere, tests before merge, CI/CD and linting as a habit. I like the work you don't see — layered architecture, database-level integrity constraints, security hardening — because that's where a project holds up over time.

I don't come from a classic CS path: I'm a qualified electrotechnical engineer, and before development I worked as a plant installer, in warehouses, and in deliveries — concrete jobs where things have to actually work. I bring the same mindset to code. English at C2, so documentation, international teams, and remote work are natural ground.

### Stack

- **Frontend** — Angular 21 (Signals, standalone components, typed forms), TypeScript, RxJS, ngx-translate, SCSS
- **Backend** — Node.js, Express, Sequelize, Socket.IO, JWT, MySQL / MariaDB
- **Tooling & Quality** — Vitest, Prettier, Husky + lint-staged, Git Flow, Docker, CI/CD, Agile/Jira

### Featured Projects

| Project | What it is | Stack | Links |
|---|---|---|---|
| **Booking & Property Management** *(flagship)* | White-label full-stack platform for hotels & B&Bs: real-time booking engine, Stripe/PayPal payments, front desk, housekeeping, live chat, analytics, Italian compliance (Alloggiati Web, FatturaPA), OTA sync. 263 tests, OWASP hardening. | Node · Express · Sequelize · MariaDB · Socket.IO · Stripe | [BE](https://github.com/MarcoSabatini98/progettoBE) · [FE](https://github.com/MarcoSabatini98/progettoFE) · [Demo](https://hotellequerce.vercel.app) |
| **infopointSardinia** | Portal to discover active events in Sardinia: search, filters, auth, admin area. ~1017 tests, CI/CD. | Angular 21 · Express · Sequelize · MySQL | [BE](https://github.com/MarcoSabatini98/infopointSardiniaBE) · [FE](https://github.com/MarcoSabatini98/infopointSardiniaFE) · [Demo](https://infopointsardinia.vercel.app) |
| **celesterosa** | Musical-instruments e-commerce: catalog, cart, checkout, admin. | Angular · Node · Express · Sequelize | [BE](https://github.com/MarcoSabatini98/celesterosaBE) · [FE](https://github.com/MarcoSabatini98/celesterosaFE) · [Demo](https://celesterosa.vercel.app) |
| **multigame** | Multi-game REST API — Sudoku, Machiavelli, Crosswords. | Node · Express · Sequelize | [BE](https://github.com/MarcoSabatini98/sudokuBE) · [FE](https://github.com/MarcoSabatini98/sudokuFE) · [Demo](https://multigame-m.vercel.app) |

### Run locally

```bash
npm install
npm start        # dev server at http://localhost:4200
npm run build    # production build → dist/portfolio/browser
npm test         # Vitest
```

**Requirements:** Node.js 20+ and npm.

### Deployment

Static Angular build deployed on **Vercel**. Configuration lives in [`vercel.json`](vercel.json): `npm run build` → `dist/portfolio/browser`, with an SPA rewrite so client-side routes resolve to `index.html`.

### Contact

- **Email** — marcosabatini213@gmail.com
- **LinkedIn** — [marco-sabatini-dev](https://www.linkedin.com/in/marco-sabatini-dev/)
- **GitHub** — [MarcoSabatini98](https://github.com/MarcoSabatini98)

Open to full-stack opportunities, remote included.

---

© Marco Sabatini. All rights reserved.
