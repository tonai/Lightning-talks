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

## Best practices

### Be intentional

Applying classes directly to the elements you want to style is the best way to keep your CSS predictable.

```CSS
/* Grenade */
#main-nav ul li ul { }

/* Sniper Rifle */
.subnav { }
```

### Separate your concerns

SMACSS (Scalable and Modular Architecture for CSS) defines 5types of categories :
* Base
* Layout
* Module
* State
* Theme

#### Base rules

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

Types selector should only be used for this concern.

#### Layout

Layout rules divide the page into sections.  
They are used for managing the page's disposition and classes begin with `l-`.

Remember that to effectively separate content from presentation it’s often essential to separate content from its container.

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

#### Module

Modules are the reusable, modular parts of our design.  
They are used for styling.

Example :
```CSS
.block {
  background-color: #555;
}
```

#### State

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

#### Theme

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

### Name your classes with a logical structure

You can use the BEM (Block, Element, Modifier) notation for organizing your classes.

#### Block

A `block` is an independent entity, a "building block" of an application. A block can be either simple or compound (containing other blocks).

Example :
```HTML
<div class="block-menu">
  ...
</div>
```

#### Element

An `element` is a part of a block that performs a certain function. Elements are context-dependent: they only make sense in the context of the block they belong to.

The block class name will be used as a namespace and the element class name is added using the `__` (double underscore) separator.

Example :
```HTML
<div class="block-menu">
  <div class="block-menu__group">
    <a class="block-menu__item" href="#">Menu item 1</a>
    <div class="block-menu__submenu">...</div>
  </div>
</div>
```

#### Modifiers for blocks

We often need to create a block very similar to an existing one, but with slightly altered its appearance or behavior.

The block class name will be used as a namespace and the modifier class name is added using the `--` (double hyphen) separator.  
Several modifiers can be used at once.

Example :
```HTML
<div class="block-menu block-menu--secondary">
  <div class="block-menu__group">
    <a class="block-menu__item" href="#">Menu item 1</a>
    <div class="block-menu__submenu">...</div>
  </div>
</div>
```

#### Element modifiers

Element modifiers are implemented in the same fashion.

```HTML
<div class="block-menu">
  <div class="block-menu__group"></div>
  <div class="block-menu__group"></div>
  <div class="block-menu__group"></div>
  <div class="block-menu__group block-menu__group--special"></div>
</div>
```

### Separate styles from functionalities

Here we only speak of HTML classes that are used for JavaScript.  
JavaScript classes are used to select DOM elements needed in your scripts.

With JavaScript you can also control the addition of removal of state classes.  
But no styles should be applied to JavaScript classes.

The JavaScript classes begin with `js-`.

HTMl :
```HTML
<div class="block-menu">
  <div class="block-menu__group js-block-menu__group">
    <a class="block-menu__item js-block-menu__item" href="#">Menu item 1</a>
    <div class="block-menu__submenu js-block-menu__submenu is-hidden">...</div>
  </div>
</div>
```

JavaScript with jQuery :
```JavaScript
$('.js-block-menu__group').each(function(){
  var $menuGroup = $(this);
  var $menuItem = $menuGroup.find('.js-block-menu__item');
  var $menuSubmenu = $menuGroup.find('.js-block-menu__submenu');
  $menuItem.on('click', function(){
    $('.js-block-menu__submenu').addClass('is-hidden');
    $menuSubmenu.removeClass('is-hidden');
  });
});
```

## References

* [CSS Architecture](http://engineering.appfolio.com/2012/11/16/css-architecture/)
* [Scalable and Modular Architecture for CSS](https://smacss.com/)
* [BEM](https://en.bem.info/method/definitions/)
* [About HTML semantics and front-end architecture](http://nicolasgallagher.com/about-html-semantics-front-end-architecture/)
