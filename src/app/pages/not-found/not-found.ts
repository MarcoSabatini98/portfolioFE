import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-not-found',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, TranslatePipe],
  template: `
    <section class="wrap">
      <p class="code">404</p>
      <p class="msg">{{ 'notFound.message' | translate }}</p>
      <a routerLink="/" class="btn">{{ 'notFound.home' | translate }}</a>
    </section>
  `,
  styles: [
    `
      .wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 60vh;
        padding: 4rem 1.5rem;
        text-align: center;
      }
      .code {
        font-size: clamp(5rem, 20vw, 10rem);
        font-weight: 800;
        line-height: 1;
        background: linear-gradient(135deg, var(--accent), var(--accent-2));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin: 0 0 0.5rem;
      }
      .msg {
        color: var(--muted);
        font-size: 1.1rem;
        margin: 0 0 2rem;
      }
      .btn {
        display: inline-block;
        padding: 0.6rem 1.4rem;
        border-radius: 10px;
        background: linear-gradient(135deg, var(--accent), var(--accent-2));
        color: var(--accent-fg);
        font-weight: 600;
        text-decoration: none;
        box-shadow: var(--shadow);
      }
      .btn:hover {
        opacity: 0.88;
      }
    `,
  ],
})
export class NotFoundComponent {}
