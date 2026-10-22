import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ContactComponent } from '../../sections/contact/contact';
import { RevealDirective } from '../../core/reveal.directive';

@Component({
  selector: 'app-contact-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ContactComponent, RevealDirective, TranslatePipe],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.scss',
})
export class ContactPageComponent {}
