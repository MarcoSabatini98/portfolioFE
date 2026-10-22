import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { PROJECTS } from '../../data/projects';
import { ProjectsListComponent } from './projects-list';

describe('ProjectsListComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [ProjectsListComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideTranslateService({ fallbackLang: 'it', lang: 'it' }),
      ],
    }),
  );

  it('renders 4 project cards', () => {
    const f = TestBed.createComponent(ProjectsListComponent);
    f.detectChanges();
    const cards = f.nativeElement.querySelectorAll('[data-test="project-card"]');
    expect(cards.length).toBe(4);
  });

  it('component exposes 4 projects each with an id', () => {
    const f = TestBed.createComponent(ProjectsListComponent);
    f.detectChanges();
    // routerLink is ['/progetti', p.id] — verify the data that drives it
    expect(f.componentInstance.projects.length).toBe(4);
    f.componentInstance.projects.forEach((p) => expect(p.id).toBeTruthy());
  });

  it('card title link points to /progetti/<id>', () => {
    const f = TestBed.createComponent(ProjectsListComponent);
    f.detectChanges();
    const links = f.nativeElement.querySelectorAll('[data-test="project-card"] a.card-link');
    expect(links.length).toBe(4);
    links.forEach((a: HTMLAnchorElement, i: number) =>
      expect(a.getAttribute('href')).toBe('/progetti/' + f.componentInstance.projects[i].id),
    );
  });

  it('renders demo link only for projects with demoUrl', () => {
    const f = TestBed.createComponent(ProjectsListComponent);
    f.detectChanges();
    const demoLinks: HTMLAnchorElement[] = Array.from(
      f.nativeElement.querySelectorAll('[data-test="demo-link"]'),
    );
    expect(demoLinks.map((a) => a.getAttribute('href'))).toEqual(
      PROJECTS.filter((p) => p.demoUrl).map((p) => p.demoUrl),
    );
  });

  it('odd count of regular projects: only the last one goes horizontal', () => {
    const f = TestBed.createComponent(ProjectsListComponent);
    f.detectChanges();
    const cards: HTMLElement[] = Array.from(
      f.nativeElement.querySelectorAll('[data-test="project-card"]'),
    );
    const wide = cards.filter((c) => c.classList.contains('row') && !c.classList.contains('feat'));
    expect(wide.length).toBe(1);
    expect(wide[0]).toBe(cards[cards.length - 1]);
  });

  it('inner links have rel="noopener"', () => {
    const f = TestBed.createComponent(ProjectsListComponent);
    f.detectChanges();
    const extLinks = f.nativeElement.querySelectorAll(
      '[data-test="code-be"],[data-test="code-fe"],[data-test="demo-link"]',
    );
    extLinks.forEach((a: Element) => {
      expect(a.getAttribute('rel')).toBe('noopener');
    });
  });
});
