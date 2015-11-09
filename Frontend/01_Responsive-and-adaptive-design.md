# Responsive and adaptive design

## Foreword

Presentation time needed : 15min

## Some technical concepts

### HyperText Markup Language

HyperText Markup Language, commonly referred to as HTML, is the standard markup language used to create web pages.

HTML describes the structure of a website semantically along with cues for presentation.

Basically, it contains the page content that is structured with semantic tags (article, paragraph, blockquote...etc.), but also with meaningless tags that will be used for styling (div, span...etc.).

Example :
```HTML
<!DOCTYPE html>
<html>
  <head>
    <title>This is a title</title>
  </head>
  <body>
    <p>Hello <span class="highlight">world!</span></p>
  </body>
</html>
```

### Cascading Style Sheets

Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language.

CSS is designed primarily to enable the separation of document content from document presentation, including aspects such as the layout, colors, and fonts.

With CSS you can apply a set of styles (declarations) that target a specific set of elements in your HTML document using a selector.

Example :
```CSS
.highlight {
  background-color: yellow;
}
```

### CSS media queries

With CSS media queries, you can define different CSS rules that apply only for a specific interval of resolutions.

For example you can define 3 colums for desktop that are re-arranged to be one above the other for mobile (when resolution is under 767px for example.)

But the HTML is the same !

Example :
```CSS
@media (max-width: 767px) {
  .highlight {
    background-color: red;
  }
}
```

### Breakpoints

A breakpoint is a specific resolution which delimit two interval and therefore two different behaviors.

Common breakpoints :
* 320px : usually used resolution as the lowest resolution used by smartphone (this is the resolution of iphones until 5S).
* 768px : usually used resolution for tablet in portrait position (portrait resolution of most ipad).
* 1024px : usually used resolution for tablet in landscape position (landscape resolution of most ipad).

## The different behaviors across devices

### Fixed layout

The width of the content has an absolute value.

When resizing your brower a scrollbar will appear at the bottom of the screen.

=> [Try it yourself !](http://tonai.github.io/Lightning-talks/Frontend/01_Responsive-and-adaptive-design/fixed.html)

### Fluid layout

The width of the content has a relative value.

You won't have a scrollbar when resizing, but it can't really fit for small resolutions.

=> [Try it yourself !](http://tonai.github.io/Lightning-talks/Frontend/01_Responsive-and-adaptive-design/fluid.html)

### Adaptive layout

This technique uses CSS media queries.

You 

=> [Try it yourself !](http://tonai.github.io/Lightning-talks/Frontend/01_Responsive-and-adaptive-design/adaptive-layout.html)


## References

* [HyperText Markup Language][HTML]
* [Cascading Style Sheets][CSS]

[HTML]: https://en.wikipedia.org/wiki/HTML
[CSS]: https://en.wikipedia.org/wiki/Cascading_Style_Sheets
