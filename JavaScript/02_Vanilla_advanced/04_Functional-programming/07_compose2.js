var fn = require('fn.js');
var _ = require('lodash');

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
istypeOf = fn.curry(istypeOf);

function filter(func, array) {
  return array.filter(func);
}
filter = fn.curry(filter);

function map(func, array) {
  return array.map(func);
}
map = fn.curry(map);

function reduce(func, array) {
  return array.reduce(func);
}
reduce = fn.curry(reduce);

var onlyNumbers = filter(istypeOf('number'));
var squareEach = map(square);
var sumTogether = reduce(sum);

var distance = fn.compose(Math.sqrt, sumTogether, squareEach, onlyNumbers, _.values);

var result = distance(point);

console.log(result);
