# DOM and events

## Foreword

You can use the navigator's debug console (F12) to try the above examples yourself.

Presentation time needed : 30min

## DOM

DOM is for Document Object Modeland provides a representation of the document as a structured group of nodes and objects that have properties and methods.

### Getting a DOM element

You can use the following methods that are accessible through the `Document` object.

Returns only one DOM element (`Element`) :
* `Document.getElementById()`
* `Document.querySelector()`

Returns a collection of DOM elements (`NodeList`) :
* `Document.getElementsByTagName()`
* `Document.getElementsByClassName()` (> IE8)
* `Document.querySelectorAll()` (> IE8 to be correct)
* `Document.getElementsByName()` (> IE9 to be correct)

Example in this page :
```JavaScript
document.getElementById('readme');
document.getElementsByTagName('body');
document.getElementsByClassName('anchor');
document.getElementsByName('q');
document.querySelector('#readme .anchor');
document.querySelectorAll('#readme .anchor');
```

### Navigate into the DOM

When selecting an `Element` you can use the above mehods, except `document.getElementById` and `document.getElementsByName`, to "navigate" deeper into the DOM.

Example in this page :
```JavaScript
var body = document.getElementsByTagName('body')[0];
body.getElementsByTagName('h1');
body.getElementsByClassName('anchor');
body.querySelector('#readme .anchor');
body.querySelectorAll('#readme .anchor');
```

You can also use the following propoerties :
* `Element.parentNode`
* `Element.firstChild`
* `Element.firstElementChild`
* `Element.lastChild`
* `Element.lastElementChild`
* `Element.children`
* `Element.childNodes`
* `Element.nextSibling`
* `Element.nextElementSibling`
* `Element.previousSibling`
* `Element.previousElementSibling`

```JavaScript
var readme = document.getElementById('readme');
readme.parentNode;
readme.firstChild;
readme.firstElementChild;
readme.lastChild;
readme.lastElementChild;
readme.children;
readme.childNodes;
readme.nextSibling;
readme.nextElementSibling;
readme.previousSibling;
readme.previousElementSibling;
```

### Creating a DOM element

You can create a DOM element by using the `Document.createElement()` method.

If you want to create a text, use the `Document.createTextNode()` method.

Then you can add your element in the document by using one of the following methods :
* `Node.appendChild()`
* `Node.insertBefore()`

```JavaScript
var html = document.getElementsByTagName('html')[0];
var body = document.getElementsByTagName('body')[0];
var span = document.createElement('span');
var text = document.createTextNode('lorem ipsum...');
span.appendChild(text);
html.insertBefore(span, body);
```

### Removing

You can remove a DOM element by using one of the following methods :
* `Node.removeChild()`
* `Node.replaceChild()`

```JavaScript
html.removeChild(span);
```

### Attributes

You can also work on attributes with following methods :
* Create / Update : `Element.setAttribute()`
* Read : `Element.getAttribute()`
* Delete : `Element.removeAttribute()`

```JavaScript
var body = document.getElementsByTagName('body')[0];
body.getAttribute('id');
body.setAttribute('id', 'body');
body.getAttribute('id');
body.removeAttribute('id');
body.getAttribute('id');
```

### innerHTML

You can also use the property `Element.innerHTML` to get or set the HTML content of an element.

```JavaScript
var title = document.getElementsByTagName('h1')[1];
title.innerHTML;
title.innerHTML = '<span style="color: red;">Page title<span>';
```

But be careful when using this method, because it can lead to XSS security vulnerability.

## Events

### Binding an event

Events are binded to a DOM element



## References

* [Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
* [Document](https://developer.mozilla.org/docs/Web/API/document)
* [Node](https://developer.mozilla.org/docs/Web/API/Node)
* [Element](https://developer.mozilla.org/docs/Web/API/element)
* [DOM Core](http://quirksmode.org/dom/core/)
