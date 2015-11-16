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

### Graceful degradation

Graceful degradation allow the page to "degrade", or remain presentable even if certain technologies assumed by the design were not present, without being jarring to the user of such older software.

For example, the CSS property `border-radius` allow box to have rounded corners which was very complicated to do before.

This property is not compatible with IE < 9, so when using this browser, the user won't have rounded corners.  
But this is not really important.

## The different behaviors across devices

### Fixed layout

The width of the content has an absolute value.

When resizing your brower a scrollbar will appear at the bottom of the screen.

=> [Try it yourself !](http://tonai.github.io/Lightning-talks/Frontend/01_Responsive-and-adaptive-design/fixed.html)

### Fluid layout

The width of the content has a relative value.  
It can also have a maximum width value.

You won't have a scrollbar when resizing, but it can't really fit for small resolutions.

=> [Try it yourself !](http://tonai.github.io/Lightning-talks/Frontend/01_Responsive-and-adaptive-design/fluid.html)

### Adaptive layout

This technique uses CSS media queries.

You will have multiples fixed layout for multiple intervals of resolutions.

You can rearrange columns, hide and show some blocs...etc. for specific displays.

It is a technique that is best to use when working on an existing site, and you want better displays for tablets and mobiles for example, without changing the current desktop look and feel.

=> [Try it yourself !](http://tonai.github.io/Lightning-talks/Frontend/01_Responsive-and-adaptive-design/adaptive-layout.html)

### Responsive layout

This technique uses CSS media queries.

You will have multiples fluid layout for multiple intervals of resolutions.

Like the `Adaptive layout`, you can rearrange columns...etc. for specific displays.

This method is oftenly used when creating new sites.

=> [Try it yourself !](http://tonai.github.io/Lightning-talks/Frontend/01_Responsive-and-adaptive-design/responsive-layout.html)

Ethan Marcotte says :
> Fluid grids, flexible images, and media queries are the three technical ingredients for responsive web design, but it also requires a different way of thinking.

### Adaptive Web Design

`Adaptive Web Design` (AWD) uses a predefined set of layout sizes based on device screen size along with CSS and JavaScript.

With this definition it may be confused with the adaptive layout, but in fact AWD is a concept that encompass
RWD.

The AWD approach adapts to the detected device by using many of the components of **progressive enhancement**.

Progressive enhancement is a strategy for web design that emphasizes accessibility, semantic HTML markup, and external stylesheet and scripting technologies.  
Progressive enhancement uses web technologies in a layered fashion that allows everyone to access the basic content and functionality of a web page, using any browser or Internet connection, while also providing an enhanced version of the page to those with more advanced browser software or greater bandwidth.

A simple example is to redirect the user to different pages depending on the detected device.  
With this technique you can deliver a complete different HTML which allow network and rendering optimization for the targeted device.

=> [Try it yourself !](http://tonai.github.io/Lightning-talks/Frontend/01_Responsive-and-adaptive-design/adaptive-design-desktop.html)

## References

* [HyperText Markup Language][HTML]
* [Cascading Style Sheets][CSS]
* [Responsive Web Design][RWD]
* [Progressive enhancement][PE]

[HTML]: https://en.wikipedia.org/wiki/HTML
[CSS]: https://en.wikipedia.org/wiki/Cascading_Style_Sheets
[RWD]: http://alistapart.com/article/responsive-web-design
[PE]: https://en.wikipedia.org/wiki/Progressive_enhancement
