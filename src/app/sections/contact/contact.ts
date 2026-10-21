import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { countCvDownload } from '../../core/analytics';
import { LangService } from '../../core/lang.service';

@Component({
  selector: 'app-contact',
  imports: [TranslatePipe],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  private readonly langSvc = inject(LangService);
  readonly email = 'marcosabatini213@gmail.com';
  readonly linkedin = 'https://www.linkedin.com/in/marco-sabatini-dev/';
  readonly github = 'https://github.com/MarcoSabatini98';

  get cvHref(): string { return `/cv/marco-sabatini-${this.langSvc.lang()}.pdf`; }

  onCvDownload(): void { countCvDownload(this.langSvc.lang()); }
}
