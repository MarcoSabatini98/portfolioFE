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
}

export interface GalleryShot {
  src: string;
  title: string;
  text: string;
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
  },
];
