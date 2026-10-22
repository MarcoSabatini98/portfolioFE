import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';
import { ProjectDetailComponent } from './project-detail';

function makeStubRoute(id: string) {
  return {
    snapshot: {
      paramMap: {
        get: (_key: string) => id,
      },
    },
  };
}

describe('ProjectDetailComponent', () => {
  describe('known id: progetto', () => {
    beforeEach(() =>
      TestBed.configureTestingModule({
        imports: [ProjectDetailComponent],
        providers: [
          provideRouter([]),
          provideHttpClient(),
          provideTranslateService({ fallbackLang: 'it', lang: 'it' }),
          { provide: ActivatedRoute, useValue: makeStubRoute('progetto') },
        ],
      }),
    );

    it('resolves the project from the route id', () => {
      const f = TestBed.createComponent(ProjectDetailComponent);
      f.detectChanges();
      expect(f.componentInstance.project()?.id).toBe('progetto');
    });

    it('renders the project name in the DOM', () => {
      const f = TestBed.createComponent(ProjectDetailComponent);
      f.detectChanges();
      const h1: HTMLElement = f.nativeElement.querySelector('h1');
      expect(h1.textContent).toContain('Booking & Property Management');
    });

    it('renders at least one feature item', () => {
      const f = TestBed.createComponent(ProjectDetailComponent);
      f.detectChanges();
      const items = f.nativeElement.querySelectorAll('.feature-item');
      expect(items.length).toBeGreaterThan(0);
    });

    it('renders one gallery figure per screenshot', () => {
      const f = TestBed.createComponent(ProjectDetailComponent);
      f.detectChanges();
      const shots = f.nativeElement.querySelectorAll('.shot');
      expect(shots.length).toBe(8);
      expect(shots[0].querySelector('img').getAttribute('loading')).toBe('lazy');
    });

    it('renders font specimens and palette, loading the fonts only while open', () => {
      const f = TestBed.createComponent(ProjectDetailComponent);
      f.detectChanges();
      const el: HTMLElement = f.nativeElement;
      expect(el.querySelectorAll('.font-card').length).toBe(4);
      expect(el.querySelectorAll('.swatch').length).toBe(7);
      const sel = 'link[href*="fonts.googleapis.com/css2?family=Young+Serif"]';
      expect(document.head.querySelector(sel)).toBeTruthy();
      f.destroy();
      expect(document.head.querySelector(sel)).toBeNull();
    });

    it('renders code-be and code-fe links with rel="noopener"', () => {
      const f = TestBed.createComponent(ProjectDetailComponent);
      f.detectChanges();
      const be: HTMLAnchorElement = f.nativeElement.querySelector('[data-test="code-be"]');
      const fe: HTMLAnchorElement = f.nativeElement.querySelector('[data-test="code-fe"]');
      expect(be).toBeTruthy();
      expect(be.getAttribute('rel')).toBe('noopener');
      expect(fe).toBeTruthy();
      expect(fe.getAttribute('rel')).toBe('noopener');
    });
  });

  describe('unknown id: nope', () => {
    let navigateSpy: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      navigateSpy = vi.fn();
      TestBed.configureTestingModule({
        imports: [ProjectDetailComponent],
        providers: [
          provideRouter([]),
          provideHttpClient(),
          provideTranslateService({ fallbackLang: 'it', lang: 'it' }),
          { provide: ActivatedRoute, useValue: makeStubRoute('nope') },
          { provide: Router, useValue: { navigate: navigateSpy } },
        ],
      });
    });

    it('calls router.navigate(["/progetti"]) for unknown id', () => {
      TestBed.createComponent(ProjectDetailComponent);
      expect(navigateSpy).toHaveBeenCalledWith(['/progetti'], { replaceUrl: true });
    });

    it('project field is undefined for unknown id', () => {
      const f = TestBed.createComponent(ProjectDetailComponent);
      expect(f.componentInstance.project()).toBeUndefined();
    });
  });
});
