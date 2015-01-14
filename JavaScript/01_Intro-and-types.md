# Intro and types

## Foreword

This files contains examples illustrating [this presentation](http://prezi.com/wg82mzhhhaz2/javascript-intro-and-types/).

You can use the chrome console for the above examples (avoid firebug).

Presentation time needed : 20min

## History

Created by Netscape in 1995 JavaScript is a language based on the ECMAScript standard (currently the 5th version).

Other languages ​​are also based on this standard as JScript (Microsoft) and ActionScript (Adobe).

JavaScript various influences: 
* Java : name, syntax
* Perl & Python : string, array, regexp
* Scheme, AWK, Self...

## Statements VS expressions

An expression produces a value and can be written wherever a value is expected (for example as an argument in a function call).

### Statement (instruction) :

A statement performs an action (if, for...)

Example :
```javascript
var y = 2;
var x;
if (y >= 0) {
  x = y;
} else {
  x = -y;
}
```

Result :
```javascript
x;
```

### Expression statement

Wherever JavaScript expects a statement, you can also write an expression (=expression statement).

But the reverse does not hold

Example :
```javascript
var y = 2;
var x = (y >= 0 ? y : -y);
```

Result :
```javascript
x;
```

Example :
```javascript
var y = 2;
function myFunc(x) {
  console.log(x);
}
```

Result :
```javascript
myFunc(y >= 0 ? y : -y);
```

## Primitives VS objetcs

### Primitives

The primitive values are:
* booleans
* numbers
* strings
* null
* undefined

Example :
```javascript
var prim1 = 123;
var prim2 = 123;
```

Result :
```javascript
prim1 === prim2;
```

### Objects

All other values are objects.
(object = all values that are not primitive)

Example :
```javascript
var obj1 = {};
var obj2 = {};
```

Result :
```javascript
obj1 === obj2;
obj1 === obj1;
```

Example :
```javascript
var obj3 = obj1;
```

Result :
```javascript
obj1 === obj3;
```

Example :
```javascript
obj1.x = 2;
```

Result :
```javascript
obj3.x;
```

## typeof and instanceof

### typeof

Use typeof to find out whether a given value is an object or a primitive and, in the latter case, what type of primitive it is.

Result :
```javascript
typeof true;
typeof 1;
typeof "aze";
typeof [];
typeof {};
var myVar;
typeof myVar;
```

### typeof WAT !

Result :
```javascript
typeof (function(){});
typeof null;
typeof NaN;
```

![WAT](http://i2.kym-cdn.com/photos/images/original/000/173/576/Wat8.jpg)

But above results are known "bug" and since they exist from a long time, we must deal with them...

### instanceof

Use instanceof to determine whether an object is an instance of a given type. instanceof always returns false for primitive values. 

Result :
```javascript
{} instanceof Object;
[] instanceof Object;
(function() {}) instanceof Function;
(function() {}) instanceof Object;
new Date() instanceof Date;
new Date() instanceof Object;
true instanceof Object;
```

Example :
```javascript
function Point(x, y) {
  this.x = x;
  this.y = y;
}
var point = new Point(1, 2);
```

Result :
```javascript
point instanceof Point;
point instanceof Object;
```

### Wrapper ([beware !][beware])

Do not use wrappers (Boolean, Number, String) by using the `new` keyword.

Example :
```javascript
var string = new String("abc");
```

Result :
```javascript
string instanceof String;
typeof string;
string.valueOf() instanceof String;
typeof string.valueOf();
```

But they can be used for type casting (without `new`) :
```javascript
var string = "123";
Number(string);
```

## Objects literal VS blocks

### Objects literal

Object literal is an expression that produces an object.

Example :
```javascript
{
  foo: myFunc(2)
}
```

Same as :
```javascript
var obj = 
  foo: myFunc(2)
};
```

Result :
```javascript
obj;
```

### Blocks

But JavaScript has blocks that can exist on their own.

You can give them a label and break from them.

Example :
```javascript
function myFunc(printTwo) {
  console.log(printTwo);
  printing: {
    console.log("One");
    if (!printTwo) {
      break printing;
    }
    console.log("Two");
  }
  console.log("Three");
}
```

Result :
```javascript
myFunc();
myFunc(1);
```

## WAT !!!!!

Result :
```javascript
[] + [];
```

![WAT](http://i0.kym-cdn.com/photos/images/original/000/195/379/1320452774001.png)

Same as :
```javascript
[].toString() + [].toString();
```

-------------------------

Result :
```javascript
[] + {};
```

![WAT](http://i0.kym-cdn.com/photos/images/original/000/173/575/25810.jpg)

Same as :
```javascript
[].toString() + {}.toString();
```

-------------------------

Result :
```javascript
{} + [];
```

![WAT](http://mybroadband.co.za/vb/attachment.php?attachmentid=71940&d=1379691163)

Same as :
```javascript
+[];
```

Same as :
```javascript
Number([]);
```

Same as :
```javascript
Number([].toString());
```

-------------------------

Result :
```javascript
{} + {};
```

![WAT](http://i1.kym-cdn.com/photos/images/original/000/173/580/Wat.jpg)

Same as :
```javascript
+{};
```

Same as :
```javascript
Number({});
```

Same as :
```javascript
Number({}.toString());
```

-------------------------

Result :
```javascript
({} + {});
```

![WAT](http://i1.kym-cdn.com/photos/images/original/000/173/589/RsLid.jpg)

Same as :
```javascript
{}.toString() + {}.toString();
```

Because `({} + {});` is an expression and `{} + {};` is a statement.

[beware]: http://www.youtube.com/watch?v=NDtfiX4YwzM&t=0m28s
