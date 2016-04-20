# Miscellaneous

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Global properties](#global-properties)
  - [`navigator`](#navigator)
  - [`location`](#location)
  - [`innerHeight` / `innerWidth`](#innerheight--innerwidth)
  - [`history`](#history)
  - [Exercise : create an pager with history manipulation](#exercise--create-an-pager-with-history-manipulation)
- [Global methods](#global-methods)
  - [`print`](#print)
  - [`alert` / `confirm` / `prompt`](#alert--confirm--prompt)
  - [`open`](#open)
  - [`setTimeout` / `clearTimeout`](#settimeout--cleartimeout)
  - [`setInterval` / `clearInterval`](#setinterval--clearinterval)
  - [`requestAnimationFrame` / `cancelAnimationFrame`](#requestanimationframe--cancelanimationframe)
  - [Exercice : create an animation](#exercice--create-an-animation)
- [Global objects](#global-objects)
  - [`Math`](#math)
  - [`JSON`](#json)
  - [`XMLHttpRequest`](#xmlhttprequest)
- [References](#references)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Global properties

### `navigator`

Used to get useful information about the navigator like its user agent.

Example :
```javascript
window.navigator.userAgent.match(/iPad|iPhone/i);
```

### `location`

Contains information about the current page URL.  
You can use it to make JavaScript redirection.

Example :
```javascript
window.location.href = 'https://github.com/tonai';
```

### `innerHeight` / `innerWidth`

Get the size of the window.

Example :
```javascript
window.innerWidth+ 'x' + window.innerHeight;
```

### `history`

Provides an interface for manipulating the browser session history.

Example :
```javascript
window.onpopstate = function(event) {
  console.log('location: ' + document.location + ', state: ' + JSON.stringify(event.state));
};

history.pushState({page: 1}, "title 1", "?page=1");
history.pushState({page: 2}, "title 2", "?page=2");
history.replaceState({page: 3}, "title 3", "?page=3");

window.history.back();
window.history.go(-1);
window.history.forward();
window.history.go(1);
```

And you can listen to history changes when a user, for example use the back button in the navigator, with the `onpopstate` event.

### Exercise : create an pager with history manipulation

Create a function that will update the list of displayed items depending on the current page.  
This function will then update the history (using the hash to represent the current page).

HTML :
```html
<ul class="list"></ul>
<div class="pager">
  <button type="button" class="prev">Previous</button>
  <button type="button" class="next">Next</button>
</div>
```

Initialization of items in JS :
```javascript
var start = 1;
var total = 12;
var limit = 3;
var items = [];
for (var i = start; i < start + total; i++) {
  let li = document.createElement('li');
  li.appendChild(document.createTextNode('item' + i));
  items.push(li);
}
```

&nbsp;

&nbsp;

&nbsp;

Initialization :
```javascript
var list = document.getElementsByClassName('list')[0];
var prev = document.getElementsByClassName('prev')[0];
var next = document.getElementsByClassName('next')[0];
var currentPage = location.hash !== '' ? Number(location.hash.substr(1)): 0;
render();
```

&nbsp;

&nbsp;

&nbsp;

Bind events :
```javascript
prev.addEventListener('click', function(event){
  event.preventDefault();
  if (currentPage > 0) {
    currentPage--;
    render();
  }
});
next.addEventListener('click', function(event){
  event.preventDefault();
  if (currentPage < Math.ceil(total / limit) - 1) {
    currentPage++;
    render();
  }
});
window.addEventListener('popstate', function(event){
  if (event.state) {
    currentPage = event.state.page;
    this.render(true);
  }
});
```

&nbsp;

&nbsp;

&nbsp;
Render function :
```javascript
function render(skipHistory) {
  // Clear list.
  list.innerHTML = '';

  // Update list.
  for (var j = currentPage * limit; j < Math.min((currentPage + 1) * limit, total); j++) {
    list.appendChild(items[j]);
  }

  // Update history.
  !skipHistory && history.pushState({page: currentPage}, '', '#' + currentPage);
}
```

## Global methods

### `print`

Opens the Print Dialog to print the current document.

Example :
```javascript
window.print();
```

### `alert` / `confirm` / `prompt`

Built-in modal dialog.

Example :
```javascript
window.alert('foo');
window.confirm('bar ?');
window.prompt('baz : ');
```

### `open`

Loads a resource.

Example :
```javascript
windowObjectReference = window.open(
  'https://github.com',
  'tonai',
  'resizable,scrollbars,status'
);
windowObjectReference.location.href = 'https://github.com/tonai';
```

![Firefox Toolbars Illustration](https://developer.mozilla.org/@api/deki/files/210/=FirefoxChromeToolbarsDescription7a.gif)

### `setTimeout` / `clearTimeout`

`setTimeout` is used to call a function or executes a code snippet after a specified delay.

Example :
```javascript
var start = new Date().getTime();
window.setTimeout(function(arg){
  console.log(arg, new Date().getTime() - start);
}, 1000, 'foo');
window.setTimeout(function(...args){
  console.log(args, new Date().getTime() - start);
}, 500, 'bar', 'baz');
```

if `clearTimeout` is called before the callback is executed, the execution will be canceled.

Example :
```javascript
var start = new Date().getTime();
var timeout = window.setTimeout(function(){
  console.log(new Date().getTime() - start);
}, 1000);
window.setTimeout(function(){
  console.log(new Date().getTime() - start);
  window.clearTimeout(timeout);
}, 500);
```

### `setInterval` / `clearInterval`

Like `setTimeout`, but the callback is executed repeatedly.

Example :
```javascript
var start = new Date().getTime();
var timeout = window.setInterval(function(arg){
  console.log(arg, new Date().getTime() - start);
}, 1000, 'foo');
```

Stop it with `clearInterval`.

Example :
```javascript
clearInterval(timeout);
```

### `requestAnimationFrame` / `cancelAnimationFrame`

The `requestAnimationFrame` method tells the browser that you wish to perform an animation and requests that the browser call a specified function to update an animation before the next repaint.

Example
```javascript
var start = performance.now();
window.requestAnimationFrame(function(time){
  console.log(time - start);
});
```

`cancelAnimationFrame` works like `clearTimeout` for the `requestAnimationFrame` method.

### Exercice : create an animation

Animate the github icon to move like a ping pong ball across the page.

Initialize default values and styles :
```javascript
var icon = document.getElementsByClassName('header-logo-wordmark').length?
  document.getElementsByClassName('header-logo-wordmark')[0]:
  document.getElementsByClassName('header-logo-invertocat')[0];
var offsetLeft = icon.offsetLeft;
var offsetTop = icon.offsetTop;
var horizontalSpeed = 200;
var verticalSpeed = 250;

icon.style.position = 'absolute';
icon.style.zIndex = 999;
```

Animation variables :
```javascript
var position = {
  x: offsetLeft,
  y: offsetTop
}
var speed = {
  h: horizontalSpeed,
  v: verticalSpeed
}; // px per second
var previousTime;

```

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

Solution :
```javascript
function animate(time) {
  if (!time) {
    time = performance.now();
  }

  if (previousTime) {
    position.x += speed.h * (time - previousTime) / 1000;
    position.y += speed.v * (time - previousTime) / 1000;
    if (position.x < window.scrollX) {
      speed.h = horizontalSpeed;
    } else if (position.x > window.scrollX + window.innerWidth - icon.offsetWidth) {
      speed.h = -horizontalSpeed;
    }
    if (position.y < window.scrollY) {
      speed.v = verticalSpeed;
    } else if (position.y > window.scrollY + window.innerHeight - icon.offsetHeight) {
      speed.v = -verticalSpeed;
    }
  }

  previousTime = time;
  icon.style.left = position.x + 'px';
  icon.style.top = position.y + 'px';

  window.requestAnimationFrame(animate);
}
```

Result :
```javascript
animate();
```

## Global objects

### `Math`

Collection of static properties and methods for math.

Example :
```javascript
Math.PI;
Math.min(2, 3, 1);
Math.max(2, 3, 1);
Math.floor(2.53);
Math.round(2.53);
```

### `JSON`

The JSON object contains methods for parsing JSON and converting (serializing) values to JSON.

Example :
```javascript
var object = {
  title: 'List of items',
  created: new Date(),
  items: [
    {
      title: 'Item 1',
      length: 12
    },
    {
      title: 'Item 2',
      length: 42
    }
  ]
};
```

Result :
```javascript
var string = JSON.stringify(object);
var object = JSON.parse(string);
console.log(string, object);
```

### `XMLHttpRequest`

You can use this object (`XMLHttpRequest`) to make AJAX call.

Add a listener to the `readystatechange` event and get the `responseText` content when the `readyState` state has reach `4` (done).

Example : 
```javascript
function makeAjaxCall (url) {
  var req = new XMLHttpRequest();
  req.open('GET', url, true);
  req.onreadystatechange = function () {
    if (req.readyState == 4) {
      if(req.status == 200) {
        console.log(req.responseText);
      } else {
        console.log("An error happened.\n");
      }
    }
  };
  req.send();
}
```

Result :
```javascript
makeAjaxCall('https://github.com/tonai');
```

## References

* [window](https://developer.mozilla.org/fr/docs/Web/API/Window)
* [WindowEventHandlers.onpopstate](https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate)
* [Math](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)
* [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)
* [XMLHttpRequest](https://developer.mozilla.org/fr/docs/Web/API/XMLHttpRequest)

