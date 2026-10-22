import { TestBed } from '@angular/core/testing';
import { IconComponent } from './icon';

describe('IconComponent', () => {
  it('renders the requested icon as real SVG elements', () => {
    const f = TestBed.createComponent(IconComponent);
    f.componentRef.setInput('name', 'mail');
    f.detectChanges();
    const rect = (f.nativeElement as HTMLElement).querySelector('svg rect');
    expect(rect?.namespaceURI).toBe('http://www.w3.org/2000/svg');
  });
});
