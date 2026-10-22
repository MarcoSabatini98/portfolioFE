import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LangService } from '../../core/lang.service';
import { RevealDirective } from '../../core/reveal.directive';
import { PROJECTS, Project, localize } from '../../data/projects';
import { ShotsComponent } from '../../shared/shots/shots';

@Component({
  selector: 'app-project-detail',
  imports: [TranslatePipe, RouterLink, RevealDirective, ShotsComponent],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailComponent {
  private readonly found?: Project;
  private readonly lang = inject(LangService).lang;
  readonly project = computed(() => this.found && localize(this.found, this.lang()));

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    const found = PROJECTS.find((p) => p.id === id);
    if (!found) {
      this.router.navigate(['/progetti'], { replaceUrl: true });
      return;
    }
    this.found = found;
    this.loadFonts(found);
  }

  get hasLinks(): boolean {
    return !!(this.found?.repoBeUrl || this.found?.repoFeUrl || this.found?.demoUrl);
  }

  /** CSS font stack for a specimen: the family plus a sensible generic fallback. */
  fontStack(family: string): string {
    const generic = /Mono/.test(family)
      ? 'monospace'
      : /Serif|Fraunces/.test(family)
        ? 'serif'
        : 'sans-serif';
    return `'${family}', ${generic}`;
  }

  /** Loads this project's fonts from Google Fonts only while its page is open. */
  private loadFonts(p: Project): void {
    const families = p.design?.fonts.map((f) => 'family=' + f.family.replaceAll(' ', '+'));
    if (!families?.length) return;
    const doc = inject(DOCUMENT);
    const link = doc.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?${families.join('&')}&display=swap`;
    doc.head.appendChild(link);
    inject(DestroyRef).onDestroy(() => link.remove());
  }
}
