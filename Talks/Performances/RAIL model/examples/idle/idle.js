class IdleValue {
  constructor(init) {
    this._init = init;
    this._value;
    this._idleHandle = requestIdleCallback(() => {
      this._value = this._init();
    });
  }

  getValue() {
    if (this._value === undefined) {
      cancelIdleCallback(this._idleHandle);
      this._value = this._init();
    }
    return this._value;
  }
}