import service from './service';

describe('service', () => {
  let spy;

  beforeEach(() => {
    spy = jasmine.createSpy();
    global.fetch = jasmine.createSpy().and.returnValue(Promise.resolve({
      json: spy
    }));
  });

  it('should call the json function', () => {
    return service
      .getCart()
      .then(() => {
        expect(global.fetch).toHaveBeenCalled();
        expect(spy).toHaveBeenCalled();
      });
  });
});
