import service from './service';

describe('service', () => {
  let spy;

  beforeEach(() => {
    spy = jest.fn();
    global.fetch = jest.fn().mockReturnValue(Promise.resolve({
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
