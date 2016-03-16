var request = require('ajax-request');
var Promise = require('bluebird');
var fn = require('fn.js');

const URL = 'http://localhost:8080';

function getBasket() {
  return new Promise(function(resolve, reject){
    request(URL, function(err, res, body){
      if (err) {
        reject(body);
      } else {
        resolve(body);
      }
    });
  });
}

function get(key, object) {
  return object[key];
}
get = fn.curry(get);

function sum(a, b) {
  return a + b;
}
sum = fn.curry(sum);

function mapArray(func, array) {
  return array.map(func);
}
mapArray = fn.curry(mapArray);

function reduceArray(func, array) {
  return array.reduce(func, 0);
}
reduceArray = fn.curry(reduceArray);

function mapObject(func, object) {
  var result = {};
  for (var i in object) {
    if (object.hasOwnProperty(i)) {
      result[i] = func(object[i]);
    }
  }
  return result;
}
mapObject = fn.curry(mapObject);

function itemTotal(basketItem) {
  return basketItem.price * basketItem.quantity;
}

getBasket()
  .then(JSON.parse)
  .then(function(content){
    console.log(JSON.stringify(content, null, 2));
    return content;
  })
  .then(get('baskets'))
  .then(function(content){
    console.log(JSON.stringify(content, null, 2));
    return content;
  })
  .then(mapObject(mapArray(itemTotal)))
  .then(function(content){
    console.log(JSON.stringify(content, null, 2));
    return content;
  })
  .then(mapObject(reduceArray(sum)))
  .then(function(content){
    console.log(JSON.stringify(content, null, 2));
    return content;
  })

