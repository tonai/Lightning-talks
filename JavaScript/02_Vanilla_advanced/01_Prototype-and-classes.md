# Prototype and classes

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [`this`](#this)
  - [Value of `this` within a classic function in non strict mode](#value-of-this-within-a-classic-function-in-non-strict-mode)
  - [Value of `this` within a classic function in strict mode](#value-of-this-within-a-classic-function-in-strict-mode)
  - [Value of `this` within an event callback](#value-of-this-within-an-event-callback)
  - [Value of `this` within an object literals method](#value-of-this-within-an-object-literals-method)
  - [Value of `this` within an arrow functions (ES6)](#value-of-this-within-an-arrow-functions-es6)
- [`bind`, `call` and `apply`](#bind-call-and-apply)
  - [`bind` with extracted method](#bind-with-extracted-method)
  - [Using `bind` for calculating the distance in a 2 dimensional space (ES5)](#using-bind-for-calculating-the-distance-in-a-2-dimensional-space-es5)
  - [Using `call` for calculating the distance in a 2 dimensional space (ES5)](#using-call-for-calculating-the-distance-in-a-2-dimensional-space-es5)
  - [Using `apply` for calculating the distance in a 2 dimensional space (ES5)](#using-apply-for-calculating-the-distance-in-a-2-dimensional-space-es5)
  - [Exercise : calculate the distance in a multidimensional space (ES5)](#exercise--calculate-the-distance-in-a-multidimensional-space-es5)
  - [Exercise : create a function that adds each of its argument each other (ES5)](#exercise--create-a-function-that-adds-each-of-its-argument-each-other-es5)
  - [`arguments` workaround (ES5)](#arguments-workaround-es5)
  - [`arguments` workaround (ES6)](#arguments-workaround-es6)
  - [`bind`, `call` and `apply` together for calculating the distance in a 2 dimensional space (ES5) :smiling_imp: :smiling_imp: :smiling_imp:](#bind-call-and-apply-together-for-calculating-the-distance-in-a-2-dimensional-space-es5-smiling_imp-smiling_imp-smiling_imp)
  - [Using arrow function for calculating the distance in a multidimensional space (ES6)](#using-arrow-function-for-calculating-the-distance-in-a-multidimensional-space-es6)
- [Constructor](#constructor)
  - [Simple constructor](#simple-constructor)
- [Prototype](#prototype)
  - [Used to save memory](#used-to-save-memory)
  - [The change of a constructor prototype method will impact all instances](#the-change-of-a-constructor-prototype-method-will-impact-all-instances)
  - [The constructor prototype property](#the-constructor-prototype-property)
- [Inheritance](#inheritance)
  - [Using `Object.create`](#using-objectcreate)
  - [Using `Object.setPrototypeOf`](#using-objectsetprototypeof)
  - [Simple inheritance example](#simple-inheritance-example)
  - ["Static" methods](#static-methods)
- [Classes (ES6)](#classes-es6)
  - [Simple classe](#simple-classe)
  - [Inheritance](#inheritance-1)
  - [Static methods](#static-methods)
- [Factory pattern](#factory-pattern)
  - [Factory functions](#factory-functions)
  - [Composition over Inheritance](#composition-over-inheritance)
- [References](#references)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## `this`

`this` is a special keyword that lives in a function's scope and, in most cases, refer to the current object (typically an object method).

### Value of `this` within a classic function in non strict mode

In non-strict mode, the value of `this`  in non-method function is the global object (`window` in browsers).

Example :
```javascript
function f() {
  return this;
}
```

Result :
```javascript
f();
```

### Value of `this` within a classic function in strict mode

In strict mode, the value of `this` in non-method function is undefined.

Example :
```javascript
function f_strict() {
  'use strict';
  return this;
}
```

Result :
```javascript
f_strict();
```

### Value of `this` within an event callback

Example :
```javascript
var a = document.createElement('a');
a.href = 'http://www.google.fr';
a.onclick = function () {
  console.log(this);
  return false;
};
a.appendChild(document.createTextNode('Click me !'));
document.getElementsByTagName('body')[0].appendChild(a);
```

Result : click on the link to see it.

### Value of `this` within an object literals method

Function-valued properties are called methods. They use this to refer to the object that was used to call them.

```javascript
var point = {
  x : 5,
  y : 2,
  toString : function () {
    return this.x + ',' + this.y;
  }
};
```

Result :
```javascript
point.toString();
```

**Warning :** if you extract a method, it loses its connection with the object.

Example :
```javascript
var toString = point.toString;
```

Result :
```javascript
toString();
```

### Value of `this` within an arrow functions (ES6)

Whereas each function has it own `this`, even when being nested.

Example :
```javascript
point.dist = function () {
  var square = function(prop) {
    return this[prop] * this[prop];
  };

  return Math.sqrt(square('x') + square('y'));
};
```

Result :confused: :
```javascript
point.dist();
```

The `this` inside an arrow function is the same `this` as in the parent scope from where they were defined.

i.e. you don't need to use `bind`...etc. (these methods don't work with arrow functions).

Example :
```javascript
point.dist = function () {
  var square = prop => this[prop] * this[prop];
  return Math.sqrt(square('x') + square('y'));
};
```

Result :
```javascript
point.dist();
```

This also mean, you can't use arrow functions for defining methods.

Example :
```javascript
var pointBis = {
  x : 5,
  y : 2,
  toString : () => this.x + ',' + this.y
};
```

Result :
```javascript
pointBis.toString();
```

## `bind`, `call` and `apply`

Bind is used to set value of "this" inside of a function (It duplicates the function and set the context to the appropriate value).

You can invoque a function using call or apply and set the context (value of this) inside of this function at the same time.

Apply use an array of arguments as second parameter.

### `bind` with extracted method

Example :
```javascript
var toString = point.toString.bind(point);
```

Result :
```javascript
toString();
```

### Using `bind` for calculating the distance in a 2 dimensional space (ES5)

Example :
```javascript
point.dist = function () {
  var square = function(prop) {
    return this[prop] * this[prop];
  };
  square = square.bind(this);

  return Math.sqrt(square('x') + square('y'));
};
```

Result :
```javascript
point.dist();
```

### Using `call` for calculating the distance in a 2 dimensional space (ES5)

Example :
```javascript
point.dist = function () {
  var square = function(prop) {
    return this[prop] * this[prop];
  };

  return Math.sqrt(square.call(this, 'x') + square.call(this, 'y'));
};
```

Result :
```javascript
point.dist();
```

### Using `apply` for calculating the distance in a 2 dimensional space (ES5)

Example :
```javascript
point.dist = function () {
  var square = function(prop) {
    return this[prop] * this[prop];
  };

  return Math.sqrt(square.apply(this, ['x']) + square.call(this, ['y']));
};
```

Result :
```javascript
point.dist();
```

### Exercise : calculate the distance in a multidimensional space (ES5)

Example :
```javascript
point.dist = function () {
  return Math.sqrt(
    Object.keys(this)
      .filter(function(prop){
        return typeof this[prop] == 'number';
      }.bind(this))
      .map(function(prop) {
        return this[prop] * this[prop];
      }.bind(this))
      .reduce(function(a, b){
        return a + b;
      })
  );
};
```

Result :
```javascript
point.dist();
```

Explanations :
* `Object.keys(this)` returns `["x", "y", "toString", "dist"]`
* `filter(...)` returns `["x", "y"]`
* `map(...)` returns `[25, 4]`
* `reduce(...)` returns `29`
* `Math.sqrt()` return `5.385164807134504` :metal:

### Exercise : create a function that adds each of its argument each other (ES5)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

Try :
```javascript
var add = function() {
  return arguments.reduce(function(a, b){
    return a + b;
  });
};
```

Result :worried: :
```javascript
add(1, 2, 3, 4);
```

Explanations : The `arguments` object is an [Array-like object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Functions/arguments), thus array's properties are not all available.

You can run this function to see what array's properties are available for `arguments` :
```javascript
(function() {
  var properties = Object.getOwnPropertyNames(Array.prototype);
  for (var i in properties) {
    console.log(properties[i] + ' : ' + (properties[i] in arguments));
  }
})()
```

Explanations :
* `Object.getOwnPropertyNames` lists all properties (that are not inherited) belonging to `Array.prototype`.
  It is used to list all properties, methods applicable to arrays.
* `(properties[i] in arguments)` check if the property exist for `arguments`.

### `arguments` workaround (ES5)

Example :
```javascript
var add = function() {
  return Array.prototype.reduce.call(arguments, function(a, b){
    return a + b;
  });
};
```

Result :
```javascript
add(1, 2, 3, 4);
```

### `arguments` workaround (ES6)

You can cast `arguments` in a real array using the spread operator.

Example :
```javascript
var add = function() {
  return [...arguments].reduce(function(a, b){
    return a + b;
  });
};
```

Or simply use the rest parameter which is a real array.

Example :
```javascript
var add = function(...args) {
  return args.reduce(function(a, b){
    return a + b;
  });
};
```

ES6 is cool :sunglasses:

### `bind`, `call` and `apply` together for calculating the distance in a 2 dimensional space (ES5) :smiling_imp: :smiling_imp: :smiling_imp:

Just for the fun :
```javascript
point.dist = function () {
  var square = function(prop) {
    return this[prop] * this[prop];
  };

  var add = function() {
    return Array.prototype.reduce.call(arguments, function(a, b){
      return a + b;
    });
  };

  return Math.sqrt(add.apply(this, ['x', 'y'].map(square.bind(this))));
};
```

Result :triumph: :
```javascript
point.dist();
```

Ok that's just over-engineering... :stuck_out_tongue:

![Over-engineering is bad](http://i.imgur.com/JPsizDt.jpg)

### Using arrow function for calculating the distance in a multidimensional space (ES6)

Example :
```javascript
point.dist = function () {
  return Math.sqrt(
    Object.keys(this)
      .filter(prop => typeof this[prop] == 'number')
      .map(prop => this[prop] * this[prop])
      .reduce((a, b) => a + b)
  );
};
```

Result :
```javascript
point.dist();
```

:trophy: :trophy: :trophy:

## Constructor

Object factories in JavaScript (ES5) are called "constructors" ("classes" in PHP).
A constructor is a function that is called with the "new" keyword.
(Real classes will come with ES6.)

The constructor’s job is to set up the fresh object passed to it via the implicit parameter `this`.
The fresh object is (implicitly) returned by the constructor and considered its instance (use of instanceof).

### Simple constructor

Example :
```javascript
var Point = function(){
  this.x = 5;
  this.y = 2;
  this.toString = function () {
    return this.x + ',' + this.y;
  }
};
```

Result :
```javascript
var point = new Point();
point + '';
point instanceof Point;
```

## Prototype

"prototype" is a property of any constructor (it is an object).

"prototype" is shared between each instance (used to save memory).

When creating an instance with "new", a reference to the constructor prototype is created in the instance prototype with "this" bound to the instance.

If a method does not exist in an object, JavaScript will check if the method exists in the prototype (recursively).

### Used to save memory

Example :
```javascript
var Point = function(){
  this.x = 5;
  this.y = 2;
};
Point.prototype = {
  toString : function () {
    return this.x + ',' + this.y;
  }
};
```

Result :
```javascript
var point = new Point();
point + '';
point;
```

### The change of a constructor prototype method will impact all instances

Example :
```javascript
var Point = function(){};
Point.prototype = {
  x : 5,
  y : 2,
  toString : function () {
    return this.x + ',' + this.y;
  }
};
```

```javascript
var point1 = new Point();
var point2 = new Point();
Point.prototype.y = 3;
point1.y;
point1.__proto__.y = 4;
point2.y;
```

Conclusion : Use prototype for methods and not for properties (use constructor instead).

### The constructor prototype property

Example :
```javascript
var Point = function(){
  this.x = 5;
  this.y = 2;
};
```

Result :
```javascript
Point.prototype.constructor;
Point === Point.prototype.constructor;
```

If you define the prototype as an object literal you will lose the constructor property.

So it's better to define each methods separately :
```javascript
Point.prototype.toString = function () {
  return this.x + ',' + this.y;
};
```

## Inheritance

There is no native way...
Each framework implements their own inheritance workflow.

The simplest way is to fill the inherited constructor prototype with an instance of the inheritance class.

### Using `Object.create`

Example :
```javascript
var Point = function(){
  this.x = 5;
  this.y = 2;
};
Point.prototype.toString = function () {
  return this.x + ',' + this.y;
};
```

Result :
```javascript
var point1 = new Point();
point2 = Object.create(Point.prototype);
point1.__proto__ === point2.__proto__;
```

`Object.create` is used to create an **object** whose prototype will be equal to its argument.

But comparing to `point1`, `point2` has not been initialized through the constructor (and thus is not an instance of `Point`).

### Using `Object.setPrototypeOf`

Example :
```javascript
var Point = function(){
  this.x = 5;
  this.y = 2;
};
Point.prototype.toString = function () {
  return this.x + ',' + this.y;
};
```

Result :
```javascript
var point1 = new Point();
var point2 = {};
Object.setPrototypeOf(point2, Point.prototype);
point1.__proto__ === point2.__proto__;
```

`Object.setPrototypeOf` is used to set the prototype of an existing **object** to be equal to some other **object**.

`point2` has also not been initialized since it has been created by hand.

### Simple inheritance example

Defining the `Point2D` constuctor and prototype :
```javascript
var Point2D = function (x, y) {
  this.x = x;
  this.y = y;
};
Point2D.prototype.toString = function () {
  return this.x + ',' + this.y;
};
Point2D.prototype.dist = function () {
  return Math.sqrt(
    Object.keys(this)
      .filter(function(prop){
        return typeof this[prop] == 'number';
      }.bind(this))
      .map(function(prop) {
        return this[prop] * this[prop];
      }.bind(this))
      .reduce(function(a, b){
        return a + b;
      })
  );
};
```

Defining the `Point3D` constuctor  :
```javascript
var Point3D = function(x, y, z){
  this.x = x;
  this.y = y;
  this.z = z;
};
```

Now extend `Point3D` prototype from  `Point2D` prototype.

By creating an instance of `Point2D` (which is an object so a candidate for a prototype) :
```javascript
Point3D.prototype = new Point2D();
Point3D.prototype;
```

But we do not need to call `Point2D` contructor, we only whant it's prototype (better) :
```javascript
Point3D.prototype = Object.create(Point2D.prototype);
Point3D.prototype;
```

That's ok but we lost the default `Point3D.prototype.constructor` method, so set it back (bonus) :
```javascript
Point3D.prototype.constructor = Point3D;
Point3D.prototype;
```

This is a good way, but `Object.setPrototypeOf` keeps that constructor property for us, so just do (best) :
```javascript
Object.setPrototypeOf(Point3D.prototype, Point2D.prototype);
```

Then you can rewrite the `toString` method using the "parent" method (no native shortcut in ES5) :
```javascript
Point3D.prototype.toString = function () {
  return Point2D.prototype.toString.apply(this) + ',' + this.z;
};
```

Result :
```javascript
var point3d = new Point3D(1, 2, 3);
point3d.constructor;
point3d.dist();
point3d + '';
point3d instanceof Point3D;
point3d instanceof Point2D;
point3d instanceof Object;
point3d;
```

### "Static" methods

Static methods are methods that are called directly on the "class" and not on the instance.

In fact that just methods that are directly added to the constructor (and not to its prototype).

Example :
```javascript
Point2D.getSingleton = function(x, y) {
  if (this.singleton === undefined) {
    this.singleton = new this(x, y);
  }
  return this.singleton;
};
```

Result :
```javascript
Point2D.getSingleton(5, 2);
Point2D.getSingleton(1, 3);
```

But as static method are not in the prototype, they are not inherited.

## Classes (ES6)

Classes in JavaScript are not the same as in other OOP languages.  
JavaScript is still a prototype language, thus classes are just another syntax of what we have seen above.

### Simple classe

Example
```javascript
class Point2D {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }
  toString () {
    return this.x + ',' + this.y;
  }
  dist () {
    return Math.sqrt(
      Object.keys(this)
        .filter(prop => typeof this[prop] == 'number')
        .map(prop => this[prop] * this[prop])
        .reduce((a, b) => a + b)
    );
  }
}
```

Result :
```javascript
var point2d = new Point2D(5, 2);
point2d + '';
point2d.dist();
point2d;
```

### Inheritance

Prototypal inheritance is simplified using the `extends` keyword.

Example :
```javascript
class Point3D extends Point2D {
  constructor (x, y, z) {
    super(x, y);
    this.z = z;
  }
  toString () {
    return super.toString() + ',' + this.z;
  }
}
```

Result :
```javascript
var point3d = new Point3D(1, 2, 3);
point3d.dist();
point3d + '';
point3d instanceof Point3D;
point3d instanceof Point2D;
point3d instanceof Object;
point3d;
```

In the constructor `super()` is used to call the parent class constructor.  
It is mandatory to call it before using the `this` keyword in the child constructor.

In other methods you can call any of the super property or method that are defined in one of the inherited classes.

### Static methods

In classes you can define `static` method which works the same as above.

Example :
```javascript
class Point2D {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }
  toString () {
    return this.x + ',' + this.y;
  }
  dist () {
    return Math.sqrt(
      Object.keys(this)
        .filter(prop => typeof this[prop] == 'number')
        .map(prop => this[prop] * this[prop])
        .reduce((a, b) => a + b)
    );
  }
  static getSingleton (...pos) {
    if (this.singleton === undefined) {
      this.singleton = new this(...pos);
    }
    return this.singleton;
  }
}
```

Result :
```javascript
Point2D.getSingleton(5, 2);
Point2D.getSingleton(1, 3);
```

But in this case static methods are inherited.

Example :
```javascript
class Point3D extends Point2D {
  constructor (x, y, z) {
    super(x, y);
    this.z = z;
  }
  toString () {
    return super.toString() + ',' + this.z;
  }
}
Point3D.getSingleton(1, 2, 3);
```

Hum... was this intended ?  
Watch out the `__proto__` property of `Point3D`.  
With ES5 inheritance, the `__proto__` is linked to the `Function` object (containing methods like `bind`, `apply`...etc.).  
But with ES6 inheritance, it is linked to the `Point2D` object, what actually allows the static method inheritance system.  
So you should write the `getSingleton` method like this :
```javascript
class Point2D {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }
  toString () {
    return this.x + ',' + this.y;
  }
  dist () {
    return Math.sqrt(
      Object.keys(this)
        .filter(prop => typeof this[prop] == 'number')
        .map(prop => this[prop] * this[prop])
        .reduce((a, b) => a + b)
    );
  }
  static getSingleton (...pos) {
    if (!this.hasOwnProperty('singleton')) {
      this.singleton = new this(...pos);
    }
    return this.singleton;
  }
}
```

You can also use the `super` keyword in static methods.

Example :
```javascript
class Point3D extends Point2D {
  constructor (x, y, z) {
    super(x, y);
    this.z = z;
  }
  toString () {
    return super.toString() + ',' + this.z;
  }
  static getSingleton (...pos) {
    pos = pos.map(value => value + 1);
    return super.getSingleton(...pos);
  }
}
```

## Factory pattern

Using the factory pattern is an other way for creating object without using the prototype.

### Factory functions

They define an interface for creating an object.

Example :
```javascript
function point2DFactory(x, y) {
  return {
    coordinates: [x, y],
    toString: function() {
      return x + ',' + y;
    },
    dist: function() {
      return Math.sqrt(
        this.coordinates
          .map(a => a * a)
          .reduce((a, b) => a + b)
      );
    }
  };
}
```

Result :
```javascript
var point2d = point2DFactory(5, 2);
point2d + '';
point2d.dist();
point2d;
```

In this case, the "property" `x` and `y` are kind of "private".  
They are used without the `this` keyword, which in fact, is a good thing, because `this` is really disturbing because its value can vary depending on the context.

You can thus extract the `toString` method without problems (thanks to the closure).

Example :
```javascript
var toString = point2d.toString;
toString();
```

The drawback is that you will get a slower application if you need to create a lot of object (not using prototype means methods are duplicated).  
And by a lot of object, I really mean a lot (~1000/frame)...

Example :
```javascript
var start = performance.now();
for (var i = 0; i < 1000; i++) {
  point2DFactory(5, 2);
}
console.log(performance.now() - start);

var start = performance.now();
for (var i = 0; i < 1000; i++) {
  new Point2D(5, 2);
}
console.log(performance.now() - start);
```

### Composition over Inheritance

With this method, you can't use inheritance.  
But you can use something, that is better : composition !

By using inheritance, you design types around what they are.  
By using composition, you design types around what they do. 

Take a look at the following problem :
* We have `cats` that `poop` and `meow`
* We have `dogs` that `poop` and `bark`
* We have `cleaningRobots` that `drive` and `clean`
* We have `murderRobots` that `drive` and `kill`

We can design the above problems like this using inheritance :
```javascript
class Animal {
  constructor () {}
  poop () {}
}
  class Cat extends Animal {
    constructor () {}
    meow () {}
  }
  class Dog extends Animal {
    constructor () {}
    bark () {}
  }

class Robot {
  constructor () {}
  drive () {}
}
  class cleaningRobot extends Robot {
    constructor () {}
    clean () {}
  }
  class murderRobot extends Robot {
    constructor () {}
    kill () {}
  }
```

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

Now what if we want a murderRobotDog that can `drive`, `kill` and `bark` (but not `poop` because robot don't poop) ?!

Composition to the rescue : design types around what they do !
* `cat` = `pooper` + `meower`
* `dog` = `pooper` + `barker`
* `cleaningRobot` = `driver` + `cleaner`
* `murdergRobot` = `driver` + `killer`
* `murdergRobotDog` = `driver` + `killer` + `barker`

Example :
```javascript
function pooper() {
  return {
    poop: function() {}
  }
}
function meower() {
  return {
    meow: function() {}
  }
}
function barker() {
  return {
    bark: function() {}
  }
}
function driver() {
  return {
    drive: function() {}
  }
}
function cleaner() {
  return {
    clean: function() {}
  }
}
function killer() {
  return {
    kill: function() {}
  }
}
function murdergRobotDogFactory() {
  return Object.assign(
    {},
    driver(),
    killer(),
    barker()
  );
}
```

Result :
```javascript
murdergRobotDogFactory()
```

## References

* [Basic JavaScript for the impatient programmer](http://www.2ality.com/2013/06/basic-javascript.html)
* [JavaScript inheritance by example](http://www.2ality.com/2012/01/js-inheritance-by-example.html)
* [An easy way to understand JavaScript’s prototypal inheritance](http://www.2ality.com/2010/12/javascripts-prototypal-inheritance.html)
* [ES6 Classes in Depth](https://ponyfoo.com/articles/es6-classes-in-depth)
* [Composition over Inheritance](https://www.youtube.com/watch?v=wfMtDGfHWpA)
