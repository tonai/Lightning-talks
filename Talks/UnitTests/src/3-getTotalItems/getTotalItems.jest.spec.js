import service from './service';
import getTotalItems from './getTotalItems';
jest.mock('./service');

describe('getTotalItems', () => {
  let spy;

  beforeAll(() => {
    spy = jest.spyOn(service, 'getCart');
  });

  beforeEach(() => {
    spy.mockReset();
  });

  it('should fail', () => {
    spy.mockReturnValue(Promise.reject({ message: 'An error occured' }));
    const resultPromise = getTotalItems();
    return resultPromise.then(message => {
      expect(message).toEqual('An error occured');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  it('should return the total number of items in the cart', () => {
    spy.mockReturnValue(Promise.resolve([
      { productId: 42, price: 12, qty: 1 },
      { productId: 43, price: 6, qty: 3 }
    ]));
    const resultPromise = getTotalItems();
    return resultPromise.then(total => {
      expect(total).toEqual(4);
      expect(spy).toHaveBeenCalledTimes(1);
    })
  });
});
