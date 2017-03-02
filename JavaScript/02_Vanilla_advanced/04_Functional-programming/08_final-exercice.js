var request = require('ajax-request');
var Promise = require('bluebird');
var R = require('ramda');

const URL = 'http://localhost:8080';

function getBaskets() {
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

function sum(a, b) {
  return a + b;
}

function itemTotal(basketItem) {
  return basketItem.price * basketItem.quantity;
}


getBaskets()
  .then(JSON.parse)
  .then(R.prop('baskets'))
  .then(R.mapObjIndexed(R.map(itemTotal)))
  .then(R.mapObjIndexed(R.reduce(sum, 0)))
  .then(console.log);
