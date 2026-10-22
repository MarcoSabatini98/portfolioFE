import { describe, it, expect } from 'vitest';
import { PROJECTS, localize } from './projects';

describe('PROJECTS data model', () => {
  it('every project has non-empty tagline, problem, build, and features array', () => {
    PROJECTS.forEach((project) => {
      expect(project.tagline, `${project.id} missing tagline`).toBeTruthy();
      expect(project.tagline.length > 0, `${project.id} tagline is empty`).toBe(true);

      expect(project.problem, `${project.id} missing problem`).toBeTruthy();
      expect(project.problem.length > 0, `${project.id} problem is empty`).toBe(true);

      expect(project.build, `${project.id} missing build`).toBeTruthy();
      expect(project.build.length > 0, `${project.id} build is empty`).toBe(true);

      expect(project.features, `${project.id} missing features array`).toBeDefined();
      expect(Array.isArray(project.features), `${project.id} features is not an array`).toBe(true);
      expect(project.features.length > 0, `${project.id} features array is empty`).toBe(true);
    });
  });

  it('every project has complete English copy, one caption per screenshot', () => {
    PROJECTS.forEach((project) => {
      const en = project.en;
      expect(en, `${project.id} missing en`).toBeDefined();
      for (const key of ['summary', 'tagline', 'problem', 'build'] as const) {
        expect(en?.[key], `${project.id} en.${key}`).toBeTruthy();
      }
      expect(en?.features.length, `${project.id} en.features`).toBeGreaterThan(0);
      expect(en?.gallery?.length, `${project.id} en.gallery`).toBe(project.gallery?.length);
    });
  });

  it('localize swaps in English text and keeps screenshots', () => {
    const it = PROJECTS[0];
    const en = localize(it, 'en');
    expect(en.tagline).toBe(it.en?.tagline);
    expect(en.gallery?.[0].src).toBe(it.gallery?.[0].src);
    expect(en.gallery?.[0].title).toBe(it.en?.gallery?.[0].title);
    expect(localize(it, 'it')).toBe(it);
  });
});
