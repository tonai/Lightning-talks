# Best practices and modules

## Foreword

You can use the chrome console for the above examples (avoid firebug).

Presentation time needed : 20min

## Existing JavaScript style guides

Some style guides already exist :
* [Google JavaScript Style Guide](https://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
* [jQuery JavaScript Style Guide](http://contribute.jquery.org/style-guide/js/)
* [Node.js Style Guide](https://github.com/felixge/node-style-guide)
* [npm's coding style](https://docs.npmjs.com/misc/coding-style)
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

Workaround : use [closures](02_Scope-and-functions.md#closure) and [IIFE](02_Scope-and-functions.md#iife-immediately-invoked-function-expression).

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

Why : because JavaScript variables declarations are [automatically hoisted](02_Scope-and-functions.md#hoisted-var). So you will avoid some strange behaviours.

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

Workaround : use [function expression](02_Scope-and-functions.md#function-expression). JavaScript does have [first-class functions](02_Scope-and-functions.md#first-class-citizen).

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

### Shorthands

Don't use shorthands that will lead to incomprehensible code.

Here is some shorthands patterns that can be used in some cases :

Declaring a variable :
```javascript
var myMethod = function(options) {
  this.options = options || {};
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

## Writing a module

### When do I need to write a module ?

In fact, you can almost always write a module.

One JavaScript file contains only one module, and one module represents only one functionality.

Keep your code modularized and specialized, that is : make sure to write smaller, generic helper functions that fulfill one specific task rather than catch-all methods.

### Strict mode

[Strict mode](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Strict_mode) can help you to minimise errors.

But it's important to declare the strict mode inside of the local scope of your module.
Declaring it outside can lead to troubles with vendor modules when using a tool that will concatenate all your files into one.

For example, the value of `this` [can differ in strict mode](03_Constructor-and-prototype.md#this) and some modules can use this type of code to get the global scope :
```javascript
(function(){
  var global = (function(){return this})();
  console.log(global); // Returns window (in the browser) or undefined in strict mode.
})();
```

### Dependencies

It's a fact, your module can depends on other modules, framework...etc.

Without a module loader (AMD, CommonJS or ECMAScript6), specify your dependencies by passing them into your module scope.

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

### Constructor and prototype

Define your module using [constructor](03_Constructor-and-prototype.md#constructor) and [prototype](03_Constructor-and-prototype.md#prototype). It will save memory and makes your code more flexible.

Add methods one by one to avoid to lose the native [constructor prototype property](03_Constructor-and-prototype.md#the-constructor-prototype-property).

Example :
```javascript
(function(){
  'use strict';
  
  /**
   * Constructor of MyModule.
   */
  function MyModule() {
    this.init();
  };
  
  /**
   * Initialize instances of MyModule.
   */
  MyModule.prototype.init = function() {
    // Do something.
  };
})();
```

### Export your module

Without a module loader (AMD, CommonJS or ECMAScript6), export your module to be used by your app.

With Vanilla JavaScript you will need to add your module in the global scope by doing so :
```javascript
var MyModuleGloballyAccessible = (function(){
  'use strict';
  
  /**
   * Constructor of MyModule.
   */
  function MyModule() {/*...*/};
  
  /*...*/
  
  return MyModule;
})();
```

You can then use it within your app :
```javascript
var myModuleInstance = new MyModuleGloballyAccessible();
```

### Allow for Configuration and Translation

Store all specific data into a dedicated object that you can overwrite for each instance.
This includes labels, CSS classes, IDs, presets...etc.

Example :
```javascript
(function(){
  'use strict';
  
  /* Plugin default options. */
  var defaultOptions = {
    label: 'myDefaultLabel'
  };
  
  /**
   * Constructor of MyModule.
   */
  function MyModule(options) {
    var i;
    
    // Merge specific and default options.
    this.options = this.extend({}, defaultOptions);
    this.extend(this.options, options);
    
    console.log(this.options.label)
  };

  /**
   * Extend target object with source object.
   * @param {object} target Target object.
   * @param {object} source Source object.
   */
  MyModule.prototype.extend = function(target, source) {
    var i;
    for (i in source) {
      if (source.hasOwnProperty(i)) {
        target[i] = source[i];
      }
    }
    return target;
  };
  
  /* Create an instance with specific options. */
  new MyModule({
    label: 'myLabel'
  });
})();
```
