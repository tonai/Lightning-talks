# Writing modular plugins

## Foreword

You can use the navigator's debug console (F12) to try the above examples yourself.

Presentation time needed : 30min

## Introduction

When writing modular plugins you need to think of few things :
* modularity and reusability
* user control level
* extensibility
* compatibility with modules loader

## Modularity and reusability

It's the concept of allowing the user to customize the look, the behavior...etc. of your plugin by using options.

There is 2 ways of managing this options.

#### JavaScript input

We already have seen an example of this method in previous talks.

Your plugin simply take a literal object as input :
```JavaScript
options = {
  option1: '...',
  option2: '...'
}
var pluginInstance = new Plugin(options);
```

This is the most common way wich is easy to unserstand and works well.

You then need to merge these options with your plugins' defaults :
* [JavaScript way](../03_Best-practices/01_Best-practices-and-modules.md#allow-for-configuration-and-translation)
* [jQuery way](../03_Best-practices/02_jQuery-best-practices-and-plugins.md#merging-options)

#### HTML input

You can also allow the user to pass his options, directly through HTML by using the data API.

This is only possible if your plugin use a DOM element.

HTML :
```HTML
<div class="js-plugin" data-option1="..." data-option2="..."></div>
```

JS :
```JavaScript
var pluginInstance = news Plugin(options);
```

You then need to fetch the options and merge them with your plugins' defaults, which can be done like this (using jQuery) :
```JavaScript
var defaultOptions = {
  option1: 'default',
  option2: 'default',
};

var Plugin = function(element) {
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

[Here](https://github.com/tonai/jquery-contenttoggle) is an example of a plugin using this 2 levels of options.

## User control level

It's the concept of letting the user to have some control of your plugin after the initialization.

When writing a plugin, you have to choose the level of control you let to the user.

### Instance access

The simplest way is to let the user manipulate the plugin instance.

In fact this is the default behavior if your plugin expose a constructor like [this example](../03_Best-practices/plugins/base-plugin.js).  
But not if you are developing a jQuery plugin.

In that case you will need to expose the instance to the user.  
Whether by returning the instance :
```JavaScript
// Define a jQuery plugin.
$.fn['plugin'] = function(options) {
  var instances = [];
  this.each(function() {
    instances.push(new Plugin($this, options));
  });
  return instances;
};
// Get the instances directly.
var instances = $('.js-plugin');
```

But there is 2 problems with this notation :
* `.js-plugin` represent several DOM elements, so we need to return an array of instances (or we can only operate on the first element).
* by not returning a jQuery object, it will break the [jQuery chaining functionality](../03_Best-practices/02_jQuery-best-practices-and-plugins.md#jquery-plugin-based-on-an-element).

Or you can make the instance accessible through the DOM element like [this example](../03_Best-practices/plugins/jquery.homothetic-resize.js).

You can get the instance like this :
```JavaScript
$('.js-homotheticResize').homotheticResize();
var firstInstance = $('.js-homotheticResize').eq(0).data('homotheticResize');
```

### Exposing a specific API

An other way to grant the user some access to your plugin is by exposing a specific API.

An API is made of a collection of methods, that are different from the methods developped in the class.  
So you can choose specifically the methods that the user can use and what they do.

In fact, with this method, you can simulate classic public and private methods in standard OOP languages.

For achieving this, you need to keep the instance in a variable, consequently you also need to expose a function for creating that instance.  
Compared to [this example](../03_Best-practices/plugins/jquery.base-plugin.js), you won't export the class directly but rather something like this :
```JavaScript
(function(){
  'use strict';
  
  /* Plugin variables. */
  var pluginName, defaultOptions = {};
  
  /* Constructor. */
  function Plugin(options) { [...] };
  
  /* Plugin name. */
  pluginName = 'MyPlugin';
  
  /* Private methods. */
  Plugin.prototype.privateMethod1 = function() { [...] };
  Plugin.prototype.privateMethod2 = function() { [...] };
  
  /* Export the plugin. */
  window[pluginName] = function(options){
    var instance = new Plugin(options);
    
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
var myPlugin = MyPlugin(options);
myPlugin.publicMethod1();
```

[Here](../03_Best-practices/plugins/api.base-plugins.js) is a more complete example.

You can use a similar method for jQuery plugins with the same explanations as above.

### Event oriented

You can also use event handlers defined in your plugins that the user can trigger using custom event names.

Bind your event handlers on the DOM element on which your plugin is based.  
If not, bind your event handlers on the global `window` object.

Defines them for example in a `bind` method :
```JavaScript
/* Bind events. */
Plugin.prototype.bind = function() {
  this.element.addEventListener('open', this.open.bind(this));
  this.element.addEventListener('close', this.close.bind(this));
};

/* Open callback. */
Plugin.prototype.open = function() { [...] };

/* Close callback. */
Plugin.prototype.close = function() { [...] };
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
Plugin.prototype.bind = function() {
  this.$element.on('getOptions.' + pluginName, this.getOptions.bind(this));
};

/* Get options callback. */
Plugin.prototype.getOptions = function() {
  return this.options;
};
```

Usage :
```JavaScript
var options = $element.triggerHandler('getOptions');
```

### Conclusion

The option of using a specific API is often a choice made by plugin developers, because is it a very user friendly solution and it offers a good separation between "private" and "public" methods that JavaScript does not provide natively.

Using the event oriented way is quite equivalent but think of that is not possible, natively, to return a value from an event handler, and thus it is also not a natural method, even when using a framework, of getting a value by triggering an event.  
If you do so, explain it carefully in your documentation.

## Extensibility

It's the concept of letting the user to execute pieces of codes at some points of your plugin.

When writing a plugin, you have to think where these points are located in your code and what method the user will need to use.

### Using option callbacks

You can use your plugin options to let the user defines callback functions.
Transform the function to change the value of `this` on initialization so that the user can access to your plugin properties :
```JavaScript
/* Setup plugin. */
Plugin.prototype.setup = function() {
  if (typeof this.options.userCallback === 'function') {
    this.options.userCallback = this.options.userCallback.bind(this);
  }
};
```

You can also allow the usage of strings representing global functions.  
Transform the string option into a function on initialization :
```JavaScript
/* Setup plugin. */
Plugin.prototype.setup = function() {
  if (typeof this.options.userCallback === 'string' &&
      window[this.options.userCallback] &&
      typeof window[this.options.userCallback] === 'function') {
    this.options.userCallback = window[ this.options.userCallback ].bind(this);
  } else if (typeof this.options.userCallback === 'function') {
    this.options.userCallback = this.options.userCallback.bind(this);
  }
};
```

You can also allow the user to conditionnaly control the execution of some methods in your plugin :
```JavaScript
/* Open something. */
Plugin.prototype.open = function() {
  if (typeof this.options.beforeOpenCallback !== "function" || this.options.beforeOpenCallback())) {
    [...]
  }
};
```

The inside code of the open method will only be executed if the `beforeOpenCallback` return `true`.

### Event oriented

:construction:

### Conclusion

:construction:

In addition, do not "over-protect" your plugin and your methods because it can disappoint advanced users (developers) who want to extend your plugin with something of whom you haven't think of or for their specific cases.

So it is also a good thing to let other developers to extend the possibility of your plugin.  
For that you need to give access to your plugin `prototype` :

1. By giving access to your plugin constructor, for example, by exposing it globally.
2. Through the instance, if the `constructor` property has not been overriden.

For example :
```JavaScript
$('.js-homotheticResize').homotheticResize();
var firstInstance = $('.js-homotheticResize').eq(0).data('homotheticResize');
var prototype = firstInstance.constructor.prototype;
```

Remember that the prototype is shared between all instances, and modifying it will also affect already created instances.  
See [here](https://github.com/tonai/Lightning-talks/blob/master/JavaScript/01_Bases/04_Constructor-and-prototype.md#prototype) for explanations.

## Compatibility with modules loader

:construction:

### AMD

:construction:

### CommonJS

:construction:

### UMD

:construction:

### ES Harmony

:construction:

## References

* [Writing Modular JavaScript With AMD, CommonJS & ES Harmony](http://addyosmani.com/writing-modular-js/)
* [AMD](http://www.requirejs.org/docs/whyamd.html)
* [CommonJS](http://wiki.commonjs.org/wiki/CommonJS)
* [UMD](https://github.com/umdjs/umd)
