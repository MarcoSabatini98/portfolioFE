import { countCvDownload } from './analytics';

describe('countCvDownload', () => {
  afterEach(() => { delete (window as any).goatcounter; });

  it('calls goatcounter.count with an event path', () => {
    const count = vi.fn();
    (window as any).goatcounter = { count };
    countCvDownload('it');
    expect(count).toHaveBeenCalledWith(
      expect.objectContaining({ path: 'cv-download-it', event: true }),
    );
  });

  it('does not throw when goatcounter is absent', () => {
    expect(() => countCvDownload('en')).not.toThrow();
  });
});
