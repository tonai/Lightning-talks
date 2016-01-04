# jQuery best practices and plugins

## Foreword

You can use the navigator's debug console (F12) to try the above examples yourself.

Presentation time needed : 20min

## Table of content

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [JavaScript and DOM](#javascript-and-dom)
  - [HTML classes](#html-classes)
  - [Variable naming](#variable-naming)
  - [Use a container element](#use-a-container-element)
  - [Namespace your events](#namespace-your-events)
- [jQuery plugin](#jquery-plugin)
  - [Merging options](#merging-options)
  - [jQuery plugin based on an element](#jquery-plugin-based-on-an-element)
  - [Avoid duplicates on the same element](#avoid-duplicates-on-the-same-element)
  - [Optimize your DOM queries](#optimize-your-dom-queries)
- [References](#references)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## JavaScript and DOM

### HTML classes

Use specific HTML classes that you will use in your JavaScript plugins to select the DOM elements you need to manipulate.

Prefix those classes with `js-` to differentiate them from other style classes.

For state classes use the `is-` prefix.
Example :
* `is-active`
* `is-open`
* ...

Avoid the usage of HTML id for your code to be more reusable.

### Variable naming

I like to prefix all my jQuery variables with `$` so they are immediately identified from other variables.

Example :
```javascript
$element = $('.js-element');
```

### Use a container element

For "complex" plugins that need to manipulate differents elements, use a container element you will use to instantiate your plugin, and use the `find` jQuery function from this element, inside the plugin to select the elements you need.

Slider example :
```html
<div class="js-slider slider">
  <div class="slider__item-wrapper">
    <div class="js-slider__item slider__item"></div>
    <div class="js-slider__item slider__item"></div>
    <div class="js-slider__item slider__item"></div>
  </div>
  <div class="js-slider__next slider__next"></div>
  <div class="js-slider__prev slider__prev"></div>
</div>
```

In this example we will use all `js-` prefixed classes (and only) in our JavaScript.

We will use other classes like `slider`, `slider__item-wrapper` for styling (and of course we will not apply style on `js-` prefixed elements).

```javascript
$slider = $('.js-slider');
$items  = $slider.find('.js-slider__item');
$next   = $slider.find('.js-slider__next');
$prev   = $slider.find('.js-slider__prev');
```

This will ensure that all your slider instances to be independent from each other.

### Namespace your events

You can namespace an event by using this syntax :
```javascript
$element.on('click.my-namespace', function(){/*...*/});
```

By using this, you can :

* Easily call your specific callback, without calling all other callbacks attached to it :

```javascript
$element.trigger('click.my-namespace');
```

* Easily remove a specific event without removing all other events attached to it :

```javascript
$element.off('click.my-namespace');
```

* Easily remove all events attached to an element from a specific namespace :

```javascript
$element.off('.my-namespace');
```

It is useful inside your plugin, but it will alse avoid nightmares to someone who need to extend your plugin.

## jQuery plugin

### Merging options

With jQuery you have a built-in function for merging objects : `extend`.

It will simplify [the plugin defined in the previous section](../03_Best-practices/01_Best-practices-and-modules.md#allow-for-configuration-and-translation) :

Example :
```javascript
(function($){
  'use strict';

  /* Plugin default options. */
  var defaultOptions = {
    label: 'myDefaultLabel'
  };

  /**
   * Constructor.
   */
  function Plugin(options) {
    // Merge specific and default options.
    this.options = $.extend({}, defaultOptions, options);

    // Log the label.
    console.log(this.options.label);
  }

  /* Create an instance with specific options. */
  new Plugin({
    label: 'myLabel'
  });
})(jQuery);
```

### jQuery plugin based on an element

Based on this previous code you can easily define a jQuery plugin based on an element (or a container element).

Example :
```javascript
(function($){
  'use strict';

  /* Plugin default options. */
  var defaultOptions = {
    label: 'myDefaultLabel'
  };

  /**
   * Constructor.
   */
  function Plugin(element, options) {
    // Merge specific and default options.
    this.options = $.extend({}, defaultOptions, options);

    // Initialize the main element.
    this.$element = (element instanceof $)? element: $(element);

    // Log the label.
    console.log(this.options.label);
  }

  /* Expose jQuery plugin. */
  $.fn.myPlugin = function(options) {
    return this.each(function() {
      new Plugin(this, options);
    });
  };
})(jQuery);
```

Usage :
```javascript
jQuery('.js-element').myPlugin({
  label: 'myLabel'
});
```

The idea is to iterate through each DOM element that will match the selector (here `.js-element`) and create a plugin instance.

We return the result of `this.each` to maintain the [jQuery chaining](http://api.jquery.com/Types/#jQuery) functionality allowing to write something like this for example :
```javascript
jQuery('.js-element')
  .hide()
  .myPlugin({
    label: 'myLabel'
  })
  .show();
```

### Avoid duplicates on the same element

You can use a HTML5 data using your plugin name to prevent multiple instance of the same plugin to the same element.

Example :
```javascript
(function($){
  'use strict';

  /* Plugin name. */
  var pluginName = 'myPlugin';

  /* Plugin default options. */
  var defaultOptions = {
    label: 'myDefaultLabel'
  };

  /**
   * Constructor.
   */
  function Plugin(element, options) {
    // Merge specific and default options.
    this.options = $.extend({}, defaultOptions, options);

    // Initialize the main element.
    this.$element = (element instanceof $)? element: $(element);

    // Save the instance reference into the DOM element.
    this.$element.data(pluginName, this);

    // Log the label.
    console.log(this.options.label);
  }

  /* Expose jQuery plugin. */
  $.fn[pluginName] = function(options) {
    return this.each(function() {
      var $this = $(this);
      if (!$this.data(pluginName)) {
        new Plugin($this, options);
      }
    });
  };
})(jQuery);
```

If you don't want to expose the instance through the DOM, you can simply replace `this` by `1` :
```javascript
this.$element.data(pluginName, 1);
```

### Optimize your DOM queries

Avoid to get a DOM element inside of a callback.
If the element already exists, save it at the beginning.

Do not :
```javascript
/**
 * Resize callback.
 */
Plugin.prototype.resize = function() {
  var $items = $element.find('.js-element__item');
  $items.addClass('is-resized');
};
```

Do :
```javascript
/**
 * Initialize instance (setup is called in the constructor).
 */
Plugin.prototype.setup = function() {
  this.$items = this.$element.find('.js-element__item');
};

/**
 * Resize callback.
 */
Plugin.prototype.resize = function() {
  this.$items.addClass('is-resized');
};
```

I'd like to add 3 methods for my plugins :
* `setup` : Used to fetch DOM elements, calculate data...etc.
* `bind`  : Used to regroup all events binding in this function.
* `init`  : Used to initialize the default plugin state.

Final reusable plugin template : [jQuery base plugin](../03_Best-practices/plugins/jquery.base-plugin.js)!

Plus an example based on this template : [homothetic-resize](../03_Best-practices/plugins/jquery.homothetic-resize.js).

Example integrated in [this JSFiddle](http://jsfiddle.net/d3ov5jek/).

## References

* [CSS Architecture](http://engineering.appfolio.com/2012/11/16/css-architecture/)
* [SMACSS](https://smacss.com/)

