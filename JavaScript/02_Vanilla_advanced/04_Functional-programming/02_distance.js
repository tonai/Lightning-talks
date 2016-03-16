var _ = require('lodash');

var point = {
  x: 2,
  y: 3,
  z: 5,
  toString: function() {
    return '(' + this.x + ';' + this.y + ';' + this.z + ')';
  }
};

var _ = require('lodash');
var distance = function(point) {
  var value = _.values(point)
    .filter(x => typeof x == 'number')
    .map(x => x * x)
    .reduce((a, b) => a + b, 0);
  return Math.sqrt(value);
};

console.log(JSON.stringify(distance(point), null, 2));
