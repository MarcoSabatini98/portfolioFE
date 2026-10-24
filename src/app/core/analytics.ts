interface GoatCounter {
  count(opts: { path: string; title?: string; event?: boolean }): void;
}
declare global {
  interface Window {
    goatcounter?: GoatCounter;
  }
}

let lastPath = '';

/**
 * count.js only counts the first page load. Angular navigations don't reload
 * the page, so each NavigationEnd is counted here. The first one is skipped
 * (count.js already has it) and hash-only changes on the same page are ignored.
 */
export function countPageView(url: string, initial = false): void {
  const path = url.split('#')[0];
  if (path === lastPath) return;
  lastPath = path;
  if (initial) return;
  try {
    window.goatcounter?.count({ path });
  } catch {
    /* tracking must never break navigation */
  }
}

export function countCvDownload(lang: 'it' | 'en'): void {
  try {
    window.goatcounter?.count({
      path: `cv-download-${lang}`,
      title: `CV download (${lang})`,
      event: true,
    });
  } catch {
    /* tracking must never block the download */
  }
}
