import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

// Project screenshots. One image: static. More: they cross-fade in turn while a thin bar
// fills up until the next one. The bar's CSS animation is the timer, so hover pauses it
// and reduced motion (bar hidden, no animationend) keeps the first image.
@Component({
  selector: 'app-shots',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      display: grid;
      position: relative;
      overflow: hidden;
    }
    img {
      grid-area: 1 / 1;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
      display: block;
      opacity: 0;
      transition: opacity 0.9s ease;
    }
    img.on {
      opacity: 1;
    }
    .track {
      position: absolute;
      inset: auto 0 0;
      height: 3px;
      background: color-mix(in srgb, var(--accent) 22%, transparent);
    }
    .fill {
      display: block;
      height: 100%;
      background: var(--accent);
      transform: scaleX(0);
      transform-origin: left;
      animation: fill var(--shot-ms, 5000ms) linear forwards;
    }
    :host(:hover) .fill {
      animation-play-state: paused;
    }
    @keyframes fill {
      to {
        transform: scaleX(1);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      img {
        transition: none;
      }
      .track {
        display: none;
      }
    }
  `,
  template: `
    @for (src of shots(); track src; let i = $index) {
      <img
        [src]="src"
        [alt]="i === 0 ? alt() : ''"
        [class.on]="i === current()"
        [attr.loading]="loading()"
        data-test="shot"
      />
    }
    @if (shots().length > 1) {
      <!-- keyed on the index so the bar restarts for every image -->
      @for (k of [current()]; track k) {
        <span class="track" aria-hidden="true" data-test="shot-bar">
          <span class="fill" (animationend)="next()"></span>
        </span>
      }
    }
  `,
})
export class ShotsComponent {
  readonly shots = input.required<string[]>();
  readonly alt = input('');
  readonly loading = input<'lazy' | 'eager'>('lazy');

  private readonly index = signal(0);
  readonly current = computed(() => this.index() % this.shots().length);

  next(): void {
    this.index.set(this.current() + 1);
  }
}
