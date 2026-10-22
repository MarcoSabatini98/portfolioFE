import { TestBed } from '@angular/core/testing';
import { ShotsComponent } from './shots';

function setup(shots: string[]) {
  const f = TestBed.createComponent(ShotsComponent);
  f.componentRef.setInput('shots', shots);
  f.componentRef.setInput('alt', 'Demo');
  f.detectChanges();
  const el = f.nativeElement as HTMLElement;
  const active = () =>
    Array.from(el.querySelectorAll('[data-test="shot"]')).findIndex((i) =>
      i.classList.contains('on'),
    );
  return { f, el, active };
}

describe('ShotsComponent', () => {
  it('single image: static, no progress bar', () => {
    const { el, active } = setup(['/a.webp']);
    expect(active()).toBe(0);
    expect(el.querySelector('[data-test="shot-bar"]')).toBeNull();
  });

  it('cycles to the next image when the bar finishes, then wraps', () => {
    const { f, el, active } = setup(['/a.webp', '/b.webp']);
    const finish = () => {
      el.querySelector('.fill')!.dispatchEvent(new Event('animationend'));
      f.detectChanges();
    };
    expect(active()).toBe(0);
    finish();
    expect(active()).toBe(1);
    finish();
    expect(active()).toBe(0);
  });

  it('alt text only on the first image, others decorative', () => {
    const { el } = setup(['/a.webp', '/b.webp']);
    const alts = Array.from(el.querySelectorAll('img')).map((i) => i.getAttribute('alt'));
    expect(alts).toEqual(['Demo', '']);
  });
});
