# Best practices

## Foreword

You can use the chrome console for the above examples (avoid firebug).

Presentation time needed : 20min

## Existing JavaScript style guides

Some style guides already exist :
* [Google JavaScript Style Guide](https://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
* [jQuery JavaScript Style Guide](http://contribute.jquery.org/style-guide/js/)
* [Node.js Style Guide](https://github.com/felixge/node-style-guide)
* [npm's coding style]https://docs.npmjs.com/misc/coding-style
* [Douglas Crockford’s JavaScript coding style](http://javascript.crockford.com/code.html)
* [Idiomatic JavaScript](https://github.com/rwaldron/idiomatic.js)
* ...

But they don't agree to the same rules...

Example for identation :
* Google, npm, Node.js and Idiomatic recommend to use 2 spaces.
* jQuery recommends to use tabs.
* Crockford recommends to 4 spaces.

[Here](http://seravo.fi/2013/javascript-the-winning-style) is an article showing some of those differences.

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

### Semicolon

Always use semicolons.

Why : Relying on implicit insertion can cause subtle, hard to debug problems. Even more if minified.

Workaround : use a JavaScript syntax checker like [JSLint](http://www.jslint.com/) or [JSHint](http://jshint.com/).

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

Why : because they can easily be overwritten by another code part.

Workaround : use closures and IIFE.

```javascript
(function(){
})();
```

### Variable declaration

Declare your variables at the beginning of each function.

Why : because JavaScript variables declarations are automatically hoisted. So you will avoid some strange behaviours.

Note : you can initialize them later.

Proposition :
```javascript
var foo, bar, baz;
var x = 1;
var y = 2;
var z = x+ y;
```

### Function declaration

Don't declare function within a block.

Why : it is not part of ECMAScript.

Do not :
```javascript
if (x) {
  function foo() {}
}
```

Workaround : use function expression (JavaScript does have first-class functions).

```javascript
var foo;
if (x) {
  foo = function() {};
}
```

### Wrapper objects

Do not use them for primitive types.

Why : Can lead to errors.

Example of error :
```javascript
var x = new Boolean(false);
if (x) {
  // Do something.
}
```

Workaround : use shortcut notations.

Note : you can use wrappers for type casting (without the `new` operator).

```javascript
var x = Boolean(1);
```
