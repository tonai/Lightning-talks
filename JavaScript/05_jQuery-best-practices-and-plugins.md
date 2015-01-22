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

## Use a container element

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

```javascript
$slider = $('.js-slider');
$items  = $slider.find('.js-slider__item');
$next   = $slider.find('.js-slider__next');
$prev   = $slider.find('.js-slider__prev');
```

This will ensure that all your slider instances to be independent from each other.
