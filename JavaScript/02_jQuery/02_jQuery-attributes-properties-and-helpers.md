# jQuery attributes, properties and helpers

## Foreword

This presentation is not a complete explanation of all the jQuery API as some usages are intentionally not explaned.  
This presentation make an easier comparison of the different available jQuery methods.

Presentation time needed : 30min

## jQuery attributes

### jQuery attributes and classes

* `.attr(String|Object [, String|Number])` : Get the value of an attribute **for the first element** in the set of matched elements or set one or more attributes for every matched element.
* `.removeAttr(String)` : Remove an attribute from each element in the set of matched elements.

* `.addClass(String)` : Adds the specified class(es) to each element in the set of matched elements.
* `.hasClass(String)` : Determine whether any of the matched elements are assigned the given class.
* `.removeClass([String])` : Remove a single class, multiple classes, or all classes from each element in the set of matched elements.
* `.toggleClass(String [, Boolean])` : Add or remove one or more classes from each element in the set of matched elements, depending on either the class’s presence or the value of the state argument.

[CodePen example](http://codepen.io/tonai/pen/mJKaXJ).

### jQuery properties and values

* `.prop(String|Object [, Mixed])` : Get the value of a property **for the first element** in the set of matched elements or set one or more properties for every matched element.
* `.removeProp(String)` : Remove a property for the set of matched elements.

* `.val([String|Number|Array])` : Get the current value **of the first element** in the set of matched elements or set the value of every matched element.

[CodePen example](http://codepen.io/tonai/pen/waXREJ).

### jQuery data

* `jQuery.data(Element [, String|Object] [, Mixed])` : Store arbitrary data associated with the specified element and/or return the value that was set.
* `.data([String|Object] [, Mixed])` : Store arbitrary data associated with the matched elements or return the value at the named data store **for the first element** in the set of matched elements.

* `jQuery.removeData(Element [, String])` : Remove a previously-stored piece of data.
* `.removeData([String])` : Remove a previously-stored piece of data.

[CodePen example](http://codepen.io/tonai/pen/doKxvr).

## jQuery CSS

* `.css(String|Object [, String|Number])` : Get the value of a computed style property **for the first element** in the set of matched elements or set one or more CSS properties for every matched element.

* `.height([String|Number])` : Get the current computed height **for the first element** in the set of matched elements or set the height of every matched element.
* `.width(String|Number])` : Get the current computed width **for the first element** in the set of matched elements or set the width of every matched element.
* `.innerHeight([String|Number])` : Get the current computed inner height (including padding but not border) **for the first element** in the set of matched elements or set the inner height of every matched element.
* `.innerWidth([String|Number])` : Get the current computed inner width (including padding but not border) **for the first element** in the set of matched elements or set the inner width of every matched element.
* `.outerHeight([Boolean|String|Number])` : Get the current computed height **for the first element** in the set of matched elements, including padding, border, and optionally margin. Returns a number (without "px") representation of the value or null if called on an empty set of elements.
* `.outerWidth([Boolean|String|Number])` : Get the current computed width **for the first element** in the set of matched elements, including padding and border, and optionally margin. Returns a number (without "px") representation of the value or null if called on an empty set of elements.

* `.offset([Object])` : Get the current coordinates **of the first element**, or set the coordinates of every element, in the set of matched elements, relative to the document.
* `.position()` : Get the current coordinates **of the first element** in the set of matched elements, relative to the offset parent.

* `.scrollLeft([Number])` : Get the current horizontal position of the scroll bar **for the first element** in the set of matched elements or set the horizontal position of the scroll bar for every matched element.
* `.scrollTop([Number])` : Get the current vertical position of the scroll bar **for the first element** in the set of matched elements or set the vertical position of the scroll bar for every matched element.

[CodePen example](http://codepen.io/tonai/pen/rVKogQ).

## jQuery helpers

### jQuery object and array helpers

* `.each(Function)` : Iterate over a jQuery object, executing a function for each matched element.
* `jQuery.each(Object|Array, Function)` : A generic iterator function, which can be used to seamlessly iterate over both objects and arrays. Arrays and array-like objects with a length property (such as a function’s arguments object) are iterated by numeric index, from 0 to length-1. Other objects are iterated via their named properties.

```JavaScript
var array = [
  'value 1',
  [],
  function(){}
];
var object = {
  prop1: 'value 1',
  prop2: [],
  prop3: function(){}
};

// Array :
$.each(array, function(key, value){
  console.log(key);
  console.log(value);
});

// Object :
$.each(object, function(key, value){
  console.log(key);
  console.log(value);
});
```

* `.map(Function)` : Pass each element in the current matched set through a function, producing a new jQuery object containing the return values.
* `jQuery.map(Object|Array, Function)` : Translate all items in an array or object to new array of items.

```JavaScript
var result = $.map(array, function(value, key){
  return value.toString();
});
result;
```

* `jQuery.inArray(Mixed, Array [, Number])` : Search for a specified value within an array and return its index (or -1 if not found).

```JavaScript
$.inArray('value 1', array);
$.inArray('value 3', array);
```

* `jQuery.isArray(Mixed)` : Determine whether the argument is an array.

```JavaScript
$.isArray(array);
$.isArray(object);
```

* `jQuery.unique(Array)` : Sorts an array of DOM elements, in place, with the duplicates removed. Note that this only works on arrays of DOM elements, not strings or numbers.

```JavaScript
$.unique(['item 1', 'item 2', 'item 1']);
```

[CodePen example](http://codepen.io/tonai/pen/xGzvLy)

### jQuery other helpers

* `jQuery.trim(String)` : Remove the whitespace from the beginning and end of a string.

```JavaScript
var string = "\n\n\t\t\t" + 'space          ' + "\n\n";
$.trim(string);
```

* `jQuery.extend([Boolean, ] Object [, Object] [, Object] [, ...])` : Merge the contents of two or more objects together into the first object.

```JavaScript
var obj1 = {
  prop1: 'value 1',
  prop2: string,
  prop3: function(){}
};
var obj2 = {
  prop3: 'value 3'
};
var obj3 = {
  prop2: 'value 2'
};
$.extend({}, obj1, obj2, obj3);
```

* `jQuery.proxy(Function, Object [, Mixed] [, Mixed] [, ...])` : Takes a function and returns a new one that will always have a particular context.

```JavaScript
var log = function (param1, param2) {
  'use strict';
  console.log(this);
  console.log(param1);
  console.log(param2);
};
log('callValue');
func = $.proxy(log, emptyObj);
func('callValue');
// Same as : func = log.bind(emptyObj);
func = $.proxy(log, emptyObj, 'proxyValue');
func('callValue');
```

[CodePen example](http://codepen.io/tonai/pen/bdKXKg)

## References

* [jQuery API](http://api.jquery.com/)
