var R = require('ramda');

var SomeOperation = function(a, b, c) {
  return a + b * c;
};
SomeOperation = R.curry(SomeOperation);
console.log(SomeOperation(1, 2, 3));
console.log(SomeOperation(1)(2)(3));
console.log(SomeOperation(1)(2, 3));
console.log(SomeOperation(1, 2)(3));
