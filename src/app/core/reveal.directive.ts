import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input('appRevealDelay') delay = 0;

  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);
  private observer: IntersectionObserver | null = null;

  ngOnInit(): void {
    if (this.delay > 0) {
      this.renderer.setStyle(this.el.nativeElement, 'transition-delay', `${this.delay}ms`);
    }

    if (!isPlatformBrowser(this.platformId)) {
      this.reveal();
      return;
    }

    // ponytail: guard for missing matchMedia (e.g. old jsdom)
    if (
      typeof matchMedia === 'function' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      this.reveal();
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      this.reveal();
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.reveal();
            this.observer?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 },
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private reveal(): void {
    this.renderer.addClass(this.el.nativeElement, 'is-visible');
  }
}
