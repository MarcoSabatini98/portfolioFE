import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AboutComponent } from '../../sections/about/about';
import { SkillsComponent } from '../../sections/skills/skills';
import { RevealDirective } from '../../core/reveal.directive';

@Component({
  selector: 'app-about-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, AboutComponent, SkillsComponent, RevealDirective],
  templateUrl: './about-page.html',
  styleUrl: './about-page.scss',
})
export class AboutPageComponent {}
