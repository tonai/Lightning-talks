# JavaScript templating

## Foreword

You can use the navigator's debug console (F12) to try the above examples yourself.

Presentation time needed : 20min

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

If you don't know which template to choose, take a look to this page : [Template-Engine-Chooser!](http://garann.github.io/template-chooser/)
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

This template was writen by John Resig, the creator of jQuery, on [his blog](http://ejohn.org/blog/javascript-micro-templating/).

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
var result = tmpl(wrapperTemplate, {content: content});
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
  color: '#660000',
  nodes: [
    {
      title: 'Intro and types',
      url:   'https://github.com/tonai/Lightning-talks/blob/master/JavaScript/01_Intro-and-types.md'
    },
    {
      title: 'Scope and functions',
      url:   'https://github.com/tonai/Lightning-talks/blob/master/JavaScript/02_Scope-and-functions.md'
    },
    {
      title: 'Constructor and prototype',
      url:   'https://github.com/tonai/Lightning-talks/blob/master/JavaScript/03_Constructor-and-prototype.md'
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

### Integration with Drupal

Take a look at this Drupal project : [microtemplating](https://git.smile.fr/tocab/microtemplating).
