import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-about-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<section class="wrap"><h1>Chi sono</h1></section>`,
  styles: [
    `
      .wrap {
        padding: 4rem max(1.5rem, calc((100% - 1040px) / 2));
      }
    `,
  ],
})
export class AboutPageComponent {}
