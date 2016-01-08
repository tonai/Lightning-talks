# Writing modules

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Basic module](#basic-module)
  - [Constructor and prototype](#constructor-and-prototype)
  - [Classes (ES6)](#classes-es6)
- [Export your module](#export-your-module)
  - [Global namespace](#global-namespace)
  - [[CommonJS][CommonJS]](#commonjscommonjs)
  - [[AMD][AMD]](#amdamd)
  - [[UMD][UMD]](#umdumd)
  - [Modules (ES6)](#modules-es6)
- [Using the DOM](#using-the-dom)
  - [Using a container element](#using-a-container-element)
  - [Optimize your DOM queries](#optimize-your-dom-queries)
- [Best practices](#best-practices)
  - [Allow for Configuration and Translation](#allow-for-configuration-and-translation)
  - [Avoid heavy nesting](#avoid-heavy-nesting)
- [jQuery plugin](#jquery-plugin)
  - [Configure your plugin with jQuery](#configure-your-plugin-with-jquery)
  - [Export your plugin with jQuery](#export-your-plugin-with-jquery)
  - [Avoid duplicate instances](#avoid-duplicate-instances)
- [References](#references)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Basic module

### Constructor and prototype

Define your module using [constructor](https://github.com/tonai/Lightning-talks/blob/master/JavaScript/02_Vanilla_advanced/01_Prototype-and-classes.md#constructor) and [prototype](https://github.com/tonai/Lightning-talks/blob/master/JavaScript/02_Vanilla_advanced/01_Prototype-and-classes.md#prototype). It will save memory and makes your code more flexible.

Add methods one by one to avoid to lose the native [constructor prototype property](https://github.com/tonai/Lightning-talks/blob/master/JavaScript/02_Vanilla_advanced/01_Prototype-and-classes.md#the-constructor-prototype-property).

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

### Classes (ES6)

Or you can write your module using the [ES6 class syntax](https://github.com/tonai/Lightning-talks/blob/master/JavaScript/02_Vanilla_advanced/01_Prototype-and-classes.md#classes-es6).

Example :
```javascript
(function(){
  'use strict';

  class MyModule {
    /**
     * Constructor of MyModule.
     */
    constructor () {
      this.init();
    }

    /**
     * Initialize instances of MyModule.
     */
    init () {
      // Do something.
    }
  }
})();
```

For now you will need to compile your module with [Babel][Babel] if you want it to be compatible with ES5 navigators such as Internet Explorer.

## Export your module

### Global namespace

Without a module loader, export your module in the global namespace to be used by other modules.

Example :
```javascript
window.MyModuleGloballyAccessible = (function(){
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

In a [previous talk](https://github.com/tonai/Lightning-talks/blob/master/JavaScript/01_Vanilla/05_Best-practices.md#globals) we saw that you should not use the global namespace.  
In fact, here is the only exception if you want your module to be easily usable by other modules on all navigators.  
When using the Google Analytics script in your site you will probably get an `ga` or `GoogleAnalyticsObject` variable.  
Variables used in our module are not exposed but only the one exposing the API.

### [CommonJS][CommonJS]

The CommonJS module proposal specifies a simple API for declaring modules.

These specifications are more server-side centered but can be brought to browser for example by using [browserify][browserify].

Application main file `app.js` :
```JavaScript
(function(){
  'use strict';

  /* Dependencies. */
  var HelloWorld = require('./app/HelloWorld.js'); // Require with path.
  
  /* Create instance. */
  new HelloWorld();
})();
```

You plugin file `./app/HelloWorld.js` :
```JavaScript
(function(){
  'use strict';

  /* Dependencies. */
  var $ = require('jquery'); // Require with alias.
  
  /* Constructor. */
  var Plugin = function(){
    $('body').append('<p>Hello world</p>');
  };
  
  /* Export plugin. */
  module.exports = Plugin;
})();
```

### [AMD][AMD]

The AMD module format itself is a proposal for defining modules where both the module and dependencies can be asynchronously loaded.

You can use these specifications by using [requirejs](http://www.requirejs.org/).

Application main file `app.js` :
```JavaScript
define(function(require){
  'use strict';
  
  /* Dependencies. */
  var HelloWorld = require('./app/HelloWorld.js');
  
  /* Create instance. */
  new HelloWorld();
});
```

You plugin file `./app/HelloWorld.js` :
```JavaScript
/* Dependencies. */
define(['jquery', function($){
  'use strict';
  
  /* Constructor. */
  var Plugin = function(){
    $('body').append('<p>Hello world</p>');
  };
  
  /* Export plugin. */
  return Plugin;
})();
```

### [UMD][UMD]

The UMD pattern typically attempts to offer compatibility with the most popular script loaders of the day (e.g RequireJS amongst others).

In many cases it uses AMD as a base, with special-casing added to handle CommonJS compatibility.

You plugin file `./app/HelloWorld.js` :
```JavaScript
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node/CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function ($) {
  /* Constructor. */
  var Plugin = function(){
    $('body').append('<p>Hello world</p>');
  };
  
  /* Export plugin. */
  return Plugin;
}));
```

### Modules (ES6)

Take a look at the future of JavaScript.

Application main file `app.js` :
```JavaScript
(function(){
  'use strict';
  
  /* Dependencies. */
  import HWConstructor from HelloWorld;
  
  /* Create instance. */
  new HWConstructor();
})();
```

You plugin file `./app/HelloWorld.js` :
```JavaScript
module HelloWorld{
  'use strict';
  
  /* Dependencies. */
  module $ from 'http://.../jquery.js';
  
  /* Constructor. */
  var Plugin = function(){
    $('body').append('<p>Hello world</p>');
  };
  
  /* Export plugin. */
   export var HWConstructor = Plugin;
};
```

But this syntax is now usable, even for ES5 only navigator, by using [Babel][Babel] and [browserify][browserify] in a build process.

## Using the DOM

### Using a container element

For plugins that need to manipulate differents elements, use a container element you will use to instantiate your plugin, and use the `find` jQuery function from this element, inside the plugin to select the elements you need.

This solution is not relevant for all cases but you can adapt the concept to your needs.

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

Example :
```javascript
window.MyModule = (function(){
  'use strict';

  /**
   * Constructor of MyModule.
   */
  function MyModule(element) {
    this.element = element;
    this.init();
  };

  /**
   * Initialize instances of MyModule.
   */
  MyModule.prototype.init = function() {
    this.items = this.element.getElementsByClassName('js-slider__item');
    this.next = this.element.getElementsByClassName('js-slider__next');
    this.prev = this.element.getElementsByClassName('js-slider__prev');
  };

  return MyModule;
})();
```

Create instances :
```javascript
var sliders = document.getElementsByClassName('js-slider');
for (var i in sliders) {
  if (sliders[i] instanceof Element) {
    new MyModule(sliders[i]); // Create instance
  }
}
```

This will ensure that all your slider instances to be independent from each other.

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

## Best practices

### Allow for Configuration and Translation

Store all specific data into a dedicated object that you can overwrite for each instance.
This includes labels, CSS classes, IDs, presets, magic numbers...etc.

Example :
```javascript
(function(){
  'use strict';

  /* Plugin default options. */
  var defaultOptions = {
    label: 'myDefaultLabel'
  };

  /**
   * Constructor.
   */
  function Plugin(element, options) {
    this.element = element

    // Merge specific and default options.
    this.options = this.merge({}, defaultOptions);
    this.merge(this.options, options);

    // Log the label.
    console.log(this.options.label);
  };

  /**
   * Merge target object with source object.
   * @param {object} target Target object.
   * @param {object} source Source object.
   */
  Plugin.prototype.merge = function(target, source) {
    for (var i in source) {
      if (source.hasOwnProperty(i)) {
        target[i] = source[i];
      }
    }
    return target;
  };

  /* Create an instance with specific options. */
  new Plugin({
    label: 'myLabel'
  });
})();
```

### Avoid heavy nesting

When you should provide a callback (event, AJAX...etc.), define it in a separate method to avoid heavy nesting.

But do not forget to use the `bind` method to define the value of `this` to be what you expect :
```javascript
var MyModule = (function(window){
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
    this.options = this.merge({}, defaultOptions);
    this.merge(this.options, options);

    // Attach event listener.
    window.addEventListener('resize', this.resize.bind(this));
  };

  /**
   * Resize callback.
   */
  Plugin.prototype.resize = function() {
    console.log(this.options.label);
  };

  /**
   * Merge target object with source object.
   * @param {object} target Target object.
   * @param {object} source Source object.
   */
  Plugin.prototype.merge = function(target, source) {
    for (var i in source) {
      if (source.hasOwnProperty(i)) {
        target[i] = source[i];
      }
    }
    return target;
  };

  return Plugin;
})(window);
```

Create an instance with specific options :
```javascript
new MyModule({
  label: 'myLabel'
});
```

## jQuery plugin

### Configure your plugin with jQuery

With jQuery you have a built-in function for merging objects : `extend`.

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

### Export your plugin with jQuery

Based on the previous code you can easily define a jQuery plugin based on an element (or a container element).

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

### Avoid duplicate instances

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

## References

* [Google JavaScript Style Guide][Google]
* [JavaScript, the winning style][Seravo]
* [Javascript best practices part 1](http://www.thinkful.com/learn/javascript-best-practices-1/)
* [Javascript best practices part 2](http://www.thinkful.com/learn/javascript-best-practices-2/)
* [AMD][AMD]
* [CommonJS][CommonJS]
* [UMD][UMD]

[browserify]: http://browserify.org/
[Babel]: https://babeljs.io/
[AMD]: http://www.requirejs.org/docs/whyamd.html
[CommonJS]: http://wiki.commonjs.org/wiki/CommonJS
[UMD]: https://github.com/umdjs/umd
[Google]: https://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
[Seravo]: http://seravo.fi/2013/javascript-the-winning-style
