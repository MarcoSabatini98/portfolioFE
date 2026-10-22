import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { ProjectsComponent } from './projects';

describe('ProjectsComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [ProjectsComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideTranslateService({ fallbackLang: 'it', lang: 'it' }),
      ],
    }),
  );

  it('renders one card per project', () => {
    const f = TestBed.createComponent(ProjectsComponent);
    f.detectChanges();
    const cards = f.nativeElement.querySelectorAll('[data-test="project-card"]');
    expect(cards.length).toBe(4);
  });

  it('renders both Code BE and Code FE links on cards that have them', () => {
    const f = TestBed.createComponent(ProjectsComponent);
    f.detectChanges();
    const beLinks = f.nativeElement.querySelectorAll('[data-test="code-be"]');
    const feLinks = f.nativeElement.querySelectorAll('[data-test="code-fe"]');
    expect(beLinks.length).toBe(4);
    expect(feLinks.length).toBe(4);
  });

  it('renders demo link only for projects with demoUrl (exactly 1 — infopoint)', () => {
    const f = TestBed.createComponent(ProjectsComponent);
    f.detectChanges();
    const demoLinks = f.nativeElement.querySelectorAll('[data-test="demo-link"]');
    expect(demoLinks.length).toBe(1);
  });
});
