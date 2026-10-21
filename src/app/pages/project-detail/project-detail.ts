import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { RevealDirective } from '../../core/reveal.directive';
import { PROJECTS, Project } from '../../data/projects';

@Component({
  selector: 'app-project-detail',
  imports: [TranslatePipe, RouterLink, RevealDirective],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailComponent {
  project: Project | undefined;

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    const found = PROJECTS.find((p) => p.id === id);
    if (!found) {
      this.router.navigate(['/progetti']);
      return;
    }
    this.project = found;
  }

  get hasLinks(): boolean {
    return !!(this.project?.repoBeUrl || this.project?.repoFeUrl || this.project?.demoUrl);
  }
}
