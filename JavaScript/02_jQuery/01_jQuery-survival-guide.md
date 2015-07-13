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

This is equivalent to the native `querySelectorAll` function that we have already seen [here](https://github.com/tonai/Lightning-talks/blob/master/JavaScript/01_Bases/03_DOM-and-events.md#getting-a-dom-element), but returns a jQuery object.

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

## jQuery traversing

### Navigating into the DOM - children

* `jQuery.children([Selector])` : Get the children of each element in the set of matched elements, optionally filtered by a selector.
* `jQuery.find([Selector|Element|jQuery])` : Get the descendants of each element in the current set of matched elements, filtered by a selector, jQuery object, or element.

[CodePen example](http://codepen.io/tonai/pen/EjRVGQ).

### Navigating into the DOM - siblings

* `jQuery.next([Selector])` : Get the immediately following sibling of each element in the set of matched elements. If a selector is provided, it retrieves the next sibling only if it matches that selector.
* `jQuery.prev([Selector])` : Get the immediately preceding sibling of each element in the set of matched elements, optionally filtered by a selector.

* `jQuery.nextAll([Selector])` : Get all following siblings of each element in the set of matched elements, optionally filtered by a selector.
* `jQuery.prevAll([Selector])` : Get all preceding siblings of each element in the set of matched elements, optionally filtered by a selector.
* `jQuery.siblings([Selector])` : Get the siblings of each element in the set of matched elements, optionally filtered by a selector.

* `jQuery.nextUntil([Selector|Element|jQuery])` : Get all following siblings of each element up to but not including the element matched by the selector, DOM node, or jQuery object passed.
* `jQuery.prevUntil([Selector|Element|jQuery])` : Get all preceding siblings of each element up to but not including the element matched by the selector, DOM node, or jQuery object.

[CodePen example](http://codepen.io/tonai/pen/LVrGYM).

### Navigating into the DOM - parents

* `jQuery.parent([Selector])` : Get the parent of each element in the current set of matched elements, optionally filtered by a selector.
* `jQuery.parents([Selector])` : Get the ancestors of each element in the current set of matched elements, optionally filtered by a selector.
* `jQuery.closest([Selector|Element|jQuery])` : For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
* `jQuery.parentsUntil([Selector|Element|jQuery])` : Get the ancestors of each element in the current set of matched elements, up to but not including the element matched by the selector, DOM node, or jQuery object.

* `jQuery.offsetParent()` : Get the closest ancestor element that is positioned.

[CodePen example](http://codepen.io/tonai/pen/jPKWEB).

### Reducing the set

* `jQuery.eq(index)` : Reduce the set of matched elements to the one at the specified index. Index can be negative.
* `jQuery.get(index)` : Retrieve the DOM elements matched by the jQuery object. Same as `[index]`.
* `jQuery.first()` : Reduce the set of matched elements to the first in the set. Same as `.eq(0)`.
* `jQuery.last()` : Reduce the set of matched elements to the final one in the set. Same as `.eq(-1)`.

* `jQuery.filter([Selector|Element|jQuery|Function])` : Reduce the set of matched elements to those that match the selector or pass the function’s test.
* `jQuery.not([Selector|jQuery|Function])` : Remove elements from the set of matched elements.
* `jQuery.has([Selector|Element])` : Reduce the set of matched elements to those that have a descendant that matches the selector or DOM element.
* `jQuery.slice(start [, end])` : Reduce the set of matched elements to a subset specified by a range of indices.

[CodePen example](http://codepen.io/tonai/pen/yNEeyo).

### Adding elements into the set

* `jQuery.add([Selector|Element|jQuery|htmlString])` : Create a new jQuery object with elements added to the set of matched elements.

[CodePen example](http://codepen.io/tonai/pen/GJGoJR).

### Using `end` and `addBack`

Because most of jQuery methods returns a jQuery object you can chain methods one behind the other.

Example :
```JavaScript
jQuery('html').children('body').find('h1');
```

The `jQuery.end()` method ends the most recent filtering operation in the current chain and return the set of matched elements to its previous state.

Example :
```JavaScript
var $el;
$el = jQuery('html');
console.log($el); // Returns HTML Element
$el = $el.children('body');
console.log($el); // Returns BODY Element
$el = $el.find('h1');
console.log($el); // Returns H1 Element
$el = $el.end();
console.log($el); // Returns BODY Element
$el = $el.end();
console.log($el); // Returns HTML Element
```

The `jQuery.addBack([Selector])` method adds the previous set of elements on the stack to the current set, optionally filtered by a selector.

```JavaScript
var $el;
$el = jQuery('html');
console.log($el); // Returns HTML Element
$el = $el.children('body');
console.log($el); // Returns BODY Element
$el = $el.addBack();
console.log($el); // Returns HTML and BODY Element
```

[CodePen example](http://codepen.io/tonai/pen/YXvwXo).

### Other

* `jQuery.is([Selector|Element|jQuery|Function])` : Check the current matched set of elements against a selector, element, or jQuery object and return true if at least one of these elements matches the given arguments.
* `jQuery.index([Selector|Element|jQuery])` : Search for a given element from among the matched elements.

[CodePen example](http://codepen.io/tonai/pen/waXMzz)

## jQuery AJAX

`jQuery.ajax()`

The following methods are `jQuery.ajax()` shorthand methods :
* `jQuery.get()`
* `jQuery.getJSON()`
* `jQuery.getScript()`
* `jQuery.post()`
* `jQuery.load()`

## jQuery Attributes

`jQuery.addClass()`
`jQuery.hasClass()`
`jQuery.removeClass()`
`jQuery.toggleClass()`

`jQuery.attr()`
`jQuery.removeAttr()`

`jQuery.prop()`
`jQuery.removeProp()`

`jQuery.val()`

## jQuery CSS

`jQuery.css()`

`jQuery.height()`
`jQuery.width()`
`jQuery.innerHeight()`
`jQuery.innerWidth()`
`jQuery.outerHeight()`
`jQuery.outerWidth()`

`jQuery.offset()`
`jQuery.position()`

`jQuery.scrollLeft()`
`jQuery.scrollTop()`

## jQuery Effects

`jQuery.animate()`
`jQuery.delay()`
`jQuery.stop()`

`jQuery.fadeIn()`
`jQuery.fadeOut()`
`jQuery.fadeTo()`
`jQuery.fadeToggle()`

`jQuery.hide()`
`jQuery.show()`
`jQuery.toggle()`

`jQuery.slideIn()`
`jQuery.slideOut()`
`jQuery.slideToggle()`

## jQuery Events

`jQuery.on()`
`jQuery.off()`
`jQuery.trigger()`
`jQuery.triggerHandler()`

The following methods are `jQuery.on()` shorthand methods :
* `jQuery.click()`
* `jQuery.mousedown()`
* ...etc.

## jQuery DOM Insertion

`jQuery.html()`
`jQuery.text()`

`jQuery.append()`
`jQuery.appendTo()`
`jQuery.prepend()`
`jQuery.prependTo()`

`jQuery.after()`
`jQuery.before()`
`jQuery.insertAfter()`
`jQuery.insertBefore()`

`jQuery.detach()`
`jQuery.empty()`
`jQuery.remove()`

## jQuery miscellaneous

`jQuery.data()`
`jQuery.removeData()`

`jQuery.each()`
`jQuery.map()`

`jQuery.extend()`

`jQuery.inArray()`
`jQuery.isArray()`

`jQuery.proxy()`

`jQuery.trim()`

## References

* [jQuery API](http://api.jquery.com/)
