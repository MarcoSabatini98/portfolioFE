import { countCvDownload, countPageView } from './analytics';

describe('countCvDownload', () => {
  afterEach(() => {
    delete (window as any).goatcounter;
  });

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

describe('countPageView', () => {
  afterEach(() => {
    delete (window as any).goatcounter;
  });

  it('skips the first load, then counts navigations once per path', () => {
    const count = vi.fn();
    (window as any).goatcounter = { count };
    countPageView('/', true);
    countPageView('/#contatti');
    countPageView('/progetti');
    countPageView('/progetti#top');
    expect(count).toHaveBeenCalledTimes(1);
    expect(count).toHaveBeenCalledWith({ path: '/progetti' });
  });
});
