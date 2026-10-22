import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ThemeService } from './core/theme.service';
import { LangService } from './core/lang.service';
import { FooterComponent } from './shared/footer/footer';

@Component({
  selector: 'app-root',
  imports: [TranslatePipe, RouterOutlet, RouterLink, RouterLinkActive, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  readonly theme = inject(ThemeService);
  readonly lang = inject(LangService);
  readonly menuOpen = signal(false);

  constructor(private router: Router) {
    // Close mobile menu on every navigation
    this.router.events.subscribe(() => this.menuOpen.set(false));
  }

  ngOnInit(): void {
    this.theme.init();
    this.lang.init();
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }
}
