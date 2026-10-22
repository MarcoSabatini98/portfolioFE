import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { RevealDirective } from './reveal.directive';

@Component({
  standalone: true,
  imports: [RevealDirective],
  template: `<div appReveal></div>`,
})
class BasicHost {}

@Component({
  standalone: true,
  imports: [RevealDirective],
  template: `<div [appRevealDelay]="200" appReveal></div>`,
})
class DelayHost {}

function mockMatchMedia(reduced: boolean) {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: reduced ? query.includes('reduce') : false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

/** Build a real constructor-compatible IO mock; returns spies + callback capture. */
function makeIOMock() {
  let capturedCallback: IntersectionObserverCallback | null = null;
  const observeSpy = vi.fn();
  const unobserveSpy = vi.fn();
  const disconnectSpy = vi.fn();

  function MockIO(this: IntersectionObserver, cb: IntersectionObserverCallback) {
    capturedCallback = cb;
  }
  MockIO.prototype.observe = observeSpy;
  MockIO.prototype.unobserve = unobserveSpy;
  MockIO.prototype.disconnect = disconnectSpy;

  vi.stubGlobal('IntersectionObserver', MockIO);

  return { getCb: () => capturedCallback, observeSpy, unobserveSpy, disconnectSpy };
}

describe('RevealDirective', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('reveals on intersection', () => {
    it('does not have is-visible before intersection fires', () => {
      mockMatchMedia(false);
      makeIOMock();
      const fixture = TestBed.createComponent(BasicHost);
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css('[appReveal]')).nativeElement;
      expect(el.classList.contains('is-visible')).toBe(false);
    });

    it('adds is-visible and calls unobserve when entry isIntersecting', () => {
      mockMatchMedia(false);
      const { getCb, unobserveSpy } = makeIOMock();
      const fixture = TestBed.createComponent(BasicHost);
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css('[appReveal]')).nativeElement;

      const cb = getCb();
      expect(cb).not.toBeNull();
      cb!(
        [{ isIntersecting: true, target: el } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );

      expect(el.classList.contains('is-visible')).toBe(true);
      expect(unobserveSpy).toHaveBeenCalledWith(el);
    });

    it('does not add is-visible when entry is not intersecting', () => {
      mockMatchMedia(false);
      const { getCb } = makeIOMock();
      const fixture = TestBed.createComponent(BasicHost);
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css('[appReveal]')).nativeElement;

      getCb()!(
        [{ isIntersecting: false, target: el } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );

      expect(el.classList.contains('is-visible')).toBe(false);
    });
  });

  describe('reduced-motion', () => {
    it('applies is-visible immediately without constructing IntersectionObserver', () => {
      const ioConstructorSpy = vi.fn();
      vi.stubGlobal('IntersectionObserver', ioConstructorSpy);
      mockMatchMedia(true);

      const fixture = TestBed.createComponent(BasicHost);
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css('[appReveal]')).nativeElement;

      expect(el.classList.contains('is-visible')).toBe(true);
      expect(ioConstructorSpy).not.toHaveBeenCalled();
    });
  });

  describe('delay input', () => {
    it('sets --reveal-delay on host when appRevealDelay > 0', () => {
      mockMatchMedia(false);
      makeIOMock();
      const fixture = TestBed.createComponent(DelayHost);
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css('[appReveal]')).nativeElement as HTMLElement;
      expect(el.style.getPropertyValue('--reveal-delay')).toBe('200ms');
    });
  });
});
