import getTotalItems from './getTotalItems';
import service from './service';

describe('getTotalItems', () => {
  let spy;

  beforeAll(() => {
    spy = spyOn(service, 'getCart');
  });

  beforeEach(() => {
    spy.calls.reset();
  });

  it('should fail', () => {
    spy.and.returnValue(Promise.reject({ message: 'An error occured' }));
    const resultPromise = getTotalItems();
    return resultPromise.then(message => {
      expect(message).toEqual('An error occured');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  it('should return the total number of items in the cart', () => {
    spy.and.returnValue(Promise.resolve([
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
