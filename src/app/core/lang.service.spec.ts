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
    // ponytail: currentLang is Signal<string|null> in v18 — call it to get value
    expect(t.currentLang()).toBe('en');
  });
});
