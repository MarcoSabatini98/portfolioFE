export interface Project {
  id: string;
  name: string;
  summary: string;
  tech: string[];
  repoBeUrl?: string;
  repoFeUrl?: string;
  demoUrl?: string;
  /** Screenshots, light first. One entry = static image. */
  shots: string[];
  featured?: boolean;
  tagline: string;
  problem: string;
  build: string;
  features: string[];
  role?: string;
  year?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'progetto',
    name: 'Booking & Property Management',
    summary:
      'Piattaforma white-label full-stack per hotel e B&B: motore di prenotazione real-time, pagamenti Stripe/PayPal, front desk, housekeeping, chat live (Socket.IO), analytics, compliance italiana (Alloggiati Web, FatturaPA), sync OTA. 263 test, hardening OWASP.',
    tech: [
      'Node.js 22',
      'Express 5',
      'Sequelize',
      'MariaDB',
      'Socket.IO',
      'Stripe',
      'PayPal',
      'JWT',
      'Jest',
    ],
    repoBeUrl: 'https://github.com/MarcoSabatini98/progettoBE',
    repoFeUrl: 'https://github.com/MarcoSabatini98/progettoFE',
    demoUrl: 'https://hotellequerce.vercel.app',
    shots: ['/img/projects/progetto-light.webp', '/img/projects/progetto-dark.webp'],
    featured: true,
    tagline: 'Piattaforma gestionale white-label per hotel e B&B.',
    problem:
      'Le piccole strutture ricettive si appoggiano a gestionali costosi e frammentati, con alte commissioni OTA e adempimenti italiani (Alloggiati Web, fatturazione elettronica, tassa di soggiorno) gestiti a mano.',
    build:
      'Una singola installazione che fa girare sito pubblico e booking diretto, portale ospite e back office (front desk, housekeeping, amministrazione). API REST e real-time in Node/Express, MariaDB con viste, trigger e stored routine per i vincoli di integrità, auth JWT con refresh token rotante, pagamenti Stripe/PayPal via checkout ospitato.',
    features: [
      'Motore prenotazioni con disponibilità real-time e blocchi temporanei',
      'Pricing: stagioni, promo, codici sconto, pacchetti, city tax',
      'Online check-in',
      'Board housekeeping con assegnazione automatica',
      'Ticket di manutenzione',
      'Chat live (Socket.IO)',
      'Analytics ADR/RevPAR',
      'Programma fedeltà a 5 livelli',
      'Sync iCal Booking/Airbnb/Expedia',
      'Alloggiati Web e fatturazione FatturaPA',
      'Contenuti in 5 lingue',
      '5 ruoli con permessi',
      '263 test, hardening OWASP',
    ],
    role: 'Progetto full-stack personale (flagship)',
    year: '2026',
  },
  {
    id: 'infopoint',
    name: 'infopointSardinia',
    summary:
      'Portale per scoprire e consultare eventi attivi in Sardegna: ricerca, filtri, autenticazione, area admin. Angular 21 + Express/Sequelize. ~1017 test, CI/CD.',
    tech: ['Angular 21', 'TypeScript', 'Express', 'Sequelize', 'MySQL', 'Vitest', 'CI/CD'],
    repoBeUrl: 'https://github.com/MarcoSabatini98/infopointSardiniaBE',
    repoFeUrl: 'https://github.com/MarcoSabatini98/infopointSardiniaFE',
    demoUrl: 'https://infopointsardinia.vercel.app',
    shots: ['/img/projects/infopoint-light.webp'],
    tagline: 'Portale per scoprire eventi attivi in Sardegna.',
    problem:
      "Gli eventi attivi sull'isola sono dispersi tra fonti diverse; manca un posto unico per cercarli e filtrarli.",
    build:
      'Frontend Angular 21 su Vercel, backend Express/Sequelize su Render. Ricerca e filtri eventi, autenticazione, area admin per la gestione dei contenuti. ~1017 test e pipeline CI/CD con quality gate.',
    features: [
      'Catalogo eventi con ricerca e filtri',
      'Autenticazione',
      'Area admin per i contenuti',
      'Deploy FE Vercel + BE Render',
      'CI/CD con quality gate',
      '~1017 test',
    ],
    year: '2026',
  },
  {
    id: 'celesterosa',
    name: 'celesterosa',
    summary:
      'E-commerce di strumenti musicali. API Express 5 + Sequelize/MariaDB: catalogo a categorie gerarchiche (EAV), varianti, pagamenti Stripe (webhook), fatture PDF con IVA, email automatiche, storage immagini MinIO, docs Swagger.',
    tech: ['Angular 21', 'Express 5', 'Sequelize', 'MariaDB', 'Stripe', 'Swagger', 'JWT'],
    repoBeUrl: 'https://github.com/MarcoSabatini98/celesterosaBE',
    repoFeUrl: 'https://github.com/MarcoSabatini98/celesterosaFE',
    demoUrl: 'https://celesterosa.vercel.app',
    shots: ['/img/projects/celesterosa-light.webp', '/img/projects/celesterosa-dark.webp'],
    tagline: 'E-commerce di strumenti musicali.',
    problem:
      'Vendere strumenti musicali online richiede un catalogo ricco con attributi diversi per categoria, varianti di prodotto, pagamenti e fatturazione italiana.',
    build:
      'API REST Express 5 + Sequelize/MariaDB. Catalogo a categorie gerarchiche con modello EAV, varianti prodotto (finitura, mano, taglia con SKU/stock/prezzo), pagamenti Stripe via webhook, fatturazione PDF con IVA, email automatiche, storage immagini S3-compatibile (MinIO), documentazione API con Swagger. Frontend Angular 21 in sviluppo.',
    features: [
      'Catalogo EAV con categorie gerarchiche',
      'Varianti prodotto (SKU/stock/prezzo)',
      'Carrello e ordini a stati',
      'Pagamenti Stripe (webhook)',
      'Fatture PDF con IVA',
      'Email automatiche',
      'Storage immagini MinIO',
      'Docs Swagger',
    ],
    year: '2026',
  },
  {
    id: 'multigame',
    name: 'Multi-game Platform',
    summary:
      'API REST multi-gioco: Sudoku (4 difficoltà), Macchiavelli (1 umano vs 3 bot) e Cruciverba generato dal dizionario italiano. Salvataggio partite e record, formato JSend, Helmet + rate-limiting, test Jest + supertest.',
    tech: ['Node.js', 'Express 5', 'Sequelize', 'MariaDB', 'Joi', 'Jest'],
    repoBeUrl: 'https://github.com/MarcoSabatini98/sudokuBE',
    repoFeUrl: 'https://github.com/MarcoSabatini98/sudokuFE',
    demoUrl: 'https://multigame-m.vercel.app',
    shots: ['/img/projects/multigame-light.webp', '/img/projects/multigame-dark.webp'],
    tagline: 'API REST multi-gioco: Sudoku, Macchiavelli e Cruciverba.',
    problem:
      'Un backend unico per più giochi, con generazione di puzzle, persistenza delle partite e record per difficoltà.',
    build:
      'API REST Express 5 + Sequelize/MariaDB in formato JSend, hardening con Helmet e rate-limiting, test Jest + supertest. Tre giochi: Sudoku (generatore a 4 difficoltà), Macchiavelli (1 umano contro 3 bot, logica e AI lato frontend) e un cruciverba denso generato dal dizionario italiano (it.wiktionary).',
    features: [
      'Generatore Sudoku a 4 difficoltà',
      'Salvataggio partite e record per difficoltà',
      'Persistenza Macchiavelli',
      'Cruciverba generato da dizionario',
      'Risposte in formato JSend',
      'Helmet + rate-limiting',
      'Test Jest + supertest',
    ],
    year: '2026',
  },
];
