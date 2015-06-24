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

* Predictability : I can't have a yellow widget on the homepage.
* Reusability : I can't have a white widget on a classic content page.
* Scalability : You need to learn all particular cases.
* Maintainability : If I have to change the look of the widget I need to change all particular cases.

### Overly complicated selectors

Example:
```CSS
#main-nav ul li ul li div { }
#content article h1:first-child { }
#sidebar > div > h3 + p { }
```

* Predictability : No because it depends on the region it is located.
* Reusability : The more complicated a selector is, the more coupled it is to the HTML...
* Scalability : The more complicated a selector is, the more difficult it is to find what it does.
* Maintainability : If a single element changes in the chaîn, all the rule is broken.

### Overly generic class names

:construction:

## References

* [Scalable and Modular Architecture for CSS](https://smacss.com/)
* [CSS Architecture](http://engineering.appfolio.com/2012/11/16/css-architecture/)
