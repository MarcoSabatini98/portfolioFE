import { describe, it, expect } from 'vitest';
import { PROJECTS } from './projects';

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
});
