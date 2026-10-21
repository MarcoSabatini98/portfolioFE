import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    TestBed.configureTestingModule({});
  });

  it('defaults to light when no preference stored', () => {
    const s = TestBed.inject(ThemeService);
    s.init();
    expect(s.theme()).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('toggle flips theme and persists', () => {
    const s = TestBed.inject(ThemeService);
    s.init();
    s.toggle();
    expect(s.theme()).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('restores persisted theme on init', () => {
    localStorage.setItem('theme', 'dark');
    const s = TestBed.inject(ThemeService);
    s.init();
    expect(s.theme()).toBe('dark');
  });
});
