# CSS architecture

## Foreword

Presentation time needed : 30min

## Goal

The goal of CSS architecture is to improve the following aspects :
* Predictability : Predictable CSS means your rules behave as you’d expect.
  When you add or update a rule, it shouldn’t affect parts of your site that you didn’t intend.
* Reusability : CSS rules should be abstract and decoupled enough that you can build new components quickly from existing parts without having to recode patterns and problems you’ve already solved.
* Maintainability : When new components and features need to be added, updated or rearranged on your site, doing so shouldn’t require refactoring existing CSS.
  Adding component X to the page shouldn’t break component Y by its mere presence.
* Scalability : As your site grows in size and complexity it usually requires more developers to maintain.
  Scalable CSS means it can be easily managed by a single person or a large engineering team.
  It also means your site’s CSS architecture is easily approachable without requiring an enormous learning curve.

## Common Bad Practices

### Modifying a components based on parents

Example :
```CSS
.widget {
  background: yellow;
}
body.homepage .widget {
  background: white;
}
```

* Predictability : When using the widget in the homepage you may first expect it to be yellow.
* Reusability : If I want to reuse the white widget on a classic content page, I need to add new CSS rules.
* Maintainability : If I have to change the look of the widget I need to change all particular cases.
* Scalability : You need to learn all particular cases.

### Overly complicated selectors

Example:
```CSS
#main-nav ul li ul li div { }
#content article h1:first-child { }
#sidebar > div > h3 + p { }
```

* Predictability : The more complicated a selector is, the more coupled it is to the HTML.
* Reusability : Rules depends on context, so you need to duplicate them if you want to reuse some styles.
* Maintainability : If a single element changes in the chaîn, all the rule is broken.
* Scalability : The more complicated a selector is, the more difficult it is to find what it does.

### Overly generic class names

Example :
```CSS`
.widget {}
.widget .title {}
.widget .contents {}
.widget .action {}
```

* Predictability : When used in some contexts (eg in a sidebar) the widget may inherit unwanted styles from other elements like `.sidebar .title`.
* Reusability : You may need to override some styles in some contexts.
* Maintainability : Adding rules in some contexts may break existing widgets.
* Scalability : The probability of breaking existing widget by adding some rules is even greater.

### Making a rule do too much

```CSS
.widget {
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: red;
  font-size: 1.5em;
  text-transform: uppercase;
}
```

* Predictability : Because of the absolute positioning, the widget depends on the ancestors styles and so is not predictable.
* Reusability : The look and feel is reusable but not the positionning. Problem : they are both linked in the same declaration block...
* Maintainability : Adding a relative positioning to some ancestor will break the widget.
* Scalability : New developers may copy-paste the widget if it does not position itself correctly because of the fear of existing widget regressions.

## Categorizing CSS Rules

SMACSS defines 5types of categories :
* Base
* Layout
* Module
* State
* Theme

I'd like to had one special category :
* JavaScript

### Base rules

Base rules are the defaults.

Example :
```CSS
html, body, form {
  margin: 0; padding: 0;
}
input[type=text] {
  border: 1px solid #999;
}
a {
  color: #039;
}
a:hover {
  color: #03C;
}
```

### Layout

Layout rules divide the page into sections.  
They are used for managing the page's disposition and classes begin with `l-`.

Example :
```CSS
.l-inline {
  display: inline;
}
.l-col {
  display: inline-block;
  width: 100%;
  margin-right: -15px;
  margin-left: -15px;
}
```

### Module

Modules are the reusable, modular parts of our design.  
They are used for styling.

Example :
```CSS
.block {
  background-color: #555;
}
```

### State

State rules are ways to describe how our modules or layouts will look when in a particular state.  
The state classes begin with `is-`.

Example :
```CSS
/* Standalone rule. */
.is-error {
  color: red;
}
/* Module rules. */
.tab {
    background-color: purple;
    color: white;
}
.is-tab-active {
    background-color: white;
    color: black;
}
```

Since the state will likely need to override the style of a more complex rule set, the use of `!important` is allowed.

### Theme

Theme rules are similar to state rules in that they describe how modules or layouts might look.  
Most sites don’t require a layer of theming but it is good to be aware of it.

Themes can affect any of the primary types.  
Just having a separate theme file should hopefully be enough.

Example :
```CSS
/* in module-name.css */
.mod {
    border: 1px solid;
}
/* in theme.css */
.mod {
    border-color: blue;
}
```

### JavaScript

Here we only speak of HTML classes that are used for JavaScript.  
JavaScript classes are used to select DOM elements needed in your scripts.

With JavaScript you can also control the addition of removal of state classes.  
But remember that no styles should be applied to JavaScript classes.

We used specific JavaScript classes to separate styles from functionalities.
The JavaScript classes begin with `js-`.

HTMl :
```HTML
<ul class="menu">
  <li class="menu-group js-menu-group">
    <a class="menu-item js-menu-item" href="#">Menu item 1</a>
    <div class="menu-submenu js-menu-submenu is-hidden">...</div>
  </li>
</ul>
```

JavaScript with jQuery :
```JavaScript
$('.js-menu-group').each(function(){
  var $menuGroup = $(this);
  var $menuItem = $menuGroup.find('.js-menu-item');
  var $menuSubmenu = $menuGroup.find('.js-menu-submenu');
  $menuItem.on('click', function(){
    $('.js-menu-submenu').removeClass('is-hidden');
    $menuSubmenu.addClass('is-hidden');
  });
});
```

## Best practices

:construction:

## References

* [CSS Architecture](http://engineering.appfolio.com/2012/11/16/css-architecture/)
* [Scalable and Modular Architecture for CSS](https://smacss.com/)
* [BEM](https://en.bem.info/method/definitions/)
* [Bonnes pratiques en CSS : BEM et OOCSS](http://www.alsacreations.com/article/lire/1641-bonnes-pratiques-en-css-bem-et-oocss.html)
