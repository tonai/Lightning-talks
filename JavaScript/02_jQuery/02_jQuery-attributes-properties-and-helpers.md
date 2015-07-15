# jQuery attributes, properties and helpers

## Foreword

This presentation is not a complete explanation of all the jQuery API as some usages are intentionally not explaned.  
This presentation make an easier comparison of the different available jQuery methods.

Presentation time needed : 30min

## jQuery Attributes

* `.addClass(String)` : Adds the specified class(es) to each element in the set of matched elements.
* `.hasClass(String)` : Determine whether any of the matched elements are assigned the given class.
* `.removeClass([String])` : Remove a single class, multiple classes, or all classes from each element in the set of matched elements.
* `.toggleClass(String [, Boolean])` : Add or remove one or more classes from each element in the set of matched elements, depending on either the class’s presence or the value of the state argument.

* `.attr(String|Object [, String|Number])` : Get the value of an attribute **for the first element** in the set of matched elements or set one or more attributes for every matched element.
* `.removeAttr(String)` : Remove an attribute from each element in the set of matched elements.

* `.prop(String|Object [, Mixed])` : Get the value of a property **for the first element** in the set of matched elements or set one or more properties for every matched element.
* `.removeProp(String)` : Remove a property for the set of matched elements.

* `.val([String|Number|Array])` : Get the current value **of the first element** in the set of matched elements or set the value of every matched element.

## jQuery CSS

* `.css(String|Object [, String|Number])` : Get the value of a computed style property **for the first element** in the set of matched elements or set one or more CSS properties for every matched element.

* `.height([String|Number])` : Get the current computed height **for the first element** in the set of matched elements or set the height of every matched element.
* `.width(String|Number])` : Get the current computed width **for the first element** in the set of matched elements or set the width of every matched element.
* `.innerHeight([String|Number])` : Get the current computed inner height (including padding but not border) **for the first element** in the set of matched elements or set the inner height of every matched element.
* `.innerWidth([String|Number])` : Get the current computed inner width (including padding but not border) **for the first element** in the set of matched elements or set the inner width of every matched element.
* `.outerHeight([Boolean|String|Number])` : Get the current computed height **for the first element** in the set of matched elements, including padding, border, and optionally margin. Returns a number (without "px") representation of the value or null if called on an empty set of elements.
* `.outerWidth([Boolean|String|Number])` : Get the current computed width **for the first element** in the set of matched elements, including padding and border, and optionally margin. Returns a number (without "px") representation of the value or null if called on an empty set of elements.

* `.offset([Object])` : Get the current coordinates of the first element, or set the coordinates of every element, in the set of matched elements, relative to the document.
* `.position()` : Get the current coordinates of the first element in the set of matched elements, relative to the offset parent.

* `.scrollLeft([Number])` : Get the current horizontal position of the scroll bar for the first element in the set of matched elements or set the horizontal position of the scroll bar for every matched element.
* `.scrollTop([Number])` : Get the current vertical position of the scroll bar for the first element in the set of matched elements or set the vertical position of the scroll bar for every matched element.

## jQuery helpers

* `jQuery.data(Element [, String|Object] [, Mixed])` : Store arbitrary data associated with the specified element and/or return the value that was set.
* `.data([String|Object] [, Mixed])` : Store arbitrary data associated with the matched elements or return the value at the named data store for the first element in the set of matched elements.

* `jQuery.removeData(Element [, String])` : Remove a previously-stored piece of data.
* `.removeData([String])` : Remove a previously-stored piece of data.

* `jQuery.each(Object|Array, Function)` : A generic iterator function, which can be used to seamlessly iterate over both objects and arrays. Arrays and array-like objects with a length property (such as a function’s arguments object) are iterated by numeric index, from 0 to length-1. Other objects are iterated via their named properties.
* `.each(Function)` : Iterate over a jQuery object, executing a function for each matched element.

* `jQuery.map(Object|Array, Function)` : Translate all items in an array or object to new array of items.
* `.map(Function)` : Pass each element in the current matched set through a function, producing a new jQuery object containing the return values.

* `jQuery.extend([Boolean, ] Object [, Object] [, Object] [, ...])` : Merge the contents of two or more objects together into the first object.

* `jQuery.inArray(Mixed, Array [, Number])` : Search for a specified value within an array and return its index (or -1 if not found).
* `jQuery.isArray(Mixed)` : Determine whether the argument is an array.

* `jQuery.proxy(Function, Object [, Mixed] [, Mixed] [, ...])` : Takes a function and returns a new one that will always have a particular context.

* `jQuery.trim(String)` : Remove the whitespace from the beginning and end of a string.
* `jQuery.unique(Array)` : Sorts an array of DOM elements, in place, with the duplicates removed. Note that this only works on arrays of DOM elements, not strings or numbers.

## References

* [jQuery API](http://api.jquery.com/)
