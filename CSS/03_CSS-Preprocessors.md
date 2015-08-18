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
* Stylus

Less and Stylus are written in JavaScript whereas SASS is written in Ruby.

Sass and Stylus can be written 2 different ways : 
* The first way is very similar to CSS
* The second way gets rid of brackets and adhere to the off-side rule (blocks in that language are expressed by their indentation)

For better homogeneity between languages we will only talk about the first way in this document.

## Features

### Variables

Creating and using variables is a very common feature in programming languages, and is finally available for CSS !

Less :
```Less
@main-color: #3D9BB3;
a {
  color: @light-blue;
}
```

Sass :
```Sass
$main-color: #3D9BB3;
a {
  color: $light-blue;
}
```

Stylus :
```Stylus
$main-color: #3D9BB3;
a {
  color: $light-blue;
}
```

## References

* [Less.js](http://lesscss.org/)
* [SASS](http://sass-lang.com/)
* [Stylus](https://learnboost.github.io/stylus/)
