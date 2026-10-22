import type { Lang } from '../core/lang.service';

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
  /** Detail-page screenshots, shown in order: the first one full width. */
  gallery?: GalleryShot[];
  /** Fonts and palette taken from the project's own design tokens. */
  design?: ProjectDesign;
  /**
   * English copy. Italian (above) is the default. Lists match the Italian ones by index:
   * `en.gallery` → `gallery`, `en.design.fonts` → font roles, `en.design.colors` → color names.
   */
  en?: ProjectCopy;
}

export interface GalleryShot {
  src: string;
  title: string;
  text: string;
}

export interface ProjectDesign {
  note: string;
  /** `family` must be a Google Fonts family name: the detail page loads it from there. */
  fonts: { family: string; role: string }[];
  colors: { name: string; hex: string }[];
}

type ProjectCopy = Pick<
  Project,
  'summary' | 'tagline' | 'problem' | 'build' | 'features' | 'role'
> & {
  gallery?: Omit<GalleryShot, 'src'>[];
  design?: { note: string; fonts: string[]; colors: string[] };
};

/** The project with its text in the given language. */
export function localize(p: Project, lang: Lang): Project {
  if (lang === 'it' || !p.en) return p;
  const { gallery, design, ...copy } = p.en;
  return {
    ...p,
    ...copy,
    gallery: p.gallery?.map((shot, i) => ({ ...shot, ...gallery?.[i] })),
    design: p.design && {
      note: design?.note ?? p.design.note,
      fonts: p.design.fonts.map((f, i) => ({ ...f, role: design?.fonts[i] ?? f.role })),
      colors: p.design.colors.map((c, i) => ({ ...c, name: design?.colors[i] ?? c.name })),
    },
  };
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
    gallery: [
      {
        src: '/img/projects/progetto-planning.webp',
        title: 'Planning camere',
        text: 'Tutte le camere su 7, 14 o 30 giorni, con lo stato di ogni soggiorno a colpo d’occhio. I soggiorni non ancora iniziati si spostano trascinandoli su un’altra camera o su altre date, anche da telefono; dalla stessa pagina si chiude una camera o l’intera struttura.',
      },
      {
        src: '/img/projects/progetto-prenota.webp',
        title: 'Prenotazione diretta',
        text: 'Il calendario mostra la disponibilità giorno per giorno prima ancora di cercare: l’ospite sceglie date e occupanti e vede solo le camere libere al prezzo migliore, senza passare da un portale con commissioni.',
      },
      {
        src: '/img/projects/progetto-area-ospite.webp',
        title: 'Area personale dell’ospite',
        text: 'Soggiorni futuri e passati con il loro stato, fatture, programma fedeltà, documenti e profilo. La chat con la reception resta sempre a portata di mano.',
      },
      {
        src: '/img/projects/progetto-housekeeping.webp',
        title: 'Board delle pulizie',
        text: 'Una kanban per stato (da fare, in corso, da verificare, verificate) con priorità, addetto e avanzamento della checklist. La giornata di lavoro si genera e si assegna agli addetti in un clic.',
      },
      {
        src: '/img/projects/progetto-chat.webp',
        title: 'Chat in tempo reale',
        text: 'Messaggistica con Socket.IO tra ospiti e staff: ogni conversazione si prende in carico, si passa a un collega o si chiude, e si può esportare in PDF.',
      },
      {
        src: '/img/projects/progetto-alloggiati.webp',
        title: 'Alloggiati Web',
        text: 'Raccoglie i soggiorni ancora da comunicare e genera il file da caricare sul portale della Polizia di Stato: un obbligo di legge che nelle piccole strutture si fa spesso a mano.',
      },
      {
        src: '/img/projects/progetto-fatture.webp',
        title: 'Fatturazione elettronica',
        text: 'Fatture e note di credito nascono dalla prenotazione e seguono il ciclo di stati di FatturaPA (da inviare, inviata, consegnata, scartata), con ricerca per codice fiscale o partita IVA.',
      },
      {
        src: '/img/projects/progetto-report.webp',
        title: 'Report e prezzi suggeriti',
        text: 'Per i prossimi 30 giorni suggerisce sconti o rincari in base all’occupazione e agli eventi in zona, lasciando la decisione al gestore. Sotto, incassi per metodo di pagamento e imposta di soggiorno mese per mese.',
      },
    ],
    design: {
      note: 'Due atmosfere nello stesso prodotto: calda e mediterranea per il sito pubblico e l’area ospite, minimale e precisa per il gestionale dello staff. I colori sono token CSS con variante chiara e scura; per adattare il sito a un’altra struttura basta cambiare il colore del brand, senza toccare i componenti.',
      fonts: [
        { family: 'Young Serif', role: 'Titoli' },
        { family: 'Figtree', role: 'Sito pubblico e area ospite' },
        { family: 'Geist', role: 'Gestionale dello staff' },
        { family: 'Geist Mono', role: 'Codici e cifre' },
      ],
      colors: [
        { name: 'Oliva (brand)', hex: '#5e6b3a' },
        { name: 'Ocra', hex: '#a87522' },
        { name: 'Sfondo', hex: '#f2f1eb' },
        { name: 'Inchiostro', hex: '#1e292a' },
        { name: 'Conferma', hex: '#3b7a4c' },
        { name: 'Errore', hex: '#ae3f37' },
        { name: 'Info', hex: '#2b6684' },
      ],
    },
    en: {
      summary:
        'White-label full-stack platform for hotels and B&Bs: real-time booking engine, Stripe/PayPal payments, front desk, housekeeping, live chat (Socket.IO), analytics, Italian compliance (Alloggiati Web, FatturaPA), OTA sync. 263 tests, OWASP hardening.',
      tagline: 'White-label management platform for hotels and B&Bs.',
      problem:
        'Small hospitality businesses rely on expensive, fragmented software, pay high OTA commissions and handle Italian legal requirements (guest reporting to the police, e-invoicing, tourist tax) by hand.',
      build:
        'A single installation runs the public website and direct booking, the guest portal and the back office (front desk, housekeeping, administration). REST and real-time APIs in Node/Express, MariaDB with views, triggers and stored routines enforcing integrity constraints, JWT auth with rotating refresh tokens, Stripe/PayPal payments via hosted checkout.',
      features: [
        'Booking engine with real-time availability and temporary holds',
        'Pricing: seasons, promotions, discount codes, packages, city tax',
        'Online check-in',
        'Housekeeping board with automatic assignment',
        'Maintenance tickets',
        'Live chat (Socket.IO)',
        'ADR/RevPAR analytics',
        '5-tier loyalty program',
        'iCal sync with Booking/Airbnb/Expedia',
        'Alloggiati Web and FatturaPA e-invoicing',
        'Content in 5 languages',
        '5 roles with permissions',
        '263 tests, OWASP hardening',
      ],
      role: 'Personal full-stack project (flagship)',
      gallery: [
        {
          title: 'Room planning',
          text: 'Every room over 7, 14 or 30 days, with the status of each stay at a glance. Stays that haven’t started yet can be dragged to another room or to other dates, even on a phone; the same page closes a single room or the whole property.',
        },
        {
          title: 'Direct booking',
          text: 'The calendar shows availability day by day before the guest even searches: they pick dates and occupants and see only the free rooms at the best rate, without going through a commission-based portal.',
        },
        {
          title: 'Guest area',
          text: 'Upcoming and past stays with their status, invoices, loyalty program, documents and profile. Chat with the front desk is always one click away.',
        },
        {
          title: 'Housekeeping board',
          text: 'A kanban by status (to do, in progress, to check, checked) with priority, assignee and checklist progress. The day’s work is generated and assigned to staff in one click.',
        },
        {
          title: 'Real-time chat',
          text: 'Socket.IO messaging between guests and staff: each conversation can be taken over, handed to a colleague or closed, and exported to PDF.',
        },
        {
          title: 'Alloggiati Web',
          text: 'Collects the stays still to be reported and generates the file to upload to the Italian State Police portal: a legal requirement that small properties often handle by hand.',
        },
        {
          title: 'E-invoicing',
          text: 'Invoices and credit notes are created from the booking and follow the FatturaPA status cycle (to send, sent, delivered, rejected), searchable by tax code or VAT number.',
        },
        {
          title: 'Reports and suggested pricing',
          text: 'For the next 30 days it suggests discounts or increases based on occupancy and local events, leaving the decision to the manager. Below, revenue by payment method and tourist tax month by month.',
        },
      ],
      design: {
        note: 'Two moods in one product: warm and Mediterranean for the public site and the guest area, minimal and precise for the staff back office. Colors are CSS tokens with light and dark variants; adapting the site to another property only takes changing the brand color, without touching the components.',
        fonts: ['Headings', 'Public site and guest area', 'Staff back office', 'Codes and figures'],
        colors: ['Olive (brand)', 'Ochre', 'Background', 'Ink', 'Success', 'Error', 'Info'],
      },
    },
  },
  {
    id: 'infopoint',
    name: 'infopointSardinia',
    summary:
      'Dashboard di monitoraggio della Sardegna: meteo e allerte, incendi da satellite, traffico, voli, navi, carburanti, fiumi, eventi. Angular 21 + Leaflet, API Express 5/PostgreSQL che aggrega e mette in cache fonti pubbliche. ~1017 test, CI/CD.',
    tech: [
      'Angular 21',
      'TypeScript',
      'Leaflet',
      'Express 5',
      'Sequelize',
      'PostgreSQL',
      'JWT',
      'Vitest',
      'Jest',
      'CI/CD',
    ],
    repoBeUrl: 'https://github.com/MarcoSabatini98/infopointSardiniaBE',
    repoFeUrl: 'https://github.com/MarcoSabatini98/infopointSardiniaFE',
    demoUrl: 'https://infopointsardinia.vercel.app',
    shots: ['/img/projects/infopoint-light.webp'],
    tagline: 'Tutta la Sardegna in tempo reale, in una sola dashboard.',
    problem:
      "Allerte meteo, incendi, traffico, prezzi dei carburanti, piene dei fiumi ed eventi sono pubblicati da enti diversi, ognuno con il suo sito e il suo formato: per avere il quadro della giornata sull'isola bisogna aprirne una decina.",
    build:
      'Un backend Express 5 a livelli fa da proxy verso le fonti pubbliche (NASA FIRMS, OpenSky, AIS, MIMIT, Open-Meteo, OpenStreetMap, SardegnaTurismo), normalizza i dati e li mette in cache; se una fonte è giù la risposta degrada con grazia invece di rompere la pagina. Il frontend Angular 21 li mostra su mappe Leaflet con i confini delle province. PostgreSQL per utenti e contenuti, auth JWT con refresh, area admin. FE su Vercel, BE su Render, ~1017 test e pipeline CI/CD con quality gate.',
    features: [
      'Meteo, qualità dell’aria e allerte di Protezione Civile',
      'Incendi da satellite (NASA FIRMS) con filtri per provincia',
      'Traffico, voli (OpenSky) e navi (AIS) su mappa',
      'Prezzi carburanti MIMIT e piene dei fiumi',
      'Punti di interesse, news ed eventi',
      'Cache e degrado controllato delle fonti esterne',
      'Auth JWT con refresh e area admin',
      'Deploy FE Vercel + BE Render',
      'CI/CD con quality gate, ~1017 test',
    ],
    year: '2026',
    gallery: [
      {
        src: '/img/projects/infopoint-meteo.webp',
        title: 'Meteo e allerte',
        text: 'Condizioni attuali, previsioni orarie e a 14 giorni, qualità dell’aria e allerte della Protezione Civile per la località scelta. Dal menu si passa a incendi, traffico, voli, navi, carburanti, fiumi ed eventi.',
      },
      {
        src: '/img/projects/infopoint-incendi.webp',
        title: 'Incendi da satellite',
        text: 'I focolai rilevati da NASA FIRMS negli ultimi 5 giorni, con andamento giornaliero, filtri per provincia e una tabella con intensità, potenza radiativa, confidenza e satellite di ogni rilevazione.',
      },
    ],
    design: {
      note: 'Un registro da sala di controllo: neutri freddi, una sola famiglia di caratteri per tutta l’interfaccia, il blu del mare come colore primario e la terracotta come accento. Ogni livello di dati (meteo, incendi, traffico, voli, navi) ha un colore proprio, così si riconosce subito.',
      fonts: [
        { family: 'Manrope', role: 'Tutta l’interfaccia' },
        { family: 'Fraunces', role: 'Titoli della pagina news' },
      ],
      colors: [
        { name: 'Mare (primario)', hex: '#007e8f' },
        { name: 'Terracotta (accento)', hex: '#b95c3a' },
        { name: 'Sfondo', hex: '#f1f4f6' },
        { name: 'Inchiostro', hex: '#172028' },
        { name: 'Meteo', hex: '#2a7fb8' },
        { name: 'Incendi', hex: '#d1452b' },
        { name: 'Traffico', hex: '#c98a16' },
        { name: 'Voli', hex: '#5a4fa3' },
        { name: 'Navi', hex: '#0b8a86' },
      ],
    },
    en: {
      summary:
        'Monitoring dashboard for Sardinia: weather and alerts, satellite-detected wildfires, traffic, flights, ships, fuel prices, rivers, events. Angular 21 + Leaflet, with an Express 5/PostgreSQL API that aggregates and caches public data sources. ~1017 tests, CI/CD.',
      tagline: 'All of Sardinia in real time, in a single dashboard.',
      problem:
        'Weather alerts, wildfires, traffic, fuel prices, river floods and events are published by different agencies, each with its own website and format: getting the full picture of the day on the island means opening a dozen of them.',
      build:
        'A layered Express 5 backend proxies the public sources (NASA FIRMS, OpenSky, AIS, MIMIT, Open-Meteo, OpenStreetMap, SardegnaTurismo), normalises the data and caches it; if a source is down, the response degrades gracefully instead of breaking the page. The Angular 21 frontend shows everything on Leaflet maps with province boundaries. PostgreSQL for users and content, JWT auth with refresh, admin area. FE on Vercel, BE on Render, ~1017 tests and a CI/CD pipeline with quality gates.',
      features: [
        'Weather, air quality and Civil Protection alerts',
        'Satellite wildfire detection (NASA FIRMS) with province filters',
        'Traffic, flights (OpenSky) and ships (AIS) on a map',
        'MIMIT fuel prices and river floods',
        'Points of interest, news and events',
        'Caching and graceful degradation of external sources',
        'JWT auth with refresh and admin area',
        'Deploy FE Vercel + BE Render',
        'CI/CD with quality gates, ~1017 tests',
      ],
      gallery: [
        {
          title: 'Weather and alerts',
          text: 'Current conditions, hourly and 14-day forecasts, air quality and Civil Protection alerts for the chosen location. From the menu you move on to wildfires, traffic, flights, ships, fuel, rivers and events.',
        },
        {
          title: 'Wildfires from satellite',
          text: 'Fire hotspots detected by NASA FIRMS over the last 5 days, with a daily trend, province filters and a table showing the intensity, radiative power, confidence and satellite of each detection.',
        },
      ],
      design: {
        note: 'A control-room register: cool neutrals, a single typeface for the whole interface, sea blue as the primary color and terracotta as the accent. Each data layer (weather, wildfires, traffic, flights, ships) has its own color, so it is recognisable at a glance.',
        fonts: ['The whole interface', 'News page headings'],
        colors: [
          'Sea (primary)',
          'Terracotta (accent)',
          'Background',
          'Ink',
          'Weather',
          'Wildfires',
          'Traffic',
          'Flights',
          'Ships',
        ],
      },
    },
  },
  {
    id: 'celesterosa',
    name: 'celesterosa',
    summary:
      'E-commerce completo di strumenti musicali: negozio Angular 21 e backoffice, API Express 5 + Sequelize/MariaDB con catalogo EAV, varianti, checkout Stripe (webhook), ordini a stati, fatture PDF con IVA, email automatiche, storage immagini MinIO, docs Swagger.',
    tech: ['Angular 21', 'Express 5', 'Sequelize', 'MariaDB', 'Stripe', 'Swagger', 'JWT'],
    repoBeUrl: 'https://github.com/MarcoSabatini98/celesterosaBE',
    repoFeUrl: 'https://github.com/MarcoSabatini98/celesterosaFE',
    demoUrl: 'https://celesterosa.vercel.app',
    shots: ['/img/projects/celesterosa-light.webp', '/img/projects/celesterosa-dark.webp'],
    tagline: 'E-commerce di strumenti musicali.',
    problem:
      'Vendere strumenti musicali online richiede un catalogo ricco con attributi diversi per categoria, varianti di prodotto, pagamenti e fatturazione italiana.',
    build:
      'API REST Express 5 + Sequelize/MariaDB. Catalogo a categorie gerarchiche con modello EAV, varianti prodotto (finitura, mano, taglia con SKU/stock/prezzo), pagamenti Stripe via webhook, fatturazione PDF con IVA, email automatiche, storage immagini S3-compatibile (MinIO), documentazione API con Swagger. Il frontend Angular 21 copre tutto il percorso: catalogo filtrabile, scheda prodotto con varianti, carrello, checkout anche da ospite, storico ordini e backoffice.',
    features: [
      'Catalogo EAV con categorie gerarchiche',
      'Filtri per categoria, marca, condizione e prezzo',
      'Varianti prodotto (SKU/stock/prezzo)',
      'Checkout anche senza account',
      'Ordini a stati (pagato, spedito, consegnato, rimborsato)',
      'Pagamenti Stripe (webhook)',
      'Fatture PDF con IVA',
      'Email automatiche',
      'Backoffice ordini, prodotti, categorie e marche',
      'Storage immagini MinIO',
      'Docs Swagger',
    ],
    year: '2026',
    gallery: [
      {
        src: '/img/projects/celesterosa-catalogo.webp',
        title: 'Catalogo',
        text: 'Filtri per categoria, marca, condizione e fascia di prezzo, ordinamento e caricamento progressivo: pensato per un catalogo che cresce senza appesantire la pagina.',
      },
      {
        src: '/img/projects/celesterosa-prodotto.webp',
        title: 'Scheda prodotto',
        text: 'Le varianti (finitura, versione mancina) hanno ciascuna SKU, prezzo e giacenza propri. La scheda tecnica nasce dagli attributi della categoria, grazie al modello EAV.',
      },
      {
        src: '/img/projects/celesterosa-checkout.webp',
        title: 'Checkout',
        text: 'Riepilogo con imponibile e IVA separati, partita IVA facoltativa per chi vuole la fattura intestata all’azienda, pagamento tramite Stripe.',
      },
      {
        src: '/img/projects/celesterosa-ordine.webp',
        title: 'Dettaglio ordine',
        text: 'Lo stato dell’ordine segue una macchina a stati lato server; il cliente vede totali, indirizzo di spedizione e scarica la fattura PDF generata in automatico.',
      },
      {
        src: '/img/projects/celesterosa-admin.webp',
        title: 'Backoffice',
        text: 'Gestione di ordini, prodotti, categorie e marche. Ogni cambio di stato di un ordine passa dalle regole del backend e fa partire l’email al cliente.',
      },
    ],
    design: {
      note: 'Un look tecnico, da negozio di strumenti: tema scuro predefinito con una grafite blu al posto del nero puro, titoli geometrici e un carattere monospaziato per i dati. I due accenti del brand, celeste e rosa, restano identici nel tema chiaro e in quello scuro.',
      fonts: [
        { family: 'Space Grotesk', role: 'Titoli' },
        { family: 'IBM Plex Sans', role: 'Testo' },
        { family: 'IBM Plex Mono', role: 'Codici e dati tecnici' },
      ],
      colors: [
        { name: 'Celeste', hex: '#2fd9e6' },
        { name: 'Rosa', hex: '#ff4d8d' },
        { name: 'Grafite (sfondo)', hex: '#0b0d12' },
        { name: 'Superficie', hex: '#161a22' },
        { name: 'Testo', hex: '#e9edf4' },
        { name: 'Conferma', hex: '#38d39f' },
        { name: 'Avviso', hex: '#f5b841' },
        { name: 'Errore', hex: '#ff5c6c' },
      ],
    },
    en: {
      summary:
        'Complete musical instrument e-commerce: Angular 21 storefront and back office, Express 5 + Sequelize/MariaDB API with EAV catalog, variants, Stripe checkout (webhooks), order state machine, PDF invoices with VAT, automated emails, MinIO image storage, Swagger docs.',
      tagline: 'Musical instrument e-commerce.',
      problem:
        'Selling musical instruments online calls for a rich catalog with different attributes per category, product variants, payments and Italian invoicing.',
      build:
        'Express 5 + Sequelize/MariaDB REST API. Hierarchical categories with an EAV model, product variants (finish, handedness, size, each with its own SKU/stock/price), Stripe payments via webhooks, PDF invoices with VAT, automated emails, S3-compatible image storage (MinIO), Swagger API docs. The Angular 21 frontend covers the whole journey: filterable catalog, product page with variants, cart, guest checkout, order history and back office.',
      features: [
        'EAV catalog with hierarchical categories',
        'Filters by category, brand, condition and price',
        'Product variants (SKU/stock/price)',
        'Checkout without an account',
        'Order states (paid, shipped, delivered, refunded)',
        'Stripe payments (webhooks)',
        'PDF invoices with VAT',
        'Automated emails',
        'Back office for orders, products, categories and brands',
        'MinIO image storage',
        'Swagger docs',
      ],
      gallery: [
        {
          title: 'Catalog',
          text: 'Filters by category, brand, condition and price range, sorting and progressive loading: built for a catalog that grows without weighing down the page.',
        },
        {
          title: 'Product page',
          text: 'Each variant (finish, left-handed version) has its own SKU, price and stock. The spec sheet is built from the category’s attributes, thanks to the EAV model.',
        },
        {
          title: 'Checkout',
          text: 'Summary with net amount and VAT shown separately, an optional VAT number for customers who want the invoice in their company’s name, payment through Stripe.',
        },
        {
          title: 'Order details',
          text: 'The order status follows a server-side state machine; the customer sees totals and shipping address and downloads the automatically generated PDF invoice.',
        },
        {
          title: 'Back office',
          text: 'Management of orders, products, categories and brands. Every order status change goes through the backend rules and triggers an email to the customer.',
        },
      ],
      design: {
        note: 'A technical look that suits an instrument shop: dark theme by default, with a blue graphite instead of pure black, geometric headings and a monospaced typeface for data. The two brand accents, light blue and pink, stay identical in the light and dark themes.',
        fonts: ['Headings', 'Body text', 'Codes and technical data'],
        colors: [
          'Light blue',
          'Pink',
          'Graphite (background)',
          'Surface',
          'Text',
          'Success',
          'Warning',
          'Error',
        ],
      },
    },
  },
  {
    id: 'multigame',
    name: 'Multi-game Platform',
    summary:
      'Raccolta di giochi web: Sudoku (4 difficoltà), Macchiavelli (1 umano vs 3 bot) e Cruciverba generato dal dizionario italiano. Frontend Angular 21, API REST Express 5 per partite e record, formato JSend, Helmet + rate-limiting, test Jest + supertest.',
    tech: [
      'Angular 21',
      'TypeScript',
      'Node.js',
      'Express 5',
      'Sequelize',
      'MariaDB',
      'Joi',
      'Jest',
    ],
    repoBeUrl: 'https://github.com/MarcoSabatini98/sudokuBE',
    repoFeUrl: 'https://github.com/MarcoSabatini98/sudokuFE',
    demoUrl: 'https://multigame-m.vercel.app',
    shots: ['/img/projects/multigame-light.webp', '/img/projects/multigame-dark.webp'],
    tagline: 'Sudoku, Macchiavelli e Cruciverba in un’unica piattaforma web.',
    problem:
      'Più giochi in un solo posto, con un account unico, partite salvate e classifiche dei tempi migliori per ogni difficoltà: senza un backend dedicato per ciascun gioco.',
    build:
      'Frontend Angular 21 con tema chiaro e scuro, installabile anche come web app desktop. Tre giochi: Sudoku (generatore a 4 difficoltà, note automatiche e modalità timbro), Macchiavelli (1 umano contro 3 bot, con motore di gioco e AI interamente lato frontend) e un cruciverba denso generato dal dizionario italiano (it.wiktionary). Un’unica API REST Express 5 + Sequelize/MariaDB salva partite e record in formato JSend, con hardening Helmet e rate-limiting e test Jest + supertest.',
    features: [
      'Generatore Sudoku a 4 difficoltà',
      'Note automatiche e modalità timbro',
      'Macchiavelli contro 3 bot con drag & drop',
      'Cruciverba generato da dizionario',
      'Record e storico partite paginato',
      'Tema chiaro e scuro',
      'Risposte in formato JSend',
      'Helmet + rate-limiting',
      'Test Jest + supertest',
    ],
    year: '2026',
    gallery: [
      {
        src: '/img/projects/multigame-sudoku.webp',
        title: 'Sudoku',
        text: 'Griglie generate a 4 livelli di difficoltà, con timer, contatore errori, annulla e pausa. Sui livelli più semplici le note si compilano da sole.',
      },
      {
        src: '/img/projects/multigame-macchiavelli.webp',
        title: 'Macchiavelli',
        text: 'Una partita contro 3 bot: le carte si trascinano sul tavolo e il registro racconta ogni mossa. Regole e strategia dei bot girano tutte nel browser; il server salva solo l’esito.',
      },
      {
        src: '/img/projects/multigame-cruciverba.webp',
        title: 'Cruciverba',
        text: 'Uno schema denso costruito a partire dal dizionario italiano, con le definizioni a fianco della griglia, timer e tempo migliore per dimensione.',
      },
      {
        src: '/img/projects/multigame-record.webp',
        title: 'Record e storico',
        text: 'Tempi migliori per difficoltà e storico di tutte le partite, paginato lato server.',
      },
      {
        src: '/img/projects/multigame-estremo.webp',
        title: 'Livello Estremo',
        text: 'Al livello Estremo le note sono disattivate, e il gioco lo fa notare con un po’ di ironia. Un dettaglio piccolo, ma è il tipo di cura che mi piace mettere in quello che costruisco.',
      },
    ],
    design: {
      note: 'Un’interfaccia pulita che lascia spazio al gioco. Nella griglia ogni colore ha un significato: celle date, cella selezionata, numeri uguali ed errori si distinguono a colpo d’occhio, sia nel tema chiaro sia in quello scuro.',
      fonts: [{ family: 'Inter', role: 'Tutta l’interfaccia' }],
      colors: [
        { name: 'Blu notte', hex: '#1a1a2e' },
        { name: 'Selezione', hex: '#3b82f6' },
        { name: 'Evidenziazione', hex: '#dbeafe' },
        { name: 'Numeri uguali', hex: '#fef08a' },
        { name: 'Celle date', hex: '#e8e4d8' },
        { name: 'Errore', hex: '#b91c1c' },
        { name: 'Sfondo', hex: '#fafafa' },
      ],
    },
    en: {
      summary:
        'A collection of web games: Sudoku (4 difficulty levels), Macchiavelli (1 human vs 3 bots) and a crossword generated from the Italian dictionary. Angular 21 frontend, Express 5 REST API for games and records, JSend format, Helmet + rate limiting, Jest + supertest tests.',
      tagline: 'Sudoku, Macchiavelli and crosswords on a single web platform.',
      problem:
        'Several games in one place, with a single account, saved games and best-time leaderboards for each difficulty level: without a dedicated backend for each game.',
      build:
        'Angular 21 frontend with light and dark themes, also installable as a desktop web app. Three games: Sudoku (generator with 4 difficulty levels, automatic notes and stamp mode), Macchiavelli (an Italian rummy-style card game, 1 human against 3 bots, with the game engine and AI running entirely on the frontend) and a dense crossword generated from the Italian dictionary (it.wiktionary). A single Express 5 + Sequelize/MariaDB REST API stores games and records in JSend format, hardened with Helmet and rate limiting and tested with Jest + supertest.',
      features: [
        'Sudoku generator with 4 difficulty levels',
        'Automatic notes and stamp mode',
        'Macchiavelli against 3 bots with drag & drop',
        'Crossword generated from a dictionary',
        'Records and paginated game history',
        'Light and dark theme',
        'JSend responses',
        'Helmet + rate limiting',
        'Jest + supertest tests',
      ],
      gallery: [
        {
          title: 'Sudoku',
          text: 'Generated grids across 4 difficulty levels, with timer, error counter, undo and pause. On the easier levels the notes fill themselves in.',
        },
        {
          title: 'Macchiavelli',
          text: 'A game against 3 bots: cards are dragged onto the table and the log records every move. Rules and bot strategy all run in the browser; the server only stores the result.',
        },
        {
          title: 'Crossword',
          text: 'A dense grid built from the Italian dictionary, with clues next to the grid, a timer and the best time for each size.',
        },
        {
          title: 'Records and history',
          text: 'Best times per difficulty level and the history of every game, paginated server-side.',
        },
        {
          title: 'Extreme level',
          text: 'On the Extreme level notes are disabled, and the game points it out with a touch of irony. A small detail, but it’s the kind of care I like to put into what I build.',
        },
      ],
      design: {
        note: 'A clean interface that leaves room for the game. In the grid every color has a meaning: given cells, the selected cell, matching numbers and errors stand out at a glance, in both the light and dark themes.',
        fonts: ['The whole interface'],
        colors: [
          'Midnight blue',
          'Selection',
          'Highlight',
          'Matching numbers',
          'Given cells',
          'Error',
          'Background',
        ],
      },
    },
  },
];
