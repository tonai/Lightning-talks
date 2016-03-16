var _ = require('lodash');

var SomeOperation = function(a, b, c) {
  return a + b * c;
}
SomeOperation = _.curry(SomeOperation);
console.log(SomeOperation(1, 2, 3));
console.log(SomeOperation(1)(2)(3));
console.log(SomeOperation(1)(2, 3));
console.log(SomeOperation(1, 2)(3));
