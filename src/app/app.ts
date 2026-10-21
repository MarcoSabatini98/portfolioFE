import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ThemeService } from './core/theme.service';
import { LangService } from './core/lang.service';

@Component({
  selector: 'app-root',
  imports: [TranslatePipe, RouterOutlet, RouterLink, RouterLinkActive],
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
