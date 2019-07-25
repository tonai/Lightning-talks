# JavaScript templating

## Foreword

You can use the navigator's debug console (F12) to try the above examples yourself.

Presentation time needed : 20min

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Existing JavaScript template engine](#existing-javascript-template-engine)
- [Syntax](#syntax)
  - [General notions](#general-notions)
  - [Mustache style](#mustache-style)
  - [ERB style (Ruby template engine)](#erb-style-ruby-template-engine)
- [Focus on one template engine : microtempling](#focus-on-one-template-engine--microtempling)
  - [Introduction](#introduction)
  - [Usage](#usage)
    - [String template](#string-template)
    - [HTML template](#html-template)
    - [Writing a partial](#writing-a-partial)
    - [More complexe example](#more-complexe-example)
    - [Pre-compilation](#pre-compilation)
- [About ES6 templates](#about-es6-templates)
  - [Variable interpolation](#variable-interpolation)
  - [Conditionals](#conditionals)
  - [Array iteration](#array-iteration)
- [References](#references)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Existing JavaScript template engine

There is a lot of JavaScript template engines :
* closure
* doT
* dust
* EJS
* handlebars
* hogan
* lodash
* microtemplating
* mustache.js
* pure
* underscore
* ...

If you don't know which template to choose, take a look to this page : [Template-Engine-Chooser!][garann]
It will help you choosing the right template engine for your needs.

## Syntax

### General notions

When writing a template we need to evaluate 3 main things :
* variable interpolation
* conditionals
* array iteration

Optionnaly we also can found other features like :
* variable interpolation with encoding
* comments
* partials (include a template in another)

Each template engine choose it's own syntax for each of this notions.
And some of them also allow changing them.

But 2 styles seems to be quite recurrent.

### Mustache style

Syntax :
* interpolation : `{{{ }}}` OR `{{& }}`
* encoding interpolation : `{{ }}`
* conditionals : `{{# }}` `{{/ }}`
* inverted conditionals : `{{^ }}` `{{/ }}`
* array iteration : `{{# }}` `{{/ }}`
* comments : `{{! }}`
* partials : `{{> }}`

Used by :
* handlebars
* hogan
* mustache.js

### ERB style (Ruby template engine)

Syntax :
* interpolation : `<%= %>`
* encoding interpolation  : `<%- %>`
* other evaluation : `<% %>`

Used by :
* EJS
* lodash
* microtemplating (without encoding interpolation)
* underscore

## Focus on one template engine : microtempling

### Introduction

This template was writen by John Resig, the creator of jQuery, on [his blog][microtemplating].

Advantages :
* pre-compilation available
* lightweight (1,1Kb ; 449b minified)
* fast
* easy to use
* not limited

### Usage

#### String template

Example :
```javascript
var template = '<span>Hello <%= name %> !</span>';
var data = {name: 'World'};
```

Result :
```javascript
tmpl(template, data);
```

#### HTML template

Example :
```html
<script type="text/template" id="myTemplate">
  <span>
    Hello <%= name %> !
  </span>
</script>
```

Result :
```javascript
tmpl('myTemplate', {name: 'World'});
```

#### Writing a partial

Example :
```javascript
var wrapperTemplate = '<div><%= content %></div>';
var contentTemplate = '<span>Hello <%= name %> !</span>';
```

Result :
```javascript
var content = tmpl(contentTemplate, {name: 'World'});
tmpl(wrapperTemplate, {content: content});
```

#### More complexe example

Example :
```html
<script type="text/template" id="myTemplate">
  <h2 class="myTemplate__title" style="color:<%= color %>;">
    <%= name %>
  </h2>
  <% if (nodes.length > 0) { %>
    <ul class="myTemplate__node">
      <% for (var i=0; i < nodes.length; i++) { %>
        <li>
          <a class="myTemplate__node__title" href="<%= nodes[i].url %>" title="<%= nodes[i].title %>" target="_blank">
            <%= nodes[i].title %>
          </a>
        </li>
      <% } %>
    </ul>
  <% } %>
</script>
```

Result :
```javascript
var result = tmpl('myTemplate', {
  name:  'Lightning talks',
  color: '#FF0000',
  nodes: [
    {
      title: 'Statements, expressions and types',
      url:   'https://github.com/tonai/Lightning-talks/blob/master/JavaScript/01_Vanilla/01_Statements-expressions-and-types.md'
    },
    {
      title: 'Operators',
      url:   'https://github.com/tonai/Lightning-talks/blob/master/JavaScript/01_Vanilla/02_Operators.md'
    },
    {
      title: 'Functions and scope',
      url:   'https://github.com/tonai/Lightning-talks/blob/master/JavaScript/01_Vanilla/03_Functions-and-Scope.md'
    },
    {
      title: 'DOM and events',
      url:   'https://github.com/tonai/Lightning-talks/blob/master/JavaScript/01_Vanilla/04_DOM-and-events.md'
    }
  ]
});
```

You can then append the result to the DOM using jQuery for instance :
```javascript
jQuery('body').append(result);
```

Live example : see [this JSFiddle](http://jsfiddle.net/hzsd3k16/2/).

#### Pre-compilation

When you need to use the same template you can pre-compile your template for better performance results.

Pre-compilation transforms your templates in pure JavaScript that you can re-use any number of times.

With the same above example you can pre-compile the template by omitting the data parameter :
```javascript
var preCompiledTemplate = tmpl('myTemplate');
```

By using it this way, the `tmpl` function does not return a string but returns a function.

Then you can use it with different data sets :
```javascript
var result1 = preCompiledTemplate(data1);
var result2 = preCompiledTemplate(data2);
var result3 = preCompiledTemplate(data3);
```

Live example : see markers pop-ups on [Kering Foundation map](http://keringfoundation.org/actions?finalized=1) .

## About ES6 templates

### Variable interpolation

Variable interpolation is a native functionnality of ES6 templates.  
It works like the following :
```javascript
var name = 'World';
var template = `<span>Hello ${name} !</span>`;
template;
```

But like this, the template string is not really reusable...  
You can create a function wrapping the template but you will have to list each template variables as function arguments :
```javascript
var template = function(data) {
  return `<span>Hello ${data.name} !</span>`;
}
template({name: 'World'});
```

For variable interpolation simplification, tagged templates come to the rescue in association with this little function :
```javascript
function tmpl(strings, ...keys) {
  console.log(keys);
  return (function(values) {
    var result = [strings[0]];
    keys.forEach(function(key, i) {
      result.push(values[key], strings[i + 1]);
    });
    return result.join('');
  });
}
```

Result :
```javascript
var template = tmpl`<span>Hello ${'name'} !</span>`;
template({name: 'World'});
template({name: 'Everybody'});
```

### Conditionals

Only ther ternary operator is available for conditionnal statements as only expressions are allowed inside templates (as not statements).

But expressions inside the brackets `${}` are evaluated immediately thus this method is also not compatible with the tagged template technique above.

Example :
```javascript
var template = function(data) {
  return `<span>${data.like? 'No longer like': 'Like'}</span>`;
}
template({like: false});
template({like: true});
```

### Array iteration

It is also possible to do some iterations always by using iteration techniques that are expressions, like using the `map()` function.

Example :
```javascript
var template = function(data) {
  return `<ul>
${data.items.map(item => `<li>${item}</li>`).join('\n')}
</ul>`;
}
template({items: ['foo', 'bar', 'baz']});
```

## References

* [Template-Engine-Chooser!][garann]
* [JavaScript Micro-Templating][microtemplating]
* [Template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings)

[microtemplating]: http://ejohn.org/blog/javascript-micro-templating/
[garann]: http://garann.github.io/template-chooser/
