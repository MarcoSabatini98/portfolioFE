import { inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

type Lang = 'it' | 'en';

@Injectable({ providedIn: 'root' })
export class LangService {
  private readonly translate = inject(TranslateService);
  readonly lang = signal<Lang>('it');

  init(): void {
    const stored = localStorage.getItem('lang') as Lang | null;
    this.use(stored ?? 'it');
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
