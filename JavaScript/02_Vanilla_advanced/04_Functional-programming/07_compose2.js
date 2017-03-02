var R = require('ramda');

var point = {
  x: 2,
  y: 3,
  z: 5,
  toString: function() {
    return '(' + this.x + ';' + this.y + ';' + this.z + ')';
  }
};

function square(value){
  return value * value;
}

function sum(a, b){
  return a + b;
}

function istypeOf(type, coordinate){
  return typeof coordinate == type;
}
istypeOf = R.curry(istypeOf);

var filterOnlyNumbers = R.filter(istypeOf('number'));
var squareMap = R.map(square);
var sumTogether = R.reduce(sum, 0);

var distance = R.compose(Math.sqrt, sumTogether, squareMap, filterOnlyNumbers, Object.values);
// OR
var distance = R.pipe(Object.values, filterOnlyNumbers, squareMap, sumTogether, Math.sqrt);

var result = distance(point);

console.log(result);
