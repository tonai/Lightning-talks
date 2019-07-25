import { assert, expect, should } from 'chai';
import getTotal from './getTotal';
should();

describe('getTotal', () => {
  it('should calculate the cart total', () => {
    const cart = [
      { productId: 42, price: 12, qty: 1 },
      { productId: 43, price: 6, qty: 3 }
    ];
    const total = getTotal(cart);
    expect(total).to.equal(30);
    total.should.equal(30);
    assert.equal(total, 30);
  });
});
