# Best practices

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Existing JavaScript style guides](#existing-javascript-style-guides)
- [Standard coding best practices](#standard-coding-best-practices)
- [Basic rules](#basic-rules)
  - [Semicolon](#semicolon)
  - [Globals](#globals)
  - [Variable declaration](#variable-declaration)
  - [Function declaration](#function-declaration)
  - [Wrapper objects](#wrapper-objects)
  - [Shorthands](#shorthands)
- [Writing a module](#writing-a-module)
  - [When do I need to write a module ?](#when-do-i-need-to-write-a-module-)
  - [Strict mode](#strict-mode)
  - [Dependencies](#dependencies)
  - [Constructor and prototype](#constructor-and-prototype)
  - [Export your module](#export-your-module)
  - [Allow for Configuration and Translation](#allow-for-configuration-and-translation)
  - [Avoid heavy nesting](#avoid-heavy-nesting)
- [References](#references)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Existing JavaScript style guides

Some style guides already exist :
* [Google JavaScript Style Guide][Google]
* [jQuery JavaScript Style Guide](http://contribute.jquery.org/style-guide/js/)
* [Node.js Style Guide](https://github.com/felixge/node-style-guide)
* [npm's coding style](https://docs.npmjs.com/misc/coding-style)
* [Douglas Crockford’s JavaScript coding style](http://javascript.crockford.com/code.html)
* [Idiomatic JavaScript](https://github.com/rwaldron/idiomatic.js)
* ...

But they don't all agree to the same rules...

Example for identation :
* Google, npm, Node.js and Idiomatic recommend to use 2 spaces.
* jQuery recommends to use tabs.
* Crockford recommends to 4 spaces.

[Here][Seravo] is an article showing some of those differences.

The important point is to define those rules at the beginning of your project, and all developers that will work on this project should apply them.
Even if they don't agree...

## Standard coding best practices

Like other programming languages standard best practices apply to JavaScript.

For example :
* Choose easy to understand names for variables and functions.
* Comment as much as needed but not more
* ...

In the rest of the document we will only focus on specific best practices applicable to JavaScript.

## Basic rules

### HTML classes

Use specific HTML classes that you will use in your JavaScript plugins to select the DOM elements you need to manipulate.

Prefix those classes with `js-` to differentiate them from other style classes.

For state classes use the `is-` prefix.
Example :
* `is-active`
* `is-open`
* ...

Avoid references of HTML id into your code for it to be more reusable.

### Semicolon

Always use semicolons.

**Why :** Relying on implicit insertion can cause subtle, hard to debug problems. Even more if minified.

**Workaround :** use a JavaScript syntax checker like [JSLint](http://www.jslint.com/) or [JSHint](http://jshint.com/).

Example of error :
```javascript
var myMethod = function() {
  return 42;
} // Missing semicolon.
(function() {
})();
```

### Globals

Avoid use of global variables.

**Why :** because they can easily be overwritten by another code part.

**Workaround :** use [closures](https://github.com/tonai/Lightning-talks/blob/master/JavaScript/01_Vanilla/03_Functions-and-Scope.md#closure) and [IIFE](https://github.com/tonai/Lightning-talks/blob/master/JavaScript/01_Vanilla/03_Functions-and-Scope.md#iife-immediately-invoked-function-expression).

```javascript
(function(){
})();
```

In the case you absolutely need to set a global variable. Do it explicitly and use a namespace :
```javascript
(function(){
  // Do something...
  window.myNamespace.myVar = 42;
})();
```

### Variable declaration

Declare your variables at the beginning of each function.

**Why :** Because JavaScript variables declarations are [automatically hoisted](https://github.com/tonai/Lightning-talks/blob/master/JavaScript/01_Vanilla/03_Functions-and-Scope.md#hoisting). Doing so will avoid you some strange behaviours.

**Note :** Of course, you can initialize them later.

Proposition :
```javascript
(function(){
  var foo, bar, baz;
  var x = 1;
  var y = 2;
  var z = x+ y;

  // Some code.

  foo = 'foo';

  // Some code.
})();
```

### Function declaration

Don't declare function within a block.

**Why :** it is not part of ECMAScript.

Do not :
```javascript
if (x) {
  function foo() {}
}
```

Workaround : use [function expression](https://github.com/tonai/Lightning-talks/blob/master/JavaScript/01_Vanilla/03_Functions-and-Scope.md#function-expression).

```javascript
var foo;
if (x) {
  foo = function() {};
}
```

As function declaration are also hoisted try to declare them at the top too.

### Wrapper objects

Do not use them for primitive types.

**Why :** Can lead to errors.

Example of error :
```javascript
var x = new Boolean(false);
if (x) {
  // Do something.
}
```

**Workaround :** use shorthand notations.

**Note :** you can use wrappers for type casting (without the `new` operator).

```javascript
var x = Boolean(1);
```

### Shorthands

Don't use shorthands that can lead to incomprehensible code.

Example (Fibonacci sequence calculator) :
```javascript
function f(m,r,p,c){
  return m=m|0&&(r?r===m?c:f(m,r+1,c,p+c):f(m,1,0,1));
}
```

Here is some shorthands patterns that can be used in some cases :

Give a default value to a variable :
```javascript
var myMethod = function(options) {
  options = options || {};
}
```

Quick existence test :
```javascript
this.init && this.init();
// Or
var myElement = document.getElementById('myId');
myElement && myElement.addEventListener('click', function(){/*...*/});
```

But do not overuse them...

### Write module

In fact, you can almost always write a module.

One JavaScript file contains only one module, and one module represents only one functionality.

Keep your code modularized and specialized, that is : make sure to write smaller, generic helper functions that fulfill one specific task rather than catch-all methods.

### Strict mode

[Strict mode](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Strict_mode) can help you to minimise errors.

But it's important to declare the strict mode inside of the local scope of your module.  
Declaring it outside can lead to troubles with vendor modules when using a tool that will concatenate all your files into one.

For example, the value of `this` [can differ in strict mode](https://github.com/tonai/Lightning-talks/blob/master/JavaScript/02_Vanilla_advanced/01_Prototype-and-classes.md#this) and some modules can use this type of code to get the global scope :
```javascript
(function(){
  console.log(function(){return this}());
})();

(function(){
  'use strict';
  console.log(function(){return this}());
})();
```

### Dependencies

It's a fact, your module will most probably depend on other modules, framework...etc.

Without a module loader (AMD, CommonJS or ES6), specify your dependencies by passing them into your module scope.

3 benefits :
* By doing so, you will list your module dependencies, and will be easier in the future to reuse your module with a module loader for instance.
* You will create a local variable that can not be deleted by other module (example of jQuery noConflict mode).
* You can rename the dependencies inside of your module.

Example :
```javascript
jQuery(function(){
  console.log(jQuery);
})
```

It should log the jQuery object after the document's ready event.

But it will log `undefined` if another module declares :
```javascript
jQuery.noConflict(true);
```

Usage example :
```javascript
(function(global, $){
  'use strict';
  global.myNamespace = {
    myVar: $('mySelector'),
  };
})(window, jQuery);
```

## References

* [Google JavaScript Style Guide][Google]
* [JavaScript, the winning style][Seravo]
* [Javascript best practices part 1](http://www.thinkful.com/learn/javascript-best-practices-1/)
* [Javascript best practices part 2](http://www.thinkful.com/learn/javascript-best-practices-2/)

[Google]: https://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
[Seravo]: http://seravo.fi/2013/javascript-the-winning-style
