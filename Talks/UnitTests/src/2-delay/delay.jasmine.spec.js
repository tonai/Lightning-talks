import delay from './delay';
describe('delay', () => {
  it('async testing with done', done => {
    delay(() => {})
      .then(() => done());
  });
  it('async testing with promise', () => {
    return delay(() => {}, 200);
  });
  it('use spy', () => {
    const spy = jasmine.createSpy();
    return delay(spy)
      .then(() => expect(spy).toHaveBeenCalled());
  });
});
