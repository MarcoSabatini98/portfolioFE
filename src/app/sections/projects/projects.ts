import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LangService } from '../../core/lang.service';
import { PROJECTS, localize } from '../../data/projects';
import { ShotsComponent } from '../../shared/shots/shots';

@Component({
  selector: 'app-projects',
  imports: [TranslatePipe, RouterLink, ShotsComponent],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  readonly limit = input(PROJECTS.length);
  private readonly lang = inject(LangService).lang;
  readonly visible = computed(() =>
    PROJECTS.slice(0, this.limit()).map((p) => localize(p, this.lang())),
  );
}
