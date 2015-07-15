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

:construction:

## References

* [CSS Architecture](http://engineering.appfolio.com/2012/11/16/css-architecture/)
* [Scalable and Modular Architecture for CSS](https://smacss.com/)
* [BEM](https://en.bem.info/method/definitions/)
* [Bonnes pratiques en CSS : BEM et OOCSS](http://www.alsacreations.com/article/lire/1641-bonnes-pratiques-en-css-bem-et-oocss.html)
