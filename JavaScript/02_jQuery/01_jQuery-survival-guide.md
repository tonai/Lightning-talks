# jQuery survival guide

## Foreword

You can use the navigator's debug console (F12) to try the above examples yourself.

Presentation time needed : 30min

## jQuery object

A jQuery object contains a collection of DOM elements that have been created from an HTML string or selected from a document.

The jQuery object itself behaves much like an array, it has a `length` property and the elements in the object can be accessed by their numeric indices `[0]` to `[length-1]`.

A jQuery object can be used to perform any of the usual jQuery method we will see further.

## jQuery core

the `jQuery()` function can be use different ways :
1. by passing a function as first argument
2. by passing a HTML string (starts with `<tag ... >`) as first argument
3. by passing a selector as first argument, and an optionnal context as second argument
4. by passing a jQuery object as first argument
5. by passing something else as first argument
6. by passing nothing.

### `jQuery(callback)`

This syntax is a shortcut for `jQuery(document).ready(callback)`.

### `jQuery(htmlString)`

jQuery attempts to create new DOM elements as described by the HTML string.
Then a jQuery object is created and returned that refers to these elements

### `jQuery(selector [, context])`

This is equivalent to the native `querySelectorAll` function that we already have seen here(https://github.com/tonai/Lightning-talks/blob/master/JavaScript/01_Bases/03_DOM-and-events.md#getting-a-dom-element), but return a jQuery object.

If a context is specified (DOM element, document or jQuery object), the behavour is the same as `jQuery(context).find(selector)`.

### `jQuery(jQuery)`

Return a clone of the jQuery object.

### `jQuery(Element|Array|Object)`

Return a jQuery object wrapping the input.

### `jQuery()`

Return an empty jQuery object of length = 0.

This is usefull you need to create a jQuery object of dynamic elements by using the `add` method.

Example in this page :
```JavaScript
var $links = jQuery();
for (var i = 0; i < 3; i++) {
  $links = $links.add('<a href="#">Link ' + (i + 1) + '</a>');
}
console.log($links);
```

## References

* [jQuery API](http://api.jquery.com/)
