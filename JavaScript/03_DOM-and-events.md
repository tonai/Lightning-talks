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

Example in this page :
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

Example in this page :
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

Example in this page :
```JavaScript
html.removeChild(span);
```

### Attributes

You can also work on attributes with following methods :
* Create / Update : `Element.setAttribute()`
* Read : `Element.getAttribute()`
* Delete : `Element.removeAttribute()`

Example in this page :
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

Example in this page :
```JavaScript
var title = document.getElementsByTagName('h1')[1];
title.innerHTML;
title.innerHTML = '<span style="color: red;">Page title<span>';
```

But be careful when using this method, because it can lead to XSS security vulnerability.

## Events

### Binding an event

Events are binded to a DOM element throught the `Element.addEventListener()` method.

But for Internet Explorer, this method only exists since the 9 version.

For IE8 and below you need to use this code snippet for attaching an event :
```JavaScript
var element = document.getElementsByTagName('h1')[1];
var eventName = 'click';
var callback = function(){
  console.log(this);
};

/* Start snippet */
if (element.addEventListener) {
  element.addEventListener(eventName, callback); 
} else if (element.attachEvent)  {
  element.attachEvent('on' + eventName, callback);
}
/* End snippet */
```

Or you can also use polyfills like this one : [EventListener Polyfill](https://gist.github.com/jonathantneal/3748027)

### Event types

The most commonly used events are listed below :

Mouse interaction :
* click / dblclick
* mouseenter / mouseover
* mouseleave / mouseout
* mousedown
* mousemove
* mouseup

Touch interaction :
* touchstart
* touchmove
* touchend

Keyboard interaction :
* keydown
* keypress
* keyup

Form interaction :
* blur
* focus
* change
* submit

View events :
* resize
* scroll

Flow events
* DOMContentLoaded
* load
* error

[Here](https://developer.mozilla.org/en-US/docs/Web/Events) a complete list of events.

### Event flow

The event flow is divided into 3 steps :
* Capture phase
* Target phase
* Bubble phase

![Graphical representation of an event dispatched in a DOM tree using the DOM event flow](http://www.w3.org/TR/DOM-Level-3-Events/eventflow.svg)

Event listeners registered for the target phase will be handled once the event has reached its target.  
So if you bind an event on a DOM tree's leaf, it will always be triggered during the target phase.

Otherwise the event will be triggered during the bubble phase.
But you can change this behaviour by using the third argument of the `Element.addEventListener()` method to trigger your Event listener during the capture phase :
```JavaScript
var element = document.getElementById('readme');
var eventName = 'click';

element.addEventListener(eventName, function(){
  console.log('bubble phase');
});
element.addEventListener(eventName, function(){
  console.log('capture phase');
}, true);
```

See this [codepen](http://codepen.io/tonai/pen/pJKoEj) for an example.

### Event object




### Trigger / Remove



## References

* [Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
* [Document](https://developer.mozilla.org/docs/Web/API/document)
* [Node](https://developer.mozilla.org/docs/Web/API/Node)
* [Element](https://developer.mozilla.org/docs/Web/API/element)
* [DOM Core](http://quirksmode.org/dom/core/)
* [element.addEventListener](https://developer.mozilla.org/docs/Web/API/EventTarget/addEventListener)
* [Event dispatch and DOM event flow](http://www.w3.org/TR/DOM-Level-3-Events/#event-flow)
