# Functions and scope

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [First-class citizen](#first-class-citizen)
- [Functions](#functions)
  - [Function declaration](#function-declaration)
  - [Function expression](#function-expression)
  - [Arrow functions (ES6)](#arrow-functions-es6)
  - [Default values (ES6)](#default-values-es6)
  - [Arguments](#arguments)
  - [Rest parameters (ES6)](#rest-parameters-es6)
- [Scope](#scope)
  - [Global scope](#global-scope)
  - [Function scope](#function-scope)
    - [Using `var`](#using-var)
    - [Hoisting](#hoisting)
  - [Block scope](#block-scope)
    - [Using `let`](#using-let)
    - [Using `const`](#using-const)
  - [Closure](#closure)
  - [IIFE (Immediately Invoked Function Expression)](#iife-immediately-invoked-function-expression)
- [References](#references)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## First-class citizen

A first-class citizen is an entity which supports all the operations generally available to other entities.

These operations typically include being passed as a parameter, returned from a function, and assigned to a variable.

**JavaScript does have first-class function.**

## Functions

### Function declaration

Functions can be defined via a function declaration.

Example :
```javascript
function add(param1, param2) {
  return param1 + param2;
}
```

**Remember:** An expression can not start with `function` because it is reserved for the function declaration statement.

### Function expression

Functions can be defined via a function expression.

A function expression produces a value and can thus be used to directly pass functions as arguments to other functions.

In this case there is no need to give any name to these functions (anonymous function) but as they produce a value, you can store them in variables.

Example :
```javascript
var add = function (param1, param2) {
  return param1 + param2;
};
```

### Arrow functions (ES6)

This is a shortcut for function expression using the `=>` sign.

Example :
```javascript
(param1, param2) => param1 + param2;
```

The `return` statement is implicit.

The parenthesis for parameters are optional if and only if there is only one parameter :
```javascript
x => x * x;
```

You might want to have some other statements and not just one expression to return.  
In this case you’ll have to use bracket notation.  
But in this case there is no implicit `return` anymore.

Example :
```javascript
(param1, param2) => {
  var sum = param1 + param2;
  return sum * sum;
}
```

If you want to return an object  without using the bracket notation you must wrap it in parenthesis :
```javascript
x => ({square: x * x});
```

### Default values (ES6)

In ES6 you can now give default value to missing parameters.

Example : 
```javascript
add();
function add(param1 = 0, param2 = 0) {
  return param1 + param2;
}
add();
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

### Rest parameters (ES6)

Sounds like a more flexible `arguments` by using the same syntax as the spread operator `...`.

Example
```javascript
function myFunc(...all) {
  console.log(all);
}
```

Result :
```javascript
myFunc(1, 2);
myFunc(1, 2, 3);
```

It is compatible with `classical` arguments (rest parameter must be the last formal parameter).

Example
```javascript
function myFunc(first, ...rest) {
  console.log(first, rest);
}
```

Result :
```javascript
myFunc(1, 2);
myFunc(1, 2, 3);
```

## Scope

In JavaScript, you must declare variables via `var`, `let` or `const` before you can use them.

### Global scope

The global scope may differ from your execution environment.  
In browser the global scope in defined by the `window` variable.

A variable defined in the global scope can be accessed by its name directly (if called inside a scope it should not have been overridden in intermediate scopes), or with `window.[variable name]` (like an object property).

### Function scope

#### Using `var`

The scope of a variable declared with `var` is the complete function.

When assigning a value to a variable, with a given name, without declaring it, JavaScript will check recursively if the variable has been declared in parent scopes.

If he found ones, JavaScript will assign the value to the variable, with that given name, living in the closest scope.

If not, JavaScript will create a variable, with that given name, in the global scope.

Example :
```javascript
var x = 1;
function myFunc() {
  var x = -3;
  return x;
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
  return x;
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

#### Hoisting

Variable declarations are hoisted : The declaration is moved to the beginning of the function (but not assignments).

Example :
```javascript
function myFunc() {
  console.log(y);
}
```

Result :
```javascript
myFunc();
```

Example :
```javascript
function myFunc() {
  console.log(y);
  if (false) {
    var y = 3;
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

This can lead to some confusion...

Example :
```javascript
elements = document.getElementsByTagName('h1');
for (var i in [...elements]) {
  console.log(i, elements[i]);
  elements[i].addEventListener('click', function(){
    console.log(i);
  });
}
```

&nbsp;

&nbsp;

Results will be the same, because the context of `i` is global and not local to the function.

Example :
```javascript
elements = document.getElementsByTagName('h1');
for (var i in [...elements]) {
  console.log(i, elements[i]);
  elements[i].addEventListener('click', function(){
    var j = i;
    console.log(j);
  });
}
```

&nbsp;

&nbsp;

KO too :sob:

Example :
```javascript
elements = document.getElementsByTagName('h1');
for (var i in [...elements]) {
  console.log(i, elements[i]);
  elements[i].addEventListener('click', function(){
    var j = i;
    return function(){
      console.log(j);
    }
  }());
}
```

&nbsp;

&nbsp;

Works but...  :neutral_face:

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

### Block scope

#### Using `let`

The scope of a variable declared with `let` is the current block (as opposed to the complete function).

In this case we do not only mean block statement, but also `if`, `while`, `for` blocks...etc.

Example :
```javascript
if (true) {
  let z = 3;
}
```

Result :
```javascript
z;
```

In this case, variables are not hoisted.

Example :
```javascript
function myFunc() {
  console.log(z);
  let z = 3;
}
```

Result :
```javascript
myFunc();
```

Previous problem solved with `let` :
```javascript
elements = document.getElementsByTagName('h1');
for (var i in [...elements]) {
  console.log(i, elements[i]);
  let j = i;
  elements[i].addEventListener('click', function(){
    console.log(j);
  });
}
```

#### Using `const`

`const` works like `let` in terms of scope.

But variable declared with `const` follow the rules below :
* they must be initialized when they are declared
* the value can only be assigned during initialization
* they can't be redeclared (in the same scope)

Example :
```javascript
const z = 3;
z;
z = 5;
z;
const z = 5;
```

Objects are still references :
```javascript
const z = [2, 3];
z;
z.push(5);
z;
```

### Closure

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
var inc2 = createIncrementor(2);
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

### IIFE (Immediately Invoked Function Expression)

Pattern used to simulate a scope, for example to keep a variable from becoming global.

Use it to create a local context.

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

And to keep references to the object you need.

Example :
```javascript
var getMaxWidth = function(elements) {
  return [...elements]
    .map(function(element) {
      return element.offsetWidth;
    })
    .reduce(function(a, b) {
      return Math.max(a, b);
    });
};
```

Result :
```javascript
getMaxWidth(document.getElementsByTagName('h1'));
Math = {};
getMaxWidth(document.getElementsByTagName('h1'));
```

Solution :
```javascript
var getMaxWidth = function(Math) {
  return function(elements) {
    return [...elements]
      .map(function(element) {
        return element.offsetWidth;
      })
      .reduce(function(a, b) {
        return Math.max(a, b);
      });
  };
}(Math);
```

Result :
```javascript
getMaxWidth(document.getElementsByTagName('h1'));
Math = {};
getMaxWidth(document.getElementsByTagName('h1'));
```

## References

* [Basic JavaScript for the impatient programmer](http://www.2ality.com/2013/06/basic-javascript.html)
* [Expressions versus statements in JavaScript](http://www.2ality.com/2012/09/expressions-vs-statements.html)
* [ES6 Arrow Functions in Depth](https://ponyfoo.com/articles/es6-arrow-functions-in-depth)
* [ES6 Let, Const and the “Temporal Dead Zone” (TDZ) in Depth](https://ponyfoo.com/articles/es6-let-const-and-temporal-dead-zone-in-depth)
