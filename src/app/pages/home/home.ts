import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { HeroComponent } from '../../sections/hero/hero';
import { ProjectsComponent } from '../../sections/projects/projects';
import { SkillsComponent } from '../../sections/skills/skills';
import { RevealDirective } from '../../core/reveal.directive';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeroComponent,
    ProjectsComponent,
    SkillsComponent,
    RouterLink,
    TranslatePipe,
    RevealDirective,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {}
