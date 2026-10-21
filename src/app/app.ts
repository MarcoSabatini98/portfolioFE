import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
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

  ngOnInit(): void {
    this.theme.init();
    this.lang.init();
  }
}
