# jQuery events and asynchronous methods

## Foreword

This presentation is not a complete explanation of all the jQuery API as some usages are intentionally not explaned.  
This presentation make an easier comparison of the different available jQuery methods.

Presentation time needed : 30min

## jQuery events

* `.on(String [, String] [, Mixed], Function)` : Attach an event handler function for one or more events to the selected elements.
* `.off([String] [, String], Function)` : Remove an event handler.

* `.trigger([String|Event] [, Array|Object])` : Execute all handlers and behaviors attached to the matched elements for the given event type.
* `.triggerHandler([String|Event] [, Array|Object])` : Execute all handlers attached to an element for an event.

**Note** : The `.trigger()` and `.triggerHandler()` do not use the native `dispatchEvent` function we have seen [here](../01_Bases/03_DOM-and-events.md).  
It uses a jQuery internal mechanism and thus the 2 jQuery functions can only trigger event handlers that have been bound with jQuery methods.

[CodePen example](http://codepen.io/tonai/pen/LVBYyz).

The following methods are `jQuery.on()` shorthand methods :
* `jQuery.click()`
* `jQuery.mousedown()`
* ...etc.

## jQuery AJAX

* `jQuery.ajax([Object])` OU `jQuery.ajax(String [, Object])` : Perform an asynchronous HTTP (Ajax) request.

JSON example :
```JavaScript
jQuery.ajax({
  url: 'https://api.github.com/orgs/smile-sa/repos',
  data: {
    firstname: 'John',
    lastname: 'Doe'
  },
  method: 'GET',
  dataType: 'json',
  error: function(jqXHR, status, error){
    console.log('error');
  },
  success: function(response, status, jqXHR){
    console.log(response);
  },
  complete: function(jqXHR, status){
    console.log('complete');
  }
});
```

JSONP example :
```JavaScript
jQuery.ajax({
  url: 'https://soutenir.croix-rouge.fr/crossnav',
  dataType : 'jsonp',
  success: function(response){
    console.log(response);
  },
});
```

The following methods are `jQuery.ajax()` shorthand methods :
* `jQuery.get()`
* `jQuery.getJSON()`
* `jQuery.getScript()`
* `jQuery.post()`
* `jQuery.load()`

## jQuery effects

### jQuery slide effect

* `.slideDown(Object)` OU `.slideDown([String|Number] [, String] [, Function])` : Display the matched elements with a sliding motion.
* `.slideUp(Object)` OU `.slideUp([String|Number] [, String] [, Function])` : Hide the matched elements with a sliding motion.
* `.slideToggle(Object)` OU `.slideToggle([String|Number] [, String] [, Function])` : Display or hide the matched elements with a sliding motion.

[CodePen example](http://codepen.io/collection/AVYzwE/).

### jQuery fade effect

* `.fadeIn(Object)` OU `.fadeIn([String|Number] [, String] [, Function])` : Display the matched elements by fading them to opaque.
* `.fadeOut(Object)` OU `.fadeOut([String|Number] [, String] [, Function])` : Hide the matched elements by fading them to transparent.
* `.fadeToggle(Object)` OU `.fadeToggle([String|Number] [, String] [, Function])` : Display or hide the matched element
* `.fadeTo([String|Number] [, Number] [, String] [, Function])` : Adjust the opacity of the matched elements.

[CodePen example](http://codepen.io/tonai/pen/PqBweN).

### jQuery fade and slide effect

* `.hide(Object)` OU `.hide([String|Number] [, String] [, Function])` : Hide the matched elements.
* `.show(Object)` OU `.show([String|Number] [, String] [, Function])` : Display the matched elements.
* `.toggle(Object)` OU `.toggle([String|Number] [, String] [, Function])` OU `.toggle(Boolean)` : Display or hide the matched elements.

[CodePen example](http://codepen.io/tonai/pen/rVraKK).

### jQuery animations

* `.animate(Object, Object)` OU `.animate(Object [, String|Number] [, String] [, Function])` : Perform a custom animation of a set of CSS properties.
* `.delay(Number [, String])` : Set a timer to delay execution of subsequent items in the queue.
* `.stop([String] [, Boolean] [, Boolean])` : Stop the currently-running animation on the matched elements.
s by animating their opacity.

[CodePen example](http://codepen.io/tonai/pen/yNqyxv).

## References

* [jQuery API](http://api.jquery.com/)
