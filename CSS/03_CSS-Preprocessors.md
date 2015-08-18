# CSS preprocessors

## Foreword

Presentation time needed : 30min

##introduction

### What are CSS preprocessors ?

CSS preprocessors are languages that extend CSS allowing usage of useful features for writing CSS.

Some features example :
* variables
* file inclusion
* functions and mixins
* ...

As preprocessors' languages is not understood by the browser, you need to compile this language into real CSS :
* often server side with dedicated tools
* sometimes client side with JavaScript
* or both (choose one)

I recommend to compile your files with server side tools, to save the compilation time to all of your users.

### Who are they ?

The most commonly used CSS preprocessors are :
* Less
* Sass (Syntactically Awesome Style Sheets)

Less and is written in JavaScript whereas SASS is written in Ruby.

Sass can be written 2 different ways : 
* The first way is very similar to CSS
* The second way gets rid of brackets and adhere to the off-side rule (blocks in that language are expressed by their indentation)

For better homogeneity between languages we will only talk about the first way in this document.

## Common features

### Variables

#### Simple variables

Creating and using variables is a very common feature in programming languages, and is finally available for CSS.

Less :
```Less
@main-color: #3D9BB3;
.link {
  color: @main-color;
}
```

Sass :
```Sass
$main-color: #3D9BB3;
.link {
  color: $main-color;
}
```

CSS result :
```CSS
.link {
  color: #3D9BB3;
}
```

#### Operations

Variables are scoped and can be manipulated with operators.

Less :
```Less
.link {
  @width: 20px;
  width: @width;
  margin-top: @width / 2;
}
```

Sass :
```Sass
.link {
  $width: 20px;
  width: $width;
  margin-top: $width / 2;
}
```

CSS result :
```CSS
.link {
  width: 20px;
  margin-top: 10px;
}
```

#### Interpolation

Creating and using variables is a very common feature in programming languages, and is finally available for CSS.

Less :
```Less
@class: link;
@property: color;
@main-color: #3D9BB3;
.@{class} {
  @{property}: @main-color;
}
```

Sass :
```Sass
$class: link;
$property: color;
$main-color: #3D9BB3;
.#{$class} {
  #{$property}: $main-color;
}
```

CSS result :
```CSS
a {
  color: #3D9BB3;
}
```

### CSS rules extension

#### Nesting

You can nest rules into each other.

Less & Sass :
```Sass
ul {
  margin: 0;
  > li {
    list-style-type: none;
    &:after {
      content: "- ";
    }
  }
}
```

CSS result :
```CSS
ul {
  margin: 0;
}
ul > li {
  list-style-type: none;
}
ul > li:after {
  content: "- ";
}
```

**Warning** : Remember that good CSS rules use simple selectors.  
When using nesting rules you need to think about the rendered CSS.  
Write "preprocessored" CSS by keeping in mind good practices and [CSS architecture](https://github.com/tonai/Lightning-talks/blob/master/CSS/02_CSS-architecture.md).

#### Inheritance

Rules can inherit from an other.

Less :
```Less
.control {
  position: absolute;
  top: 50%;
}
.control--left {
  &:extend(.control);
  left: 0;
}
```

Sass :
```Sass
.control {
  position: absolute;
  top: 50%;
}
.control--left {
  @extend .control;
  left: 0;
}
```

CSS result :
```CSS
.control, .control--left {
  position: absolute;
  top: 50%;
}
.control--left {
  left: 0;
}
```

### Mixins and Functions

#### Simple mixins

Mixins are a group of properties that can included into an other CSS rules.

Less :
```Less
.control {
  position: absolute;
  top: 50%;
}
.control--left {
  .control;
  left: 0;
}
```

CSS result :
```CSS
.control {
  position: absolute;
  top: 50%;
}
.control--left {
  position: absolute;
  top: 50%;
  left: 0;
}
```

Or (Less) :

```Less
@control: {
  position: absolute;
  top: 50%;
};
.control--left {
  @control();
  left: 0;
}
```

Sass :
```Sass
@mixin control {
  position: absolute;
  top: 50%;
}
.control--left {
  @include control;
  left: 0;
}
```

CSS result :
```CSS
.control--left {
  position: absolute;
  top: 50%;
  left: 0;
}
```

#### Parametric mixins

Mixins can be parameterized with arguments.

Less :
```Less
.border-radius(@radius) {
  -webkit-border-radius: @radius;
     -moz-border-radius: @radius;
          border-radius: @radius;
}
.link {
  .border-radius(5px);
}
```

Sass :
```Sass
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
     -moz-border-radius: $radius;
          border-radius: $radius;
}
.link {
  @include border-radius(5px);
}
```

CSS result :
```CSS
.link {
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
```

#### Functions

Functions are used to return a value.

Less :
```Less
.remToPx(@rem) {
  @base-font-size: 11px;
  @px: @rem * @base-font-size;
}
.link {
  .remToPx(1.3rem);
  font-size: @px;
}
```

Sass :
```Sass
@function remToPx($rem) {
  $base-font-size: 11px;
  @return $rem / 1rem * $base-font-size;
}
.link {
  font-size: remToPx(1.3rem);
}
```

CSS result :
```CSS
.link {
  font-size: 14.3px;
}
```

## Online testing

* [LESSTESTER](http://lesstester.com/)
* [SassMeister](http://sassmeister.com/)

## References

* [Less.js](http://lesscss.org/)
* [SASS](http://sass-lang.com/)
