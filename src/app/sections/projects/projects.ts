import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { PROJECTS } from '../../data/projects';

@Component({
  selector: 'app-projects',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  readonly limit = input(PROJECTS.length);
  readonly visible = computed(() => PROJECTS.slice(0, this.limit()));
}
