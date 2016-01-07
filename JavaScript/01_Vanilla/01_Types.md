# Types and operators

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [What is JavaScript](#what-is-javascript)
  - [History](#history)
  - [Influences](#influences)
  - [Popularity](#popularity)
- [Statements VS expressions](#statements-vs-expressions)
  - [Expressions](#expressions)
  - [Statements (instruction)](#statements-instruction)
    - [Control flow statement](#control-flow-statement)
    - [Declarations](#declarations)
    - [Functions and classes](#functions-and-classes)
    - [Iterations](#iterations)
    - [Labels](#labels)
    - [Block statements](#block-statements)
    - [Others](#others)
  - [Expression statements](#expression-statements)
  - [Semicolon and comma](#semicolon-and-comma)
- [Primitives VS objects](#primitives-vs-objects)
  - [Primitives](#primitives)
    - [Numbers](#numbers)
    - [Strings](#strings)
    - [Symbols](#symbols)
  - [Objects](#objects)
    - [Objects literal](#objects-literal)
    - [Arrays](#arrays)
    - [RegExps](#regexps)
    - [Maps && WeakMaps (ES6)](#maps-&&-weakmaps-es6)
    - [Sets && weakSets (ES6)](#sets-&&-weaksets-es6)
    - [Wrappers](#wrappers)
    - [Other constructors](#other-constructors)
- [References](#references)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## What is JavaScript

### History

Originally created by Brendan Eich in 1995 as an server side language called LiveScript, it becomes JavaScript when implemented in the Netscape Navigator 2.0 as a client side language (Netscape and Sun were partners and the java Virtual Machine was increasingly popular).

Microsoft reacts by developping JScript that was included in IE3 in 1996 which was a reverse-engineered implementation of Netscape's JavaScript, mainly because the name JavaScript is a trademark that belonged to Sun Microsystems (now Oracle Corporation).

End of 1996 Netscape submit JavaScript to Ecma International for standardization, and subsequent work resulted in the standardized version named ECMAScript in 1997.

Microsoft, for the JScript language, followed this standard (implemented in 1997 in IE4) and Macromedia Inc (now Adobe system) created ActionScript in 1998 for Flash Player 5.

### Influences

JavaScript various influences: 
* Java : name, syntax
* Perl & Python : string, array, regexp
* Scheme, AWK, Self

### Popularity

At the beginning the language was not very popular because it was initially dedicated to "amateur" programmers and thus denigrated by professional programmers.

But JavaScript had a second chance in 2005 with the advent of Ajax that brought JavaScript under the spotlight and therefore more professional programming attention.

JavaScript is now the world`s most popular programming language.

But JavaScript is also the world`s most unpopular programming language...

## Statements VS expressions

### Expressions

An expression produces a value and can be written wherever a value is expected (for example as an argument in a function call).

Example :
```javascript
1 + 2;
y >= 0 ? y : -y; // conditional (ternary) operator
```

They can be used as a function argument.

Example :
```javascript
var y = 2;
function square(x) {
  console.log(x);
  return x * x;
}
square(y >= 0 ? y : -y);
```

They can't start with `{` or with `function`.

### Statements (instruction)

A statement performs an action.

#### Control flow statement

* `if` / `else if` / `else`
* `switch`
* `break` / `continue`
* `try` / `catch`
* `throw`

#### Declarations

* `var`
* `let` (ES6)
* `const` (ES6)

#### Functions and classes

* `function`
* `function*` (ES6)
* `class` (ES6)
* `return`

#### Iterations

* `while`
* `do...while`
* `for`
* `for...in`
* `for...of` (ES6)

Differences between `for...in` and `for...of` :
```javascript
var array = [2, 3, 5];

for (i in array) {
  console.log(i);
}

for (i of array) {
  console.log(i);
}
```

#### Labels

Any statements, and thus also expressions (see below [Expression statements](#expression-statements)), can have a label.

`break` can be used with any labeled statement, and `continue` can be used with looping labeled statements.

Statement example with `break` :
```javascript
myLabel:
if (true) {
  console.log('one');
  break myLabel;
  console.log('two');
}
```

Statement example with `continue` :
```javascript
myLabel:
for (var i in [0, 1, 2]) {
  if (i == 0) {
    continue myLabel;
  }
  console.log(i);
}
```

Expression example: 
```javascript
myLabel: 1 + 2;
```

#### Block statements

JavaScript has block statements that can exist on their own.

Example :
```javascript
console.log('foo');
{
  console.log('bar');
}
console.log('baz');
```

Blocks are statements and thus you can give them a label and break from them.

Example :
```javascript
printing: {
  console.log('one');
  if (true) {
    break printing;
  }
  console.log('two');
}
```

Beware, the following line is **not** an [Objects literal](#objects-literal) :
```javascript
{
  foo: square(2)
}
```

**Remember:** An expression can not start with `{` because it is reserved for the block statement.

#### Others

* `debugger`
* `export` / `import` (ES6)
* `with`

### Expression statements

An expression statement is basically the combination of performing an action and returning a value.  
Another way to say it : it is expressions that have side effects.

Example of Expression statements :
* assignment without `var`
* function call
* increment operator `++`, but also `--`, `+=`...etc.
* `delete` operator (return a boolean in non strict mode)
* ...

Wherever JavaScript expects a statement, you can also write an expression (=expression statement).

But the reverse does not hold :
```javascript
square(var z = 3); // KO
square(z = 3); // OK because it produces the value 3.
```

### Semicolon and comma

You can chain statements using the semicolon `;`.

Example :
```javascript
square(1);
square(2);
```

But in contrary to some other languages, it is not mandatory (In fact the JavaScript parser will insert semicolon automaticaly in some cases).
So the following lines will work :
```javascript
square(1)
square(2)
```

But not using the `;` operator may also lead to some errors.

OK :
```javascript
1;
(2);
```

KO :
```javascript
1
(2)
```

Sometimes you will also see `,` instead of `;`.  
This is the comma operator that can be used between expressions, that will be evaluated, and will return the value of the last operand.

Example :
```javascript
square(1), square(2);
```

## Primitives VS objects

### Primitives

The primitive values are:
* booleans
* numbers
* strings
* null
* undefined
* symbol (ES6)

Example :
```javascript
var prim1 = 123;
var prim2 = 123;
prim1 === prim2;
```

#### Numbers

You can define decimal and hexadecimal numbers, octal and binary numbers (ES6) :
```javascript
var decimal = 100;
var hexadecimal = 0x100;
var octal = 0o100;
var binary = 0b100;
console.log(decimal, hexadecimal, octal, binary);
```

These other values are also numbers :
* Infinity
* NaN (Not a Number)

There is no specific integer type, so you can get the integer part by using the `parseInt` function.

Example :
```javascript
parseInt(-15.1);
parseInt('-15.1');
parseInt('-15.1', 10);
parseInt("-0xF", 16);
```

Numbers are 32 bits floating-point numbers so you may be careful when operating with them...

Example :
```javascript
0.1 + 0.2;
```

But this error is not specific to JavaScript (C#, Java, PHP, Python, Ruby, Perl, SQL...etc. too) :
```shell
php -r "echo (0.1 + 0.2 === 0.3? 'ok': 'ko');"
```

#### Strings

A string is defined by the following englobing characters : ` ' ' ` or ` " " ` (no differences) or `` ` ` `` (template strings in ES6).

Example :
```javascript
var string1 = 'string1';
var string2 = "string2";
var string3 = `string3`;
console.log(string1, string2, string3);
```

If you want to break your string into some lines do the following :
```javascript
var string1 = 'Lorem ipsum dolor sit amet, ' +
'consectetur adipiscing elit.';
var string2 = 'Lorem ipsum dolor sit amet, \
consectetur adipiscing elit.';
console.log(string1);
console.log(string2);
```

And if you want a line break into your string you will have to use the `\n` character or template strings :
```javascript
var string1 = 'Lorem ipsum dolor sit amet, \n' +
'consectetur adipiscing elit.';
var string2 = `Lorem ipsum dolor sit amet, 
consectetur adipiscing elit.`;
console.log(string1);
console.log(string2);
```

You can get properties directly from the string :
```javascript
string1.length;
```

And call some native methods :
```javascript
string1.indexOf('ipsum');
string1.substr(5, 10);
string1.toUpperCase();
// [...]
```

See [here](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) for more informations on available properties and methods.

Variable interpolation is only available in template strings using `${}` :
```javascript
`foo ${string1.substr(0, 5)} bar`;
```

You can use tagged templates to change how expressions are interpolated :
```javascript
function quoteExpression(template, expression) {
  return template[0] + '"' + expression + '"' + template[1];
}
quoteExpression`foo ${string1.substr(0, 5)} bar`;
```

#### Symbols

A symbol is a unique and immutable data type and may be used as an identifier for object properties. 

Example :
```javascript
var symbol1 = Symbol();
var symbol2 = Symbol('description');
```

**Note :** there is no `new` keyword !

Symbol with same description are not equal :
```javascript
Symbol('description') == Symbol('description');
```

Symbols can be created in the global registry.

Example :
```javascript
var symbol1 = Symbol.for('mySymbol');
var symbol2 = Symbol.for('mySymbol');
symbol1 === symbol2;
```

Well-known symbols are built-ins symbols that are part of the language :
* Symbol.iterator
* Symbol.match
* ...

Example :
```javascript
var object = {
  x: 'foo',
  y: 'bar',
  z: 'baz'
};

// Not working...
for (var i of object) {
  console.log(i);
}

object[Symbol.iterator] = function() {
  return {
    keys: Object.keys(object),
    next: function(a) {
      return {
        done: this.keys.length === 0,
        value: object[this.keys.shift()]
      };
    }
  };
};

// Now working !
for (var i of object) {
  console.log(i);
}
```

### Objects

All other values are objects.  
(object = all values that are not primitive)

#### Objects literal

Objects literal are defined using ` { } `.

But beware, object are not like primitive, the variable does not directly contain the object but a reference to that object.

Example :
```javascript
var obj1 = {};
var obj2 = {};
obj1 === obj2;
obj1 === obj1;
```

Example :
```javascript
var obj3 = obj1;
obj1 === obj3;
```

Example :
```javascript
obj1.x = 2;
obj3.x;
```

If you want to store an axisting variable into an object you can use the shortand (ES6).

Example :
```javascript
var x = 2;
var y = 3;
var obj = {
  x,
  y,
  z: 5
};
obj;
```

There is also a shortand for defining a method (ES6).

ES 5 :
```javascript
var obj = {
  add: function (a, b) {
    return a + b;
  }
};
obj.add(1,2);
```

ES 6 :
```javascript
var obj = {
  add (a, b) {
    return a + b;
  }
};
obj.add(1,2);
```

And you can compute property names by using `[]` (ES6).

Example :
```javascript
var propertyName = 'bar';
var obj = {
  [propertyName]: 'bar',
  [propertyName.substr(0, 2) + 'z']: 'baz'
};
obj;
```

You can't combine computed property names and property value shorthands.

#### Arrays

Arrays are defined using ` [ ] ` and like objects are stored as reference.

Example :
```javascript
var array1 = [1, 2, 3, 4, 5];
array1[0];
```

Like strings arrays come with some native properties and methods :
```javascript
array1.length;
array1.pop();
array1.push(6);
array1.shift();
array1.unshift(0);
array1.slice(1, 3);
// [...]
```

See [here](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array) for more informations on available properties and methods.

#### RegExps

Regular expressions are composed of a pattern and optional flags.  
They are created using `/[pattern]/[flags]`.

Example :
```javascript
var regexp = /^(hello).*$/i;
```

Available flags :
* g : global match
* i : ignore case
* m : multiline (`^` and `$` characters are matching each line)
* u : unicode
* y : sticky ((searches in strings only from a specified index)

Uses :
```javascript
var string = 'Hello world !';
regexp.test(string);
regexp.exec(string);
string.match(regexp);
string.replace(regexp, '$1 everybody !');
```

#### Maps && WeakMaps (ES6)

Map is a key/value data structure that can be used for hash-maps.

Example :
```javascript
var map = new Map([['foo', 'bar']]);
map.get('foo');
map.set('foo', 'baz');
map.get('key');
map.has('foo');
map.delete('foo');
map.has('foo');
```

Keys and values can be of any kind :
```javascript
function key () {};
var map = new Map([[key, Symbol()]]);
map.get(symbol);
```

Maps are iterable :
```javascript
var map = new Map([
  ['x', 'foo'],
  ['y', 'bar'],
  ['z', 'baz']
]);
for (var i of map) {
  console.log(i);
}
```

Weakmaps are more limited maps :
* they are not iterable
* some native methods existing for map are not available
* keys can not be primitives (map keys can thus be garbage collected)

#### Sets && weakSets (ES6)

Sets are yet another iterable collection type storing only unique values.

Example :
```javascript
var obj1 = {};
var set = new Set([1, 'foo', obj1]);
for (var i of set) {
  console.log(i);
}

set.delete('foo');
set.has('foo');

set.add(obj1);
set.add({});
for (var i of set) {
  console.log(i);
}
```

Weaksets have the same limitations as weakmaps.

#### Wrappers

Wrappers are constructors that are "alternatives" to short notations like ` ' ' ` for strings or ` { } ` for objects.

Do not use these wrappers with the `new` keyword.

Example :
```javascript
var string = new String("abc");
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

#### Other constructors

Here is some other useful constructors available in JavaScript :
* Date
* Function
* Error
* ...

## References

* [JavaScript](https://en.wikipedia.org/wiki/JavaScript)
* [Basic JavaScript for the impatient programmer](http://www.2ality.com/2013/06/basic-javascript.html)
* [Expressions versus statements in JavaScript](http://www.2ality.com/2012/09/expressions-vs-statements.html)
* [Statements and declarations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements)
* [Expression Statements](http://docstore.mik.ua/orelly/webprog/jscript/ch06_01.htm)
* [JavaScript values: not everything is an object](http://www.2ality.com/2011/03/javascript-values-not-everything-is.html)
* [Categorizing values in JavaScript](http://www.2ality.com/2013/01/categorizing-values.html)
* [ES6 Template Literals in Depth](https://ponyfoo.com/articles/es6-template-strings-in-depth)
* [ES6 Symbols in Depth](https://ponyfoo.com/articles/es6-symbols-in-depth)
* [ES6 Maps in Depth](https://ponyfoo.com/articles/es6-maps-in-depth)
* [ES6 WeakMaps, Sets, and WeakSets in Depth](https://ponyfoo.com/articles/es6-weakmaps-sets-and-weaksets-in-depth)
