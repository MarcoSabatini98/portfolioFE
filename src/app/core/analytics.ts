interface GoatCounter { count(opts: { path: string; title?: string; event?: boolean }): void; }
declare global { interface Window { goatcounter?: GoatCounter; } }

export function countCvDownload(lang: 'it' | 'en'): void {
  try {
    window.goatcounter?.count({ path: `cv-download-${lang}`, title: `CV download (${lang})`, event: true });
  } catch {
    /* tracking must never block the download */
  }
}
