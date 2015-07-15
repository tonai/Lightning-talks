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

### Modularity and reusability

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

It's the concept of letting the user to to have some control of your plugin after the initialization.

When writing a plugin, you have to choose the level of control you let to the user.

### Instance access

The simplest way is to let the user manipulate the plugin instance.

In fact this is the default behavior if your plugin expose a constructor like [this example](../03_Best-practices/plugins/jquery.base-plugin.js).  
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

[Here](03_Best-practices/plugins/api.base-plugins.js) is a more complete example.

### Event oriented

:construction:

### Mixed

:construction:

## Extensibility

:construction:

### Using callbacks

:construction:

### Event oriented

:construction:

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
