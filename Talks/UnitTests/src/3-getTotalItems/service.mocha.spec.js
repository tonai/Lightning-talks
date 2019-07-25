import { expect } from 'chai';
import sinon from 'sinon';
import service from './service';

describe('service', () => {
  let spy;

  beforeEach(() => {
    spy = sinon.fake();
    global.fetch = sinon.fake.returns(Promise.resolve({
      json: spy
    }));
  });

  it('should call the json function', () => {
    return service
      .getCart()
      .then(() => {
        expect(global.fetch.called).to.equal(true);
        expect(spy.called).to.equal(true);
      });
  });
});
