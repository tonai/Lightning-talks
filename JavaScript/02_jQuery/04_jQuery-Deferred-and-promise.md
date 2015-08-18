# jQuery Deferred and promise

## Foreword

This presentation is not a complete explanation of all the jQuery API as some usages are intentionally not explaned.  
This presentation make an easier comparison of the different available jQuery methods.

Presentation time needed : 15min

## The Deferred object

The `Deferred` object is used to control the flow and to chain up synchronous or asynchronous functions.

This object can have 3 different states :
* pending
* resolved
* rejected

### Creating a deferred object.

Create an new instance :
```JavaScript
var deferred = $.Deferred();
```

### State property.

* `deferred.isRejected()` : Determine whether a Deferred object has been rejected.
* `deferred.isResolved()` : Determine whether a Deferred object has been resolved.
* `deferred.state()` : Determine the current state of a Deferred object.

### Binding callbacks

* `deferred.done(Function [, Function] [, ...])` : Add handlers to be called when the Deferred object is resolved.
* `deferred.fail(Function [, Function] [, ...])` : Add handlers to be called when the Deferred object is rejected.
* `deferred.always(Function [, Function] [, ...])` : Add handlers to be called when the Deferred object is either resolved or rejected.
* `deferred.progress(Function [, Function] [, ...])` : Add handlers to be called when the Deferred object generates progress notifications.
* `deferred.then(Function [, Function] [, Function])` : Add handlers to be called when the Deferred object is resolved, rejected, or still in progress.

### Updating the state

* `deferred.notify(Array)` : Call the progressCallbacks on a Deferred object with the given args.
* `deferred.notifyWith(Object, [Array])` : Call the progressCallbacks on a Deferred object with the given context and args.

* `deferred.reject([Array])` : Reject a Deferred object and call any failCallbacks with the given args.
* `deferred.rejectWith(Object, [Array])` : Reject a Deferred object and call any failCallbacks with the given context and args.

* `deferred.resolve([Array])` : Resolve a Deferred object and call any doneCallbacks with the given args.
* `deferred.resolveWith(Object, [Array])` : Resolve a Deferred object and call any doneCallbacks with the given context and args.

[CodePen example](http://codepen.io/tonai/pen/eNaLpe).

## jQuery promises

Promises are like deferred object but you can't call the methods used to update the state yourself (`notify`, `notifyWith`, `reject`, `rejectWith`, `resolve` and `resolveWith`).

Meaning that the state will be updated by another process (usually by an animation or an AJAX request).

You will get the promises directly on the DOM element :
* `.promise([String ] [, Object])` : Return a Promise object to observe when all actions of a certain type bound to the collection, queued or not, have finished.

[CodePen example](http://codepen.io/tonai/pen/vOwzaO).

## Waiting for multiples deferred objects

* `jQuery.when(Deferred [, Deferred] [, ...])` : Provides a way to execute callback functions based on one or more objects, usually Deferred objects that represent asynchronous events.

[CodePen example](http://codepen.io/tonai/pen/PqvdKZ).

## References

* [jQuery API](http://api.jquery.com/)
