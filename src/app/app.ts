import { Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ThemeService } from './core/theme.service';
import { LangService } from './core/lang.service';
import { countPageView } from './core/analytics';
import { FooterComponent } from './shared/footer/footer';
import { IconComponent } from './shared/icon/icon';

@Component({
  selector: 'app-root',
  imports: [
    TranslatePipe,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FooterComponent,
    IconComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  readonly theme = inject(ThemeService);
  readonly lang = inject(LangService);
  readonly menuOpen = signal(false);

  constructor(private router: Router) {
    // Close mobile menu on every navigation; count page views for GoatCounter
    this.router.events.subscribe((e) => {
      this.menuOpen.set(false);
      if (e instanceof NavigationEnd) countPageView(e.urlAfterRedirects, e.id === 1);
    });
  }

  ngOnInit(): void {
    this.theme.init();
    this.lang.init();
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }
}
