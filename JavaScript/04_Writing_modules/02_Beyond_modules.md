# Beyond modules

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Introduction](#introduction)
- [Modularity and reusability](#modularity-and-reusability)
    - [JavaScript input](#javascript-input)
    - [HTML input](#html-input)
  - [Using both](#using-both)
- [Extensibility](#extensibility)
  - [Using option callbacks](#using-option-callbacks)
  - [Event oriented](#event-oriented)
- [User control level](#user-control-level)
  - [Instance access](#instance-access)
  - [Exposing a specific API](#exposing-a-specific-api)
  - [Event oriented](#event-oriented-1)
  - [Conclusion](#conclusion)
- [References](#references)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

When writing modular modules you need to think of few things :
* modularity and reusability
* extensibility
* user control level

## Modularity and reusability

It's the concept of allowing the user to customize the look, the behavior...etc. of your modules by using options.

There is 2 ways of managing this options.

#### JavaScript input

We already have seen an example of this method in previous talks.

Your module simply take a literal object as input :
```JavaScript
options = {
  option1: '...',
  option2: '...'
}
var moduleInstance = new Module(options);
```

This is the most common way wich is easy to unserstand and works well.

You then need to merge these options with your modules' defaults (examples in [previous chapter](https://github.com/tonai/Lightning-talks/blob/master/JavaScript/04_Writing_modules/01_Modules_practice.md)).

#### HTML input

You can also allow the user to pass his/her options, directly through HTML by using the data API.

Of course this is only possible (and relevant) if your modules use DOM elements...

HTML :
```HTML
<div class="js-module" data-option1="..." data-option2="..."></div>
```

JS :
```JavaScript
var moduleInstance = news Module(options);
```

You then need to fetch the options and merge them with your modules' defaults, which can be done like this (using jQuery) :
```JavaScript
var defaultOptions = {
  option1: 'default',
  option2: 'default',
};

var Module = function(element) {
  this.$element = (element instanceof $)? element: $(element);
  this.options = $.extend({}, defaultOptions); // Clone defaultOptions object.

  $.each(this.$element.data(), function(index, value){
    if (index in defaultOptions) {
      this.options[index] = value;
    }
  }.bind(this));
}
```

### Using both

It's easy to convert the above example to add an `options` input and merge them with `defaultOptions` in the `extend` function.

Allowing both ways can be useful, because it allows to have multiples levels of options, the last one overriding the previous one :
* Default options applied to all elements.
* JavaScript input applied to a set of elements.
* HTML input applied to a specific element.

[Here](https://github.com/tonai/jquery-contenttoggle) is an example of a module using this 2 levels of options.

## Extensibility

It's the concept of letting the user to execute pieces of codes at some points of your module.

When writing a module, you have to think where these points are located in your code and what method the user will need to use.

### Using option callbacks

You can use your module options to let the user defines callback functions.
Transform the function to change the value of `this` on initialization so that the user can access to your module properties :
```JavaScript
/* Setup module. */
Module.prototype.setup = function() {
  if (typeof this.options.userCallback === 'function') {
    this.options.userCallback = this.options.userCallback.bind(this);
  }
};
```

You can also allow the usage of strings representing global functions.  
Transform the string option into a function on initialization :
```JavaScript
/* Setup module. */
Module.prototype.setup = function() {
  if (typeof this.options.userCallback === 'string' &&
      window[this.options.userCallback] &&
      typeof window[this.options.userCallback] === 'function') {
    this.options.userCallback = window[ this.options.userCallback ].bind(this);
  } else if (typeof this.options.userCallback === 'function') {
    this.options.userCallback = this.options.userCallback.bind(this);
  }
};
```

You can also allow the user to conditionnaly control the execution of some methods in your module :
```JavaScript
/* Toggle something. */
Module.prototype.toggle = function() {
  if (typeof this.options.beforeCallback !== 'function' || this.options.beforeCallback())) {
    [...]
  }
};
```

The inside code of the toggle method will only be executed if the `beforeCallback` return `true`.

### Event oriented

Your module can also trigger some custom events at some point of your code on which the user can bind specific event handlers.

Trigger your custom events on the DOM element on which your module is based.  
If not, trigger your custom events on the global `window` object.

For example you can trigger a custom event at the end of the execution of a method :
```JavaScript
/* Toggle something. */
Module.prototype.toggle = function() {
  [...]
  this.isOpen = !this.isOpen;
  
  // Native JavaScript.
  this.element.dispatchEvent(new Event('afterToggle', {instance: this}));
  
  // jQuery way.
  this.$element.trigger('afterToggle', [this]);
};
```

The user can bind an event handler like this :
```JavaScript
// Native JavaScript.
element.addEventListener('afterToggle', function(event){
  if (event.instance.isOpen) { [...] }
});

// jQuery way.
$element.on('afterToggle', function(event, instance){
  if (instance.isOpen) { [...] }
});
```

## User control level

It's the concept of letting the user to have some control of your module after the initialization.

When writing a module, you have to choose the level of control you let to the user.

### Instance access

The simplest way is to let the user manipulate the module instance.

In fact this is the default behavior if your module expose a constructor like [this example](./modules/base-module.js).  
But not if you are developing a jQuery plugin.

In that case you will need to expose the instance to the user.  
Whether by returning the instance :
```JavaScript
// Define a jQuery module.
$.fn['module'] = function(options) {
  var instances = [];
  this.each(function() {
    instances.push(new Module($this, options));
  });
  return instances;
};
// Get the instances directly.
var instances = $('.js-module');
```

But there is 2 problems with this notation :
* `.js-module` represent several DOM elements, so we need to return an array of instances (or we can only operate on the first element).
* by not returning a jQuery object, it will break the [jQuery chaining functionality](https://github.com/tonai/Lightning-talks/blob/master/JavaScript/04_Writing_modules/01_Modules_practice.md#export-your-plugin-with-jquery).

Or you can make the instance accessible through the DOM element like [this example](./modules/jquery.homothetic-resize.js).

Integrated example in [this JSFiddle](http://jsfiddle.net/d3ov5jek/).

You can get the instance like this :
```JavaScript
$('.js-homotheticResize').homotheticResize();
var firstInstance = $('.js-homotheticResize').eq(0).data('homotheticResize');
```

### Exposing a specific API

An other way to grant the user some access to your module is by exposing a specific API.

An API is made of a collection of methods, that are different from the methods developped in the class.  
So you can choose specifically the methods that the user can use and what they do.

In fact, with this method, you can simulate classic public and private methods in standard OOP languages.

For achieving this, you need to keep the instance in a variable, consequently you also need to expose a function for creating that instance.  
Compared to [this example](./modules/jquery.base-module.js), you won't export the class directly but rather something like this :
```JavaScript
(function(){
  'use strict';
  
  /* Module variables. */
  var moduleName, defaultOptions = {};
  
  /* Constructor. */
  function Module(options) { [...] };
  
  /* Module name. */
  moduleName = 'MyModule';
  
  /* Private methods. */
  Module.prototype.privateMethod1 = function() { [...] };
  Module.prototype.privateMethod2 = function() { [...] };
  
  /* Export the module. */
  window[moduleName] = function(options){
    var instance = new Module(options);
    
    /* Public methods. */
    return {
      publicMethod1: function(){ [...] },
      publicMethod2: function(){ [...] }
    };
  };
})();
```

The user can use it like this :
```JavaScript
var options = {};
var myModule = MyModule(options);
myModule.publicMethod1();
```

[Here](./modules/api.base-modules.js) is a more complete example.

You can use a similar method for jQuery plugins with the same explanations as above.

### Event oriented

Like in the "Extensibility" chapter but in the other direction, you can also use event handlers defined in your modules that the user can trigger using custom event names.

Defines them for example in a `bind` method :
```JavaScript
/* Bind events. */
Module.prototype.bind = function() {
  this.element.addEventListener('open', this.open.bind(this));
  this.element.addEventListener('close', this.close.bind(this));
};

/* Open callback. */
Module.prototype.open = function() { [...] };

/* Close callback. */
Module.prototype.close = function() { [...] };
```

The user can trigger them like this :
```JavaScript
element.dispatchEvent(new Event('open'));
element.dispatchEvent(new Event('close'));
```

with jQuery, your can also return a value from an event handler that the user can get back by using the jQuery `.triggerHandler()` method.

Definition :
```JavaScript
/* Bind events. */
Module.prototype.bind = function() {
  this.$element.on('getOptions.' + moduleName, this.getOptions.bind(this));
};

/* Get options callback. */
Module.prototype.getOptions = function() {
  return this.options;
};
```

Usage :
```JavaScript
var options = $element.triggerHandler('getOptions');
```

### Conclusion

The option of using a specific API is often a choice made by module developers, because is it a very user friendly solution and it offers a good separation between "private" and "public" methods that JavaScript does not provide natively.

Using the event oriented way is quite equivalent but think of that is not possible, natively, to return a value from an event handler, and thus it is also not a natural method, even when using a framework, of getting a value by triggering an event.  
If you do so, explain it carefully in your documentation.

In addition, do not "over-protect" your module and your methods because it can disappoint advanced users (developers) who want to extend your module with something of whom you haven't think of or for their specific cases.

So it is also a good thing to let other developers to extend the possibility of your module.  
For that you need to give access to your module `prototype` :

1. By giving access to your module constructor, for example, by exposing it globally.
2. Through the instance, if the `constructor` property has not been overriden.

For example :
```JavaScript
$('.js-homotheticResize').homotheticResize();
var firstInstance = $('.js-homotheticResize').eq(0).data('homotheticResize');
var prototype = firstInstance.constructor.prototype;
```

Remember that the prototype is shared between all instances, and modifying it will also affect already created instances.  
See [here](https://github.com/tonai/Lightning-talks/blob/master/JavaScript/02_Vanilla_advanced/01_Prototype-and-classes.md) for explanations.

## References

* [Writing Modular JavaScript With AMD, CommonJS & ES Harmony](http://addyosmani.com/writing-modular-js/)

