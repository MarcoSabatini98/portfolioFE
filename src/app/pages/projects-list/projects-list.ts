import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { RevealDirective } from '../../core/reveal.directive';
import { PROJECTS } from '../../data/projects';

@Component({
  selector: 'app-projects-list',
  imports: [TranslatePipe, RouterLink, RevealDirective],
  templateUrl: './projects-list.html',
  styleUrl: './projects-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsListComponent {
  readonly projects = PROJECTS;
}
