# jQuery best practices and plugins

## Foreword

You can use the chrome console for the above examples (avoid firebug).

Presentation time needed : 20min

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

It will simplify [the module defined in the previous section](04_Best-practices-and-modules.md#allow-for-configuration-and-translation) :

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
  };
  
  /* Create an instance with specific options. */
  new MyModule({
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
  };
  
  /* Expose jQuery plugin. */
  $.fn.myModuleName = function(options) {
    this.each(function() {
      new Plugin(this, options);
    });
  };
})(jQuery);
```

Usage :
```javascript
jQuery('.js-element').myModuleName({
  label: 'myLabel'
});
```
