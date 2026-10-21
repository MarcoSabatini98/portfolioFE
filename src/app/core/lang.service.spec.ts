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

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('defaults to it when nothing stored', () => {
    vi.stubGlobal('navigator', { language: 'it-IT' });
    const s = TestBed.inject(LangService);
    s.init();
    expect(s.lang()).toBe('it');
  });

  it('uses browser language en when nothing stored', () => {
    vi.stubGlobal('navigator', { language: 'en-US' });
    const s = TestBed.inject(LangService);
    s.init();
    expect(s.lang()).toBe('en');
  });

  it('ignores invalid stored lang value (e.g. fr) and falls back to browser', () => {
    vi.stubGlobal('navigator', { language: 'it-IT' });
    localStorage.setItem('lang', 'fr');
    const s = TestBed.inject(LangService);
    s.init();
    expect(['it', 'en']).toContain(s.lang());
    expect(s.lang()).not.toBe('fr');
  });

  it('toggle flips language and persists', () => {
    vi.stubGlobal('navigator', { language: 'it-IT' });
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
