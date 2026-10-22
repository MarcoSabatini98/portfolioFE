import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactComponent } from '../../sections/contact/contact';
import { RevealDirective } from '../../core/reveal.directive';

@Component({
  selector: 'app-contact-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ContactComponent, RevealDirective],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.scss',
})
export class ContactPageComponent {}
