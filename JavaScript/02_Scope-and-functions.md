# Scope and functions

## Foreword

This files contains examples illustrating [this presentation](https://prezi.com/3widspvzh9ck/javascript-scope-and-functions/).

You can use the navigator's debug console (F12) to try the above examples yourself.

Presentation time needed : 15min

## First-class citizen

A first-class citizen is an entity which supports all the operations generally available to other entities.

These operations typically include being passed as a parameter, returned from a function, and assigned to a variable.

## Functions

### Function declaration

Functions can be defined via a function declaration.

Example :
```javascript
function add(param1, param2) {
  return param1 + param2;
}
```

### Function expression

Functions can be defined via a function expression.

A function expression produces a value and can thus be used to directly pass functions as arguments to other functions.

Example :
```javascript
var add = function (param1, param2) {
  return param1 + param2;
};
```

### Arguments

When calling a function, missing parameters will get the value `undefined`.

Additional parameters will be ignored.

Except using special `arguments` variable.

Example :
```javascript
function myFunc(x, y) {
  console.log(x);
  console.log(y);
}
```

Result :
```javascript
myFunc(1, 2);
myFunc(1);
myFunc();
myFunc(1, 2, 3);
```

Example :
```javascript
function myFunc(x, y) {
  console.log(arguments);
}
```

Result :
```javascript
myFunc(1, 2);
myFunc(1, 2, 3);
```

## Scope

In JavaScript, you must declare variables via `var` before you can use them.

### Global scope

The scope of a variable is always the complete function (as opposed to the current block).

Example :
```javascript
var x = 1;
function myFunc() {
  var x = -3;
}
```

Result :
```javascript
myFunc();
x;
```

Example :
```javascript
var x = 1;
function myFunc() {
  x = -3;
}
```

Result :
```javascript
myFunc();
x;
```

Example :
```javascript
var x = 1;
block: {
  var x = -3;
  console.log(x);
}
```

Result :
```javascript
x;
```

### Hoisted var

Variable declarations are hoisted : The declaration is moved to the beginning of the function (but not assignments).

Example :
```javascript
function myFunc() {
  console.log(x);
}
```

Result :
```javascript
myFunc();
```

Example :
```javascript
function myFunc() {
  console.log(x);
  if (false) {
    var x = 3;
  }
}
```

Result :
```javascript
myFunc();
```

Same as :
```javascript
function myFunc() {
  var x;
  console.log(x);
  if (false) {
    x = 3;
  }
}
```

### Hoisted function

Function declarations are hoisted too.

Example :
```javascript
function foo() {
  bar();
  function bar() {
    console.log('bar');
  }
}
```

Result :
```javascript
foo();
```

## Closure

Each function stays connected to the variables of the functions that surround it, even after it leaves the scope it was created in.

A closure is a function plus the connection to the variables of its surrounding scopes. 

Example :
```javascript
function createIncrementor(start) {
  return function () {
    start++
    return start;
  }
}
```

Result :
```javascript
var inc = createIncrementor(5);
inc();
inc();
inc();
```

Example :
```javascript
function createIncrementor(start) {
  return {
    add: function () {
      start++
      return start;
    },
    minus: function () {
      start--
      return start;
    },
  }
}
```

Result :
```javascript
var inc = createIncrementor(5);
inc.add();
inc.minus();
inc.minus();
inc.add();
inc.add();

```

Example :
```javascript
var result = [];
for (var i=0; i < 5; i++) {
  result.push(function () { return i });
}
```

Result :
```javascript
result[1]();
result[3]();
```

Result will be the same, because the context of `i` is global and not local to the function. 

## IIFE (Immediately Invoked Function Expression)

Pattern used to simulate a scope, for example to keep a variable from becoming global.

### Use it to create a local context

Example :
```javascript
(function () {
  var x = 2;
}());
```

Result :
```javascript
x;
```

## References

* [Basic JavaScript for the impatient programmer](http://www.2ality.com/2013/06/basic-javascript.html)
* [Expressions versus statements in JavaScript](http://www.2ality.com/2012/09/expressions-vs-statements.html)
