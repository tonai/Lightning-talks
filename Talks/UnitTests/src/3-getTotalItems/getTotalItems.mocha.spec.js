import { expect } from 'chai';
import sinon from 'sinon';
import getTotalItems from './getTotalItems';
import service from './service';

describe('getTotalItems', () => {
  before(() => {
    sinon.stub(service, 'getCart');
  });

  beforeEach(() => {
    service.getCart.resetHistory();
  });

  after(() => {
    service.getCart.restore();
  });

  it('should fail', () => {
    service.getCart.returns(Promise.reject({ message: 'An error occured' }));
    const resultPromise = getTotalItems();
    return resultPromise.then(message => {
      expect(message).to.equal('An error occured');
      expect(service.getCart.calledOnce).to.equal(true);
    });
  });

  it('should return the total number of items in the cart', () => {
    service.getCart.returns(Promise.resolve([
      { productId: 42, price: 12, qty: 1 },
      { productId: 43, price: 6, qty: 3 }
    ]));
    const resultPromise = getTotalItems();
    return resultPromise.then(total => {
      expect(total).to.equal(4);
      expect(service.getCart.calledOnce).to.equal(true);
    });
  });
});
