# jQuery DOM manipulation

## Foreword

This presentation is not a complete explanation of all the jQuery API as some usages are intentionally not explaned.  
This presentation make an easier comparison of the different available jQuery methods.

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

### `jQuery(Function)`

This syntax is a shortcut for `jQuery(document).ready(Function)`.

### `jQuery(HtmlString)`

jQuery attempts to create new DOM elements as described by the HTML string.
Then a jQuery object is created and returned that refers to these elements

### `jQuery(Selector [, context])`

This is equivalent to the native `querySelectorAll` function that we have already seen [here](../01_Bases/03_DOM-and-events.md#getting-a-dom-element), but returns a jQuery object.

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

* `.children([Selector])` : Get the children of each element in the set of matched elements, optionally filtered by a selector.
* `.find([Selector|Element|jQuery])` : Get the descendants of each element in the current set of matched elements, filtered by a selector, jQuery object, or element.

[CodePen example](http://codepen.io/tonai/pen/EjRVGQ).

### Navigating into the DOM - siblings

* `.next([Selector])` : Get the immediately following sibling of each element in the set of matched elements. If a selector is provided, it retrieves the next sibling only if it matches that selector.
* `.prev([Selector])` : Get the immediately preceding sibling of each element in the set of matched elements, optionally filtered by a selector.

* `.nextAll([Selector])` : Get all following siblings of each element in the set of matched elements, optionally filtered by a selector.
* `.prevAll([Selector])` : Get all preceding siblings of each element in the set of matched elements, optionally filtered by a selector.
* `.siblings([Selector])` : Get the siblings of each element in the set of matched elements, optionally filtered by a selector.

* `.nextUntil([Selector|Element|jQuery])` : Get all following siblings of each element up to but not including the element matched by the selector, DOM node, or jQuery object passed.
* `.prevUntil([Selector|Element|jQuery])` : Get all preceding siblings of each element up to but not including the element matched by the selector, DOM node, or jQuery object.

[CodePen example](http://codepen.io/tonai/pen/LVrGYM).

### Navigating into the DOM - parents

* `.parent([Selector])` : Get the parent of each element in the current set of matched elements, optionally filtered by a selector.
* `.parents([Selector])` : Get the ancestors of each element in the current set of matched elements, optionally filtered by a selector.
* `.closest(Selector|Element|jQuery)` : For each element in the set, get the first element that matches the selector by testing **the element itself** and traversing up through its ancestors in the DOM tree.
* `.parentsUntil([Selector|Element|jQuery])` : Get the ancestors of each element in the current set of matched elements, up to but not including the element matched by the selector, DOM node, or jQuery object.

* `.offsetParent()` : Get the closest ancestor element that is positioned.

[CodePen example](http://codepen.io/tonai/pen/jPKWEB).

### Reducing the set

* `.eq(index)` : Reduce the set of matched elements to the one at the specified index. Index can be negative.
* `.get(index)` : Retrieve the DOM elements matched by the jQuery object. Same as `[index]`.
* `.first()` : Reduce the set of matched elements to the first in the set. Same as `.eq(0)`.
* `.last()` : Reduce the set of matched elements to the final one in the set. Same as `.eq(-1)`.

* `.filter(Selector|Element|jQuery|Function)` : Reduce the set of matched elements to those that match the selector or pass the function’s test.
* `.not(Selector|jQuery|Function)` : Remove elements from the set of matched elements.
* `.has(Selector|Element)` : Reduce the set of matched elements to those that have a descendant that matches the selector or DOM element.
* `.slice(start [, end])` : Reduce the set of matched elements to a subset specified by a range of indices.

[CodePen example](http://codepen.io/tonai/pen/yNEeyo).

### Adding elements into the set

* `.add(Selector|Element|jQuery|HtmlString)` : Create a new jQuery object with elements added to the set of matched elements.

[CodePen example](http://codepen.io/tonai/pen/GJGoJR).

### Using `end` and `addBack`

Because most of jQuery methods returns a jQuery object you can chain methods one behind the other.

Example :
```JavaScript
jQuery('html').children('body').find('h1');
```

The `.end()` method ends the most recent filtering operation in the current chain and return the set of matched elements to its previous state.

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

The `.addBack([Selector])` method adds the previous set of elements on the stack to the current set, optionally filtered by a selector.

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

* `.is(Selector|Element|jQuery|Function)` : Check the current matched set of elements against a selector, element, or jQuery object and return true if at least one of these elements matches the given arguments.
* `.index([Selector|Element|jQuery])` : Search for a given element from among the matched elements.

[CodePen example](http://codepen.io/tonai/pen/waXMzz)

## jQuery manipulation

### jQuery DOM insertion / shifting, inside

* `.appendTo(Selector|Element|Array|jQuery|HtmlString)` : Insert every element in the set of matched elements to the end of the target.
* `.prependTo(Selector|Element|Array|jQuery|HtmlString)` : Insert every element in the set of matched elements to the beginning of the target.
* `.append(Element|Array|jQuery|HtmlString)` : Insert content, specified by the parameter, to the end of each element in the set of matched elements.
* `.prepend(Element|Array|jQuery|HtmlString)` : Insert content, specified by the parameter, to the beginning of each element in the set of matched elements.

[CodePen example](http://codepen.io/tonai/pen/VLdBRV)

### jQuery DOM insertion / shifting, outside

* `.insertAfter(Selector|Element|Array|jQuery|HtmlString)` : Insert every element in the set of matched elements after the target.
* `.insertBefore(Selector|Element|Array|jQuery|HtmlString)` : Insert every element in the set of matched elements before the target.
* `.after(Element|Array|jQuery|HtmlString)` : Insert content, specified by the parameter, after each element in the set of matched elements.
* `.before(Element|Array|jQuery|HtmlString)` : Insert content, specified by the parameter, before each element in the set of matched elements.

[CodePen example](http://codepen.io/tonai/pen/ZGRjdy)

### jQuery DOM removal

* `.empty()` : Remove all child nodes of the set of matched elements from the DOM.
* `.detach([Selector])` : Remove the set of matched elements from the DOM, optionally filtered by a selector.
* `.remove([Selector])` : Remove the set of matched elements from the DOM, optionally filtered by a selector. In addition all bound events and jQuery data associated with the elements are removed.

[CodePen example](http://codepen.io/tonai/pen/xGzaxz)

### jQuery DOM replacement

* `.replaceAll(Selector|Element|Array|jQuery)` : Replace each target element with the set of matched elements.
* `.replaceWith(lement|Array|jQuery|HtmlString)` : Replace each element in the set of matched elements with the provided new content and return the set of elements that was removed.

* `.html([HtmlString])` : Get the HTML contents of the **first** element in the set of matched elements or set the HTML contents of every matched element.
* `.text([String])` : Get the combined text contents of each element in the set of matched elements, including their descendants, or set the text contents of the matched elements.

**Note** : when using the `.html()` method, all DOM elements that are replaced are cleaned up the same way as when using the `.remove([Selector])` method.

[CodePen example](http://codepen.io/tonai/pen/jPKvby)

## References

* [jQuery API](http://api.jquery.com/)
