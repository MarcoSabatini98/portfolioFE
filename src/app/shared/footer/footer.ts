import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { countCvDownload } from '../../core/analytics';
import { LangService } from '../../core/lang.service';
import { IconComponent } from '../icon/icon';

@Component({
  selector: 'app-footer',
  imports: [TranslatePipe, RouterLink, RouterLinkActive, IconComponent],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  private readonly langSvc = inject(LangService);

  readonly year = new Date().getFullYear();
  readonly email = 'marcosabatini213@gmail.com';
  readonly linkedin = 'https://www.linkedin.com/in/marco-sabatini-dev/';
  readonly github = 'https://github.com/MarcoSabatini98';

  get cvHref(): string {
    return `/cv/marco-sabatini-${this.langSvc.lang()}.pdf`;
  }

  onCvDownload(): void {
    countCvDownload(this.langSvc.lang());
  }

  scrollTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
