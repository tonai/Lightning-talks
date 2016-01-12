# Proxies (ES6)

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Terminology](#terminology)
- [Syntax](#syntax)
  - [Constructor](#constructor)
  - [Revocable Proxies](#revocable-proxies)
- [Traps](#traps)
  - [`get`](#get)
  - [Exercice : create a proxy with access control](#exercice--create-a-proxy-with-access-control)
  - [`set`](#set)
  - [Exercice : Two-way data binding "framework"](#exercice--two-way-data-binding-framework)
  - [`apply`](#apply)
  - [`construct`](#construct)
  - [Exercice : Create an `extend` proxy function](#exercice--create-an-extend-proxy-function)
  - [Other traps](#other-traps)
- [References](#references)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Terminology

**Target :** The original object the proxy will virtualize.

**Handler :** An object which implements the proxy’s behavior using **traps**.

**Traps :** Functions defined in the **handler** which provide access to the target when specific properties or methods are called

## Syntax

The Proxy object is used to define custom behavior for fundamental operations (e.g. property lookup, assignment, enumeration, function invocation, etc).

### Constructor

You can create a proxy by using the `Proxy()` constructor.

Example :
```javascript
var target = {foo: 'bar'};
var handler = {};
var proxy = new Proxy(target, handler);
```

Result :
```javascript
proxy.foo;
```

### Revocable Proxies

You can create revocable proxies using `Proxy.revocable()` returning an object containing the proxy and a revoke function.

When the revoke function is called, the proxy will throw on any operation.

Example :
```javascript
var target = {foo: 'bar'};
var handler = {};
var {proxy, revoke} = Proxy.revocable(target, handler);
```

Result :
```javascript
proxy.foo;
revoke();
proxy.foo;
```

## Traps

### `get`

A trap for getting property values.

Example :
```javascript
var target = {foo: 'bar'};
var handler = {
  get: function (target, property) {
    console.log('Getting property ' + property);
    return target[property];
  }
};
var proxy = new Proxy(target, handler);
```

Result :
```javascript
proxy.foo;
proxy.whatever;
```

### Exercice : create a proxy with access control

All properties and methods starting with `_` in the target should not be accessible through the proxy.

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

Solution :
```javascript
var proxy = function () {
  var target = {
    _private: 'foo',
    public: 'bar'
  };

  var handler = {
    get: function (target, property) {
      if (property[0] === '_') {
        throw new Error(`Invalid attempt to private "${property}" property`);
      }
      return target[property];
    }
  };

  return new Proxy(target, handler);
}();
```

Result :
```javascript
proxy._private;
proxy.public;
```

### `set`

A trap for setting property values.

Example :
```javascript
var target = {age: 30};
var handler = {
  set: function (target, property, value) {
    switch (property) {
      case 'age':
        if (typeof value !== 'number' || Number.isNaN(value) || value <= 0) {
          throw new TypeError('Age must be a positive number')
        }
    }
    target[property] = value;
  }
};
var proxy = new Proxy(target, handler);
```

Result :
```javascript
proxy.age = 'foo';
proxy.age;
proxy.age = 25;
proxy.age;
target.age;
```

### Exercice : Two-way data binding "framework"

Simple text input associated with a JavaScript object for the model.

Should update the model when the input is updated and shouls update the input when the model is updated.

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

Solution :
```javascript
function getModelFromInput (element) {
  if (!element || !(element instanceof HTMLInputElement)) {
    throw new Error(`Model can only be created from input elements.`);
  }

  var target = {};
  var handler = {
    set: function (target, property, value) {
      element.value = value;
      target[property] = value;
    }
  };

  element.addEventListener('change', () => target[element.name] = element.value);
  return new Proxy(target, handler);
}
```

Result (in this page) :
```javascript
var model = getModelFromInput(jQuery('.js-site-search-field')[0]);
model.q = 'JavaScript';
```

### `apply`

A trap for a function call.

Example :
```javascript
var target = function() {};
var handler = {
  apply: function (target, thisArg, argumentsList) {
    console.log('Target called with following arguments : ' + JSON.stringify(argumentsList));
    return target.apply(thisArg, argumentsList);
  }
};
var proxy = new Proxy(target, handler);
```

Result :
```javascript
proxy(1, 2, 3);
```

### `construct`

A trap for the `new` operator.

Example :
```javascript
var target = function() {};
var handler = {
  construct: function (target, argumentsList) {
    console.log('Target instantiated with following arguments : ' + JSON.stringify(argumentsList));
    return new target(argumentsList);
  }
};
var proxy = new Proxy(target, handler);
```

Result :
```javascript
new proxy(1, 2, 3);
```

### Exercice : Create an `extend` proxy function

Parent constructor is : 
```javascript
var Person = function(name){
  this.name = name;
};
```

Child constuctor should be created like this :
```javascript
var Boy = extend(Person, function(name, age) {
  this.age = age;
});
```

When an instance of `Boy` is created the `Person` constructor must be called before the `Boy` constructor.

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

Solution :
```javascript
function extend(parent, target) {
  var handler = {
    construct: function(target, argumentsList) {
      var instance = Object.create(target.prototype);
      parent.apply(instance, argumentsList);
      target.apply(instance, argumentsList);
      return instance;
    }
  };
  return new Proxy(target, handler);
}
```

Result :
```javascript
new Boy("Peter", 13);
```

### Other traps

Other available traps :
* `getPrototypeOf` : A trap for Object.getPrototypeOf.
* `setPrototypeOf` : A trap for Object.setPrototypeOf.
* `isExtensible` : A trap for Object.isExtensible.
* `preventExtensions` : A trap for Object.preventExtensions.
* `getOwnPropertyDescriptor` : A trap for Object.getOwnPropertyDescriptor.
* `defineProperty` : A trap for Object.defineProperty.
* `has` : A trap for the in operator.
* `deleteProperty` : A trap for the delete operator.
* `enumerate` : A trap for for...in statements.
* `ownKeys` : A trap for Object.getOwnPropertyNames.

## References

* [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
* [Preparing for ECMAScript 6: Proxies](http://www.sitepoint.com/preparing-ecmascript-6-proxies/)
* [ES6 Proxies in Depth](https://ponyfoo.com/articles/es6-proxies-in-depth)
* [ES6 Proxy Traps in Depth](https://ponyfoo.com/articles/es6-proxy-traps-in-depth)
* [More ES6 Proxy Traps in Depth](https://ponyfoo.com/articles/more-es6-proxy-traps-in-depth)
