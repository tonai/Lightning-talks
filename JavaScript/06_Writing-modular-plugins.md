# Writing modular plugins

## Foreword

You can use the navigator's debug console (F12) to try the above examples yourself.

Presentation time needed : 30min

## Introduction

When writing modular plugins you need to think of few things :
* modularity and reusability
* availability of a plugin API
* extensibility
* compatibility with modules loader

### Modularity and reusability

This is done by allowing the user to pass some options that will change the way your plugin work.

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
* [JavaScript way](https://github.com/tonai/Lightning-talks/blob/master/JavaScript/04_Best-practices-and-modules.md#allow-for-configuration-and-translation)
* [jQuery way](https://github.com/tonai/Lightning-talks/blob/master/JavaScript/05_jQuery-best-practices-and-plugins.md#merging-options)

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

## Availability of a plugin API

It allows the user to have some controls of your plugin after the initialization.

### Instance access

The simplest way is to let the user manipulate the plugin instance.

In fact this is the default behavior if your plugin expose a constructor like [this example](https://github.com/tonai/Lightning-talks/blob/master/JavaScript/04_Best-practices-and-modules.md#avoid-heavy-nesting).  
But not if you are developping a jQuery plugin.

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
* by not returning a jQuery object, it will break the [jQuery chaining functionality](https://github.com/tonai/Lightning-talks/blob/master/JavaScript/05_jQuery-best-practices-and-plugins.md#jquery-plugin-based-on-an-element).

Or you can make the instance accessible through the DOM element like [this example](https://github.com/tonai/Lightning-talks/blob/master/JavaScript/05_jQuery-best-practices-and-plugins/jquery.homothetic-resize.js).

You can get the instance like this :
```JavaScript
$('.js-homotheticResize').homotheticResize();
var firstInstance = $('.js-homotheticResize').eq(0).data('homotheticResize');
```

### Exposing a specific API

:construction:

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
