import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LangService } from '../../core/lang.service';
import { RevealDirective } from '../../core/reveal.directive';
import { PROJECTS, localize } from '../../data/projects';
import { ShotsComponent } from '../../shared/shots/shots';

@Component({
  selector: 'app-projects-list',
  imports: [TranslatePipe, RouterLink, RevealDirective, ShotsComponent],
  templateUrl: './projects-list.html',
  styleUrl: './projects-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsListComponent {
  private readonly lang = inject(LangService).lang;
  readonly projects = computed(() => PROJECTS.map((p) => localize(p, this.lang())));

  // Regular cards sit in pairs; with an odd count the last one goes horizontal so it never sits alone.
  private readonly regular = PROJECTS.filter((p) => !p.featured);
  readonly wideId = this.regular.length % 2 ? this.regular.at(-1)?.id : undefined;
}
