// ponytail: image paths are placeholder SVGs — swap for real screenshots when available
export interface Project {
  id: string;
  name: string;
  summary: string;
  tech: string[];
  repoBeUrl?: string;
  repoFeUrl?: string;
  demoUrl?: string;
  image: string;
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: 'progetto',
    name: 'Booking & Property Management',
    summary:
      'Piattaforma white-label full-stack per hotel e B&B: motore di prenotazione real-time, pagamenti Stripe/PayPal, front desk, housekeeping, chat live (Socket.IO), analytics, compliance italiana (Alloggiati Web, FatturaPA), sync OTA. 263 test, hardening OWASP.',
    tech: ['Node.js 22', 'Express 5', 'Sequelize', 'MariaDB', 'Socket.IO', 'Stripe', 'PayPal', 'JWT', 'Jest'],
    repoBeUrl: 'https://github.com/MarcoSabatini98/progettoBE',
    repoFeUrl: 'https://github.com/MarcoSabatini98/progettoFE',
    demoUrl: '',
    image: '/img/progetto.svg',
    featured: true,
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
    image: '/img/infopoint.svg',
  },
  {
    id: 'celesterosa',
    name: 'celesterosa',
    summary:
      'E-commerce di strumenti musicali. API Express 5 + Sequelize/MariaDB: catalogo a categorie gerarchiche (EAV), varianti, pagamenti Stripe (webhook), fatture PDF con IVA, email automatiche, storage immagini MinIO, docs Swagger.',
    tech: ['Angular 21', 'Express 5', 'Sequelize', 'MariaDB', 'Stripe', 'Swagger', 'JWT'],
    repoBeUrl: 'https://github.com/MarcoSabatini98/celesterosaBE',
    repoFeUrl: 'https://github.com/MarcoSabatini98/celesterosaFE',
    demoUrl: '',
    image: '/img/celesterosa.svg',
  },
  {
    id: 'multigame',
    name: 'Multi-game Platform',
    summary:
      'API REST multi-gioco: Sudoku (4 difficoltà), Macchiavelli (1 umano vs 3 bot) e Cruciverba generato dal dizionario italiano. Salvataggio partite e record, formato JSend, Helmet + rate-limiting, test Jest + supertest.',
    tech: ['Node.js', 'Express 5', 'Sequelize', 'MariaDB', 'Joi', 'Jest'],
    repoBeUrl: 'https://github.com/MarcoSabatini98/sudokuBE',
    repoFeUrl: 'https://github.com/MarcoSabatini98/sudokuFE',
    demoUrl: '',
    image: '/img/multigame.svg',
  },
];
