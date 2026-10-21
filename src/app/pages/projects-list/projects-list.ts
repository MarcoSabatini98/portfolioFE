import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-projects-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<section class="wrap"><h1>Progetti</h1></section>`,
  styles: [
    `
      .wrap {
        padding: 4rem max(1.5rem, calc((100% - 1040px) / 2));
      }
    `,
  ],
})
export class ProjectsListComponent {}
