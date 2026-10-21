import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from '../../sections/hero/hero';
import { ProjectsComponent } from '../../sections/projects/projects';
import { AboutComponent } from '../../sections/about/about';
import { SkillsComponent } from '../../sections/skills/skills';
import { ContactComponent } from '../../sections/contact/contact';

// ponytail: composes existing sections directly; Task 7 will restructure into a true home page
@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeroComponent, ProjectsComponent, AboutComponent, SkillsComponent, ContactComponent],
  template: `
    <app-hero />
    <app-projects />
    <app-about />
    <app-skills />
    <app-contact />
  `,
})
export class HomeComponent {}
