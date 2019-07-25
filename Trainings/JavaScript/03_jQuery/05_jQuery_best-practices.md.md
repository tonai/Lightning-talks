# jQuery best practices

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Best practices](#best-practices)
  - [Variable naming](#variable-naming)
  - [Namespace your events](#namespace-your-events)
- [References](#references)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Best practices

### Variable naming

I like to prefix all my jQuery variables with `$` so they are immediately identified from other variables.

Example :
```javascript
$element = $('.js-element');
```

### Namespace your events

You can namespace an event by using this syntax :
```javascript
$element.on('click.my-namespace', function(){/*...*/});
```

By using this, you can :

* Easily call your specific callback, without calling all other callbacks attached to it :

```javascript
$element.trigger('click.my-namespace');
```

* Easily remove a specific event without removing all other events attached to it :

```javascript
$element.off('click.my-namespace');
```

* Easily remove all events attached to an element from a specific namespace :

```javascript
$element.off('.my-namespace');
```

It is useful inside your plugin, but it will alse avoid nightmares to someone who need to extend your plugin.

## References

* [jQuery .on()](http://api.jquery.com/on/#event-names)

