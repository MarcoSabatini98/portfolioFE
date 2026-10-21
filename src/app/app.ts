import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { HeroComponent } from './sections/hero/hero';
import { AboutComponent } from './sections/about/about';
import { ProjectsComponent } from './sections/projects/projects';
import { SkillsComponent } from './sections/skills/skills';
import { ContactComponent } from './sections/contact/contact';
import { ThemeService } from './core/theme.service';
import { LangService } from './core/lang.service';

@Component({
  selector: 'app-root',
  imports: [TranslatePipe, HeroComponent, AboutComponent, ProjectsComponent, SkillsComponent, ContactComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  readonly theme = inject(ThemeService);
  readonly lang = inject(LangService);
  readonly year = new Date().getFullYear();

  ngOnInit(): void {
    this.theme.init();
    this.lang.init();
  }
}
