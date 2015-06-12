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

:construction:

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

### ES Harmony

:construction:

## References

* [Writing Modular JavaScript With AMD, CommonJS & ES Harmony](http://addyosmani.com/writing-modular-js/)
* [WHY AMD?](http://www.requirejs.org/docs/whyamd.html)
* [CommonJS](http://wiki.commonjs.org/wiki/CommonJS)

