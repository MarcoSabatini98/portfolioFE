import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { RevealDirective } from '../../core/reveal.directive';
import { PROJECTS } from '../../data/projects';
import { ShotsComponent } from '../../shared/shots/shots';

@Component({
  selector: 'app-projects-list',
  imports: [TranslatePipe, RouterLink, RevealDirective, ShotsComponent],
  templateUrl: './projects-list.html',
  styleUrl: './projects-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsListComponent {
  readonly projects = PROJECTS;

  // Regular cards sit in pairs; with an odd count the last one goes horizontal so it never sits alone.
  private readonly regular = PROJECTS.filter((p) => !p.featured);
  readonly wideId = this.regular.length % 2 ? this.regular.at(-1)?.id : undefined;
}
