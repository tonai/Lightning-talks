# Promises and generetors (ES6)

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Promises](#promises)
  - [Constructor](#constructor)
  - [Adding listeners](#adding-listeners)
  - [Exercise : Create a function making an AJAX request and returning a promise](#exercise--create-a-function-making-an-ajax-request-and-returning-a-promise)
  - [Chains](#chains)
  - [Exercise : Get the weather](#exercise--get-the-weather)
  - [Branches](#branches)
  - [Promisees](#promisees)
  - [Excercice : Preload a set of images](#excercice--preload-a-set-of-images)
- [Generators](#generators)
  - [Constructor](#constructor-1)
  - [`yield`](#yield)
  - [Exercise : Create a Fibonacci sequence generator](#exercise--create-a-fibonacci-sequence-generator)
  - [`yield*`](#yield)
  - [Exercise : Create a Collatz conjecture generators](#exercise--create-a-collatz-conjecture-generators)
- [Asynchronous code looking like synchronous code](#asynchronous-code-looking-like-synchronous-code)
- [References](#references)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Promises

Promises make asynchronous code flow easier and nicer, once you mastered them.  
But they are also compatible with synchronous code.

A Promise represents an operation that hasn't completed yet, but is expected in the future.

A promises is in one of these states :
* pending: initial state, not fulfilled or rejected.
* fulfilled: meaning that the operation completed successfully.
* rejected: meaning that the operation failed.

A promise is said to be settled if it is either fulfilled or rejected, but not pending.

ES6 Promises follow the [Promises/A+](https://promisesaplus.com/) specification.

For ES5 navigators you can use a library that also follows this specification like :
* [bluebird](https://github.com/petkaantonov/bluebird)
* [q](https://github.com/kriskowal/q) (used in angular)
* or one of these : https://github.com/promises-aplus/promises-spec/blob/master/implementations.md

### Constructor

You can create a promise using the `Promise` object.

Example :
```javascript
var isOk = true;
var promise = new Promise(function (resolve, reject) {
  if (isOk) {
    window.setTimeout(() => resolve('ok'), 1000);
  } else {
    window.setTimeout(() => reject('ko'), 1000);
  }
});
```

Result :
```javascript
promise;
```

### Adding listeners

you can add listeners to a promise that will be called :
* when the promise is fulfilled if attached with the `then` method
* when the promise is rejected if attached with the `catch` method

Example :
```javascript
var isOk = true;
var promise = new Promise(function (resolve, reject) {
  if (isOk) {
    window.setTimeout(() => resolve('ok'), 1000);
  } else {
    window.setTimeout(() => reject('ko'), 1000);
  }
});
promise.then(() => console.log('fulfilled'));
promise.catch(() => console.log('rejected'));
```

The `then` method also accept a second argument for binding a failure callback.

Example :
```javascript
var isOk = true;
var promise = new Promise(function (resolve, reject) {
  if (isOk) {
    window.setTimeout(() => resolve('ok'), 1000);
  } else {
    window.setTimeout(() => reject('ko'), 1000);
  }
});
promise.then(
  () => console.log('fulfilled'),
  () => console.log('rejected')
);
```

### Exercise : Create a function making an AJAX request and returning a promise

The function should take the requested URL as parameter.

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

Solution :
```javascript
function request (url) {
  return new Promise(function (resolve, reject){
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.onreadystatechange = function () {
      if (req.readyState == 4) {
        if(req.status == 200) {
          resolve(req.responseText);
        } else {
          reject("An error happened.\n");
        }
      }
    };
    req.send();
  });
}
```

Result :
```javascript
request('https://github.com/tonai')
  .then(function (content) {
    console.log('----- START CONTENT -----');
    console.log(content);
    console.log('----- END CONTENT -----');
  });
```

### Chains

By retuning a promise in a `then` or a `catch` you can create a chain.

Example :
```javascript
new Promise(function (resolve, reject) {
  console.log('new promise 1');
  window.setTimeout(() => resolve('ok'), 1000);
})
.then(function () {
  console.log('promise 1 fulfilled');
  return new Promise(function (resolve, reject) {
    console.log('new promise 2');
    window.setTimeout(() => reject('ko'), 1000);
  });
})
.catch(function () {
  console.log('promise 2 rejected');
});
```

But if you don't return a promise, the returned value of your callback will be automatically wrapped in a promises so you still can chain them.

Example :
```javascript
new Promise(function (resolve, reject) {
  console.log('new promise 1');
  window.setTimeout(() => resolve('ok'), 1000);
})
.then(function () {
  console.log('promise 1 fulfilled');
})
.then(function () {
  console.log('promise 2 fulfilled');
  var x = foo.bar.baz;
})
.catch(function () {
  console.log('promise 3 rejected');
});
```

### Exercise : Get the weather

Write the following functions :
* `getCoords` : ask for the user location.
* `getWoeid` : ask Yahoo API for Woeid using location `'http://query.yahooapis.com/v1/public/yql?q=select * from geo.placefinder where text="' + latitude +  ',' + longitude + '" and gflags="R"&format=json'`
* `getForecast` : ask yahoo API for weather using woeid : `'http://query.yahooapis.com/v1/public/yql?q=select item from weather.forecast where woeid="' + woeid + '"&format=json'`
* `displayForecast` : display the forecast

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

Solution :
```javascript
function getCoords () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(function(data){
      resolve(data.coords);
    });
  });
}

function getWoeid (coords) {
  return request('http://query.yahooapis.com/v1/public/yql?q=select * from geo.placefinder where text="' + coords.latitude +  ',' + coords.longitude + '" and gflags="R"&format=json');
}

function getForecast (data) {
  data = JSON.parse(data);
  return request('http://query.yahooapis.com/v1/public/yql?q=select item from weather.forecast where woeid="' + data.query.results.Result.woeid + '"&format=json');
}

function displayForecast (data) {
  data = JSON.parse(data);
  document.body.innerHTML = data.query.results.channel.item.description;
}
```

Result :
```javascript
getCoords()
  .then(getWoeid)
  .then(getForecast)
  .then(displayForecast);
```

### Branches

You create a branch when you attach more than one callback on a promise.  
You can queue more than one success or failure listeners to a promise.

```javascript
var isOk = true;
var promise = new Promise(function (resolve, reject) {
  console.log('new promise 1');
  if (isOk) {
    window.setTimeout(() => resolve('ok'), 1000);
  } else {
    window.setTimeout(() => reject('ko'), 1000);
  }
});
promise.then(function () {
  console.log('promise 1 fulfilled - callback 1');
});
promise.catch(function () {
  console.log('promise 1 rejected - callback 1');
});
promise.then(function () {
  console.log('promise 1 fulfilled - callback 2');
}, function () {
  console.log('promise 1 rejected - callback 1');
});
```

You can join branches with 2 methods available on the `Promise` object : 
* `all` : wait for all attached promises to be fulfilled or for one promise to be rejected and return a promise
* `race` : wait for one attached promise to be settled (fulfilled or rejected) and return a promise

`all` example :
```javascript
var start = new Date().getTime();
var promise1 = new Promise(function (resolve, reject) {
  window.setTimeout(() => resolve('ok'), 1000);
});
promise1.then(() => console.log('promise 1 fulfilled in : ' + (new Date().getTime() - start)));
var promise2 = new Promise(function (resolve, reject) {
  window.setTimeout(() => resolve('ok'), 500);
});
promise2.then(() => console.log('promise 2 fulfilled in : ' + (new Date().getTime() - start)));
var promise3 = Promise.all([promise1, promise2]);
promise3.then(() => console.log('promise 3 fulfilled in : ' + (new Date().getTime() - start)));
```

`race` example :
```javascript
var start = new Date().getTime();
var promise1 = new Promise(function (resolve, reject) {
  window.setTimeout(() => resolve('ok'), 1000);
});
promise1.then(() => console.log('promise 1 fulfilled in : ' + (new Date().getTime() - start)));
var promise2 = new Promise(function (resolve, reject) {
  window.setTimeout(() => resolve('ok'), 500);
});
promise2.then(() => console.log('promise 2 fulfilled in : ' + (new Date().getTime() - start)));
var promise3 = Promise.race([promise1, promise2]);
promise3.then(() => console.log('promise 3 fulfilled in : ' + (new Date().getTime() - start)));
```

### Promisees

Promisees is a promise visualization playground : http://bevacqua.github.io/promisees/?utm_content=buffer61cc7&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer#code=function+later+()+{%0A++return+new+Promise((resolve,+reject)+=>+{%0A++++setTimeout(()+=>+resolve("yay"),+1500)%0A++})%0A}%0A%0Afunction+muchLater+()+{%0A++return+later().then(later)%0A}%0A%0Avar+p+=+later()%0A%0Ap%0A++.then(x+=>+x.y.z)%0A++.catch(err+=>+console.error(err))%0A++.then(muchLater)%0A++.then(x+=>+console.log(x))%0A++.then(x+=>+console.log(x))%0A%0Avar+p2+=+p.then(later)%0Ap2.then(x+=>+console.log(x))%0Ap2.then(x+=>+x.y.z)%0A++.catch(err+=>+console.error(err))%0A++.then(x+=>+fetch("http://google.com"))

### Excercice : Preload a set of images

Preload a set of images and append them to the `<body>` once they are loaded.

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

Solution :
```javascript
var imagesSrc = [
  'http://obeythekitty.com/wp-content/uploads/2015/01/lolcat_flying_cat.jpg',
  'http://funny-cat.pics/uploads/obi_wan_star_wars_lol_cat_1331506604.jpg',
  'http://wallpoper.com/images/00/29/43/86/lolcat_00294386.jpg'
];
var promises = new Map();

imagesSrc.forEach(function(src){
  var image = new Image();
  var promise = new Promise(function (resolve, reject) {
    image.onload = function () {
      console.log('image "' + src + '" loaded');
      resolve('loaded');
    };
  });
  image.src = src;
  promises.set(promise, image);
});

Promise
  .all([...promises].map(value => value[0]))
  .then(function () {
    console.log('All images loaded', promises);
    promises.forEach(function (image) {
      document.body.appendChild(image);
    });
  });
```

## Generators

Generator are kind of iterable functions.

### Constructor

You can define a generator using the `function*` syntax.

Example :
```javascript
function* myGenerator () {
  console.log('inside generator');
  return 'end';
}
```

By calling the function you will get a `Generator` object which conforms to the [iterator and iterable protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols).

Example :
```javascript
var iterator = myGenerator();
```

Result :
```javascript
iterator.next();
```

### `yield`

You can return values and define steps in your generator by using the `yield` keyword.

Example :
```javascript
function* myGenerator (i) {
  yield i + 1;
  yield i + 2;
  yield i + 3;
}
```

Result :
```javascript
var iterator = myGenerator(10);
iterator.next();
iterator.next();
iterator.next();
iterator.next();
```

Whenever a `yield` expression is reached, that value is emitted by the iterator and function execution is suspended.

`yield` is an expression that returns a value equal to the optionnal value passed to the `next()` function.

```javascript
function* myGenerator (i) {
  console.log(yield i + 1);
  console.log(yield i + 2);
}
```

Result :
```javascript
var iterator = myGenerator(10);
iterator.next('foo');
iterator.next('bar');
iterator.next('baz');
```

### Exercise : Create a Fibonacci sequence generator

In mathematical terms, the sequence <code>F<sub>n</sub></code> of Fibonacci numbers is defined by the recurrence relation :  
<code>F<sub>n</sub> = F<sub>{n-1}</sub> + F<sub>{n-2}</sub></code>

[Wikipedia](https://en.wikipedia.org/wiki/Fibonacci_number)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

Solution :
```javascript
function* fibonacci () {
  var sequence = [0, 1];
  var current = 0;
  while (true) {
    if (sequence[current] === undefined) {
      sequence.push(sequence[current - 1] + sequence[current - 2]);
    }
    yield sequence[current++];
  }
}
```

Result :
```javascript
var fibonacciIterator = fibonacci();
fibonacciIterator.next().value;
fibonacciIterator.next().value;
fibonacciIterator.next().value;
fibonacciIterator.next().value;
```

### `yield*`

The yield* expression is used to delegate to another generator or iterable object.

Example :
```javascript
function* g1 (i) {
  yield i + 1;
  yield i + 2;
}

function* g2 (i) {
  yield i;
  yield* g1(i);
  yield* [i + 3, i + 4];
}
```

Result :
```javascript
var iterator = g2(10);
iterator.next();
iterator.next();
iterator.next();
iterator.next();
iterator.next();
iterator.next();
```

### Exercise : Create a Collatz conjecture generators

The conjecture can be summarized as follows. Take any natural number `n`. If `n` is even, divide it by `2` to get `n / 2`. If n is odd, multiply it by `3` and add `1` to obtain `3n + 1`.

[Wikipedia](https://en.wikipedia.org/wiki/Collatz_conjecture)

Use one generator for odd values and one for even values.

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

Solution :
```javascript
function* collatzOdd (n) {
  while (true) {
    if (n % 2 === 0) {
      n /= 2;
      yield n;
    } else {
      yield* collatzEven(n);
    }
  }
}

function* collatzEven (n) {
  while (true) {
    if (n % 2 === 1) {
      n = 3 * n +1;
      yield n;
    } else {
      yield* collatzOdd(n);
    }
  }
}

var collatz = collatzOdd;
```

Result :
```javascript
var collatzIterator = collatz(14);
collatzIterator.next().value;
collatzIterator.next().value;
collatzIterator.next().value;
collatzIterator.next().value;
```

## Asynchronous code looking like synchronous code

Using Generators and Promise to make asynchronous code looking like synchronous code.

Recall from previous usefull functions :
```javascript
function request (url) {
  return new Promise(function (resolve, reject){
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.onreadystatechange = function () {
      if (req.readyState == 4) {
        if(req.status == 200) {
          resolve(req.responseText);
        } else {
          reject("An error happened.\n");
        }
      }
    };
    req.send();
  });
}

function getCoords () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(function(data){
      resolve(data.coords);
    });
  });
}
```

Now define a function that will iterate over a generator :
```javascript
function runGenerator (generator) {
  var result;
  var iterator = generator();
  (function iterate (returnValue) {
    result = iterator.next(returnValue);
    if (!result.done) {
      if ('then' in result.value) {
        result.value.then(iterate);
      }
      else {
        // avoid synchronous recursion
        setTimeout(function(){
          iterate(result.value);
        }, 0);
      }
    }
  })();
}
```

Write the main function as a generator :
```javascript
function* main () {
  var coords, data;
  coords = yield getCoords();
  data = yield request('http://query.yahooapis.com/v1/public/yql?q=select * from geo.placefinder where text="' + coords.latitude +  ',' + coords.longitude + '" and gflags="R"&format=json');
  data = JSON.parse(data);
  data = yield request('http://query.yahooapis.com/v1/public/yql?q=select item from weather.forecast where woeid="' + data.query.results.Result.woeid + '"&format=json');
  data = JSON.parse(data);
  document.body.innerHTML = data.query.results.channel.item.description;
}
```

Result :
```javascript
runGenerator(main);
```

## References

* [Promise](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Promise)
* [ES6 Promises in Depth](https://ponyfoo.com/articles/es6-promises-in-depth)
* [Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)
* [ES6 Generators in Depth](https://ponyfoo.com/articles/es6-generators-in-depth)
* [Going Async With ES6 Generators](https://davidwalsh.name/async-generators)
