# Types and operators

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Operators](#operators)
  - [Primary expressions](#primary-expressions)
    - [Grouping operator `()`](#grouping-operator-)
  - [Left-hand-side expressions](#left-hand-side-expressions)
    - [Spread operator `...` (ES6)](#spread-operator--es6)
  - [Increment and decrement](#increment-and-decrement)
    - [Decrement operator `--`](#decrement-operator---)
  - [Unary operators](#unary-operators)
    - [`delete` operator](#delete-operator)
    - [`void` operator](#void-operator)
    - [Unary `typeof` operator](#unary-typeof-operator)
    - [Unary negation operator](#unary-negation-operator)
    - [Unary plus operator](#unary-plus-operator)
    - [Bitwise NOT operator `~`](#bitwise-not-operator-)
    - [Logical NOT `!`](#logical-not-)
  - [Arithmetic operators](#arithmetic-operators)
    - [Addition operator `+`](#addition-operator-)
    - [Subtraction operator `-`](#subtraction-operator--)
    - [Division operator `/`](#division-operator-)
    - [Multiplication operator `*`](#multiplication-operator-)
    - [Remainder operator `%`](#remainder-operator-%25)
  - [Relational oparators](#relational-oparators)
    - [`in` operator](#in-operator)
    - [`instanceof` operator](#instanceof-operator)
    - [Greater than `>` and greater than or equal `>=` operator](#greater-than--and-greater-than-or-equal--operator)
    - [Less than `<` and less than or equal `<=` operator](#less-than--and-less-than-or-equal--operator)
  - [Equality operators](#equality-operators)
    - [Equality `!=` and Inequality `==`](#equality--and-inequality-)
    - [Identity (Strict equality) `===`and Nonidentity `!==`](#identity-strict-equality-and-nonidentity-)
  - [Bitwise shift operators](#bitwise-shift-operators)
    - [Bitwise left shift `<<`](#bitwise-left-shift-)
    - [Bitwise right shift operator `>>`](#bitwise-right-shift-operator-)
    - [Bitwise unsigned right shift operator `>>>`](#bitwise-unsigned-right-shift-operator-)
  - [Binary bitwise Operators](#binary-bitwise-operators)
    - [Bitwise AND `&`](#bitwise-and-&)
    - [Bitwise AND `|`](#bitwise-and-)
    - [Bitwise XOR `^`](#bitwise-xor-%5E)
  - [binary logical Operators](#binary-logical-operators)
    - [Logical AND `&&`](#logical-and-&&)
    - [Logical OR `||`](#logical-or-)
  - [Assignment operators](#assignment-operators)
  - [Destructuring assignment (ES6)](#destructuring-assignment-es6)
    - [Arrays](#arrays)
    - [Objects](#objects)
  - [Other operators](#other-operators)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Operators

### Primary expressions

Basic keywords and general expressions in JavaScript.

It regroups the following :
* `this`
* `yield` / `yield*` (ES6)
* array initializer `[]` / object initializer `{}` / regexp initializer `//`
* ...

#### Grouping operator `()`

Example :
```javascript
(false && false) || true;
false && (false || true);
```

[Here the full Operator precedence table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence).

### Left-hand-side expressions

Left values are the destination of an assignment.

It regroups the following :
* `new`
* `super` (ES6)
* Property accessors
* ...

#### Spread operator `...` (ES6)

Classically used on an array in an function call to spread all array items as arguments :
```javascript
function add(a, b, c) {
  return a + b + c;
}
add(...[1, 2, 3]);
add(1, ...[2, 3]);
add(...[1, 2], 3);
```

But can also be used for array concatenation :
```javascript
[1, 2, ...[3, 4, 5], 6, 7];
```

### Increment and decrement

Postfix/prefix increment and postfix/prefix decrement operators.

"### Increment operator `++`

Example :
```javascript
x++;
++x;
```

#### Decrement operator `--`

Example :
```javascript
x--;
--x;
```

### Unary operators

A unary operation is operation with only one operand.

#### `delete` operator

Deletes a property from an object :
```javascript
delete array[1];
array;
array.length;
delete object[1];
object;
```

#### `void` operator

Discards an expression's return value :
```javascript
void x;
void (x + y);
```

#### Unary `typeof` operator

Use typeof to find out whether a given value is an object or a primitive and, in the latter case, what type of primitive it is.

Example :
```javascript
typeof true;
typeof 1;
typeof "aze";
typeof [];
typeof {};
var myVar; typeof myVar;
typeof Symbol("foo");
```

&nbsp;

&nbsp;

typeof WAT :
```javascript
typeof (function(){});
typeof null;
typeof NaN;
```

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

![WAT](http://i2.kym-cdn.com/photos/images/original/000/173/576/Wat8.jpg)

But above results are known "bug" and since they exist from a long time, we must deal with them...

#### Unary negation operator

Example :
```javascript
-x;
```

#### Unary plus operator

Convert to number :
```javascript
+x;
```

#### Bitwise NOT operator `~`

Inverts the bits of its operand :
```javascript
~0b111;
~7;
```


#### Logical NOT `!`

Example :
```javascript
!true;
```

### Arithmetic operators

Arithmetic operators take numerical values (either literals or variables) as their operands and return a single numerical value.

#### Addition operator `+`

Example :
```javascript
var x = 1;
var y = 2;
x + y;
```

This operator is also used for concatenating strings :
```javascript
'hello' + ' ' + 'world';
```

If a number is "added" to a string, the result will be a string :
```javascript
1 + ' world';
```

#### Subtraction operator `-`

Example
```javascript
x - y;
```

#### Division operator `/`

Example :
```javascript
x / y;
```

#### Multiplication operator `*`

Example :
```javascript
x * y;
```

#### Remainder operator `%`

Example :
```javascript
x % y;
```

### Relational oparators

A comparison operator compares its operands and returns a Boolean value based on whether the comparison is true.

#### `in` operator

Example :
```javascript
var x = 3;
var array = [1, 2, 3];
var object = {1: 1, 2: 2, 3: 3};
x in array;
x in object;
```

#### `instanceof` operator

Use instanceof to determine whether an object is an instance of a given type. instanceof always returns false for primitive values. 

Example :
```javascript
({} instanceof Object);
[] instanceof Object;
(function() {} instanceof Function);
(function() {} instanceof Object);
new Date() instanceof Date;
new Date() instanceof Object;
true instanceof Object;
mySymbol instanceof Symbol
```

Example :
```javascript
function Point(x, y) {
  this.x = x;
  this.y = y;
}
var point = new Point(1, 2);
point instanceof Point;
point instanceof Object;
```

#### Greater than `>` and greater than or equal `>=` operator

Example :
```javascript
x > y;
x >= y;
```

#### Less than `<` and less than or equal `<=` operator

Example
```javascript
x < y;
x <= y;
```

### Equality operators

The result of evaluating an equality operator is always of type Boolean based on whether the comparison is true

#### Equality `!=` and Inequality `==`

Example
```javascript
x == y;
x != y;
```

#### Identity (Strict equality) `===`and Nonidentity `!==`

Example :
```javascript
x === y;
x !== y;
```

### Bitwise shift operators

Operations to shift all bits of the operand.

#### Bitwise left shift `<<`

Shifts bits x places to the left by shifting in zeroes from the right :
```javascript
7 << 2;
0b111 << 2 === 0b11100;
```

#### Bitwise right shift operator `>>`

Shifts bits x places to the right by discarding bits shifted off :
```javascript
-7 >> 2; // 0b11111111111111111111111111111001 >> 2;
0b11111111111111111111111111111001 >> 2 === 0b11111111111111111111111111111110 >> 0;
```

#### Bitwise unsigned right shift operator `>>>`

Shifts bits x places to the right by discarding bits shifted off, and shifting in zeroes from the left :
```javascript
-7 >>> 2; // 0b11111111111111111111111111111001 >>> 2;
0b11111111111111111111111111111001 >>> 2 === 0b00111111111111111111111111111110;
```

### Binary bitwise Operators

Bitwise operators treat their operands as a set of 32 bits (zeros and ones) and return standard JavaScript numerical values.

#### Bitwise AND `&`

Returns a one in each bit position for which the corresponding bits of both operands are ones :
```javascript
7 & 9;
```

#### Bitwise AND `|`

Returns a one in each bit position for which the corresponding bits of either or both operands are ones :
```javascript
7 | 9;
```

#### Bitwise XOR `^`

Returns a one in each bit position for which the corresponding bits of either but not both operands are ones :
```javascript
7 ^ 9;
```
This also works with booleans.

### binary logical Operators

#### Logical AND `&&`

Example :
```javascript
true && false;
```

More precisely, it will return as result in order :
* the first falsy value (`undefined`, `null`, `false`, `0`, `NaN`, `''`)
* if not the last truthy value

Example :
```javascript
false && 0;
0 && false;
true && 1;
1 && true;
true && false && 0 && 1;
```

#### Logical OR `||`

Example :
```javascript
true || false;
```

More precisely, it will return as result in order :
* the first truthy value
* if not the last falsy value

Example :
```javascript
false || 0;
0 || false;
true || 1;
1 || true;
false || true || 1 || 0;
```

### Assignment operators

An assignment operator assigns a value to its left operand based on the value of its right operand.

```javascript
x = y;
x += y;
x -= y;
x *= y;
x /= y;
x %= y;
x &= y;
x |= y;
x ^= y;
x <<= y;
x >>= y;
x >>>= y;
```

### Destructuring assignment (ES6)

This is quite similar to the `list()` construct in PHP.

#### Arrays

Example :
```javascript
var array = ['foo', 'bar', 'baz'];
var [a, b, c] = array;
console.log(a, b, c);
```

You can skip items you don't need :
```javascript
var array = ['foo', 'bar', 'baz'];
var [, , d] = array;
console.log(d);
```

You can use it recursively :
```javascript
var array = ['foo', ['bar', 'baz']];
var [e, [f , g]] = array;
console.log(e, f, g);
```

It's ok for swapping variables :
```javascript
var a = 1;
var b = 2;
[a, b] = [b, a];
console.log(a, b);
```

#### Objects

Example
```javascript
var myObject = {x: 2, y: 3, z: 5};
var {x, z} = myObject;
console.log(x, z);
```

**Remember:** An expression can not start with `{`.

You can use aliases if you don't want the property name to be the name of the variable (or if you can't) :
```javascript
var myObject = {x: 2, y: 3, z: 5};
var {x: foo, z: bar} = myObject;
console.log(foo, bar);
```

When using aliases, you can combine it with computed property names :
```javascript
var myObject = {x: 2, y: 3, z: 5};
var propertyName = 'x';
var {[propertyName]: foo} = myObject;
console.log(foo);
```

You can also define default values :
```javascript
var myObject = {foo: 'bar', baz: undefined};
var {foo = 1, bar = 2, baz = 3} = myObject;
console.log(foo, bar, baz);
```

Like for arrays it can also be used recursively and combined :
```javascript
var myObject = {
  foo: {
    bar: [2, 3]
  }
};
var {foo: {bar: [x = 1, y = 2, z = 3]}} = myObject;
console.log(x, y, z);
```

### Other operators

Conditional (ternary) operator `?` :
```javascript
y >= 0 ? y : -y;
``

Comma operator `,` :
```javascript
1 + 1, 2 + 2;
```

## WAT !

Example :
```javascript
[] + [];
```

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

![WAT](http://i0.kym-cdn.com/photos/images/original/000/195/379/1320452774001.png)

Same as :
```javascript
[].toString() + [].toString();
```

&nbsp;

&nbsp;

Example :
```javascript
[] + {};
```

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

![WAT](http://i0.kym-cdn.com/photos/images/original/000/173/575/25810.jpg)

Same as :
```javascript
[].toString() + {}.toString();
```

&nbsp;

&nbsp;

Example :
```javascript
{} + [];
```

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

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

&nbsp;

&nbsp;

Example :
```javascript
{} + {};
```

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

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

&nbsp;

&nbsp;

Example :
```javascript
({} + {});
```

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

![WAT](http://i1.kym-cdn.com/photos/images/original/000/173/589/RsLid.jpg)

Same as :
```javascript
{}.toString() + {}.toString();
```

Because `({} + {});` is an expression and `{} + {};` is a statement.
(because expression can'y start with `{`)

## References

* [WAT](https://www.destroyallsoftware.com/talks/wat)
* [What is {} + {} in JavaScript?](http://www.2ality.com/2012/01/object-plus-object.html)
* [Expressions and operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators)
* [Assignment operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Assignment_Operators)
* [ES6 JavaScript Destructuring in Depth](https://ponyfoo.com/articles/es6-destructuring-in-depth)
