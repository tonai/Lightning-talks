# Functional programming

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Concepts used in functional programming](#concepts-used-in-functional-programming)
  - [Anonymous function](#anonymous-function)
  - [First-class function](#first-class-function)
  - [Higher-order function](#higher-order-function)
  - [Tail call](#tail-call)
  - [Referential transparency](#referential-transparency)
  - [Pure function](#pure-function)
    - [Pure or impure ? - 1](#pure-or-impure----1)
    - [Pure or impure ? - 2](#pure-or-impure----2)
    - [Pure or impure ? - 3](#pure-or-impure----3)
    - [Pure or impure ? - 4](#pure-or-impure----4)
- [Other definitions](#other-definitions)
  - [Imperative programming](#imperative-programming)
  - [Declarative programming](#declarative-programming)
  - [Tacit programming](#tacit-programming)
- [Functional programming in JavaScript](#functional-programming-in-javascript)
  - [First-class function and refactoring](#first-class-function-and-refactoring)
  - [Array `forEach`](#array-foreach)
  - [Array `filter`](#array-filter)
  - [Exercise : Generating a tree structure](#exercise--generating-a-tree-structure)
  - [Array `map`](#array-map)
  - [Array `reduce`](#array-reduce)
  - [Exercise : calculate the distance between a point an the origin](#exercise--calculate-the-distance-between-a-point-an-the-origin)
  - [Exercise : Transform a CSV file into a usable JavaScript object](#exercise--transform-a-csv-file-into-a-usable-javascript-object)
  - [Partial application](#partial-application)
  - [Currying](#currying)
  - [Composition](#composition)
  - [Exercise : calculate the distance between a point an the origin using composition](#exercise--calculate-the-distance-between-a-point-an-the-origin-using-composition)
  - [Exercise : Calculate baskets' totals from a JSON web service using promises](#exercise--calculate-baskets-totals-from-a-json-web-service-using-promises)
- [References](#references)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Concepts used in functional programming

### Anonymous function

> In computer programming, an `anonymous function` - also `function literal` or `lambda abstraction` (from the `Lambda calculus` in mathematic) - is a function definition that is not bound to an identifier.

As we have [previously seen](https://github.com/tonai/Lightning-talks/blob/master/JavaScript/01_Vanilla/03_Functions-and-Scope.md), you can't declare an `anonymous function` as a `function declaration`.  
That is to say :
```JavaScript
function () {
  // Do something.
}
// => Uncaught SyntaxError: Unexpected token (
```

Anonymous functions are declared using `function expressions`.  
For example the following code is ok (even if it doesn't do anything) :
```JavaScript
(function () {
  // Do something.
})
```

**Remember :** An expression can not start with `function` because it is reserved for the function declaration statement.

### First-class function

> In computer science, a programming languages supporting `first-class functions` is a language that supports passing functions as arguments to other functions, returning them as the values from other functions, and assigning them to variables or storing them in data structures.

Typically :
```JavaScript
var myFunc = function () {
  // Do something.
}
```

### Higher-order function

> In mathematics and computer science, a `higher-order function` (also `functional` or `functional form`) is a function that does at least one of the following :
> * takes one or more functions as arguments
> * returns a function as its result
>
> All other functions are `first-order functions`.

### Tail call

> In computer science, a `tail call` is a subroutine call performed as the final action of a procedure.  
> If a `tail call` might lead to the same subroutine being called again later in the call chain, the subroutine is said to be tail-recursive, which is a special case of recursion.

In other words it is a recursive function where the recursive call is the final action of the function.

Standard languages have a call stack limitation.  
But in functional programming languages, this special `tail call` case does not create a new stack, because most of the frame of the current procedure is not needed any more, and it can be replaced by the frame of the `tail call`.  
Producing such code instead of a standard call sequence is called `tail call elimination`.

ECMAScript 5 does not implement this optimization but ECMAScript 6 does.

### Referential transparency

> An expression is said to be `referentially transparent` if it can be replaced with its value without changing the behavior of a program (in other words, yielding a program that has the same effects and output on the same input).
>
> The opposite term is `referential opacity`.
>
> As `referential transparency` requires the same results for a given set of inputs at any point in time, a `referentially transparent` expression is therefore `deterministic`.

Arithmetic operations are `referentially transparent` :  
`5 * 5` can be replaced by `25`, for instance.

Assignments (`destructive assignment`) are not `referentially transparent` :  
For instance, the expression `x = x + 1` changes the value assigned to the variable `x`.  
(starting with `x = 10`, then `x = x + 1` is equivalent to `11`, then `x = x + 1` is equivalent to `12`...etc.).

However, calling a function such as the following one is `referentially transparent` :
```JavaScript
function plusOne(x) {
  return x + 1;
}
```

### Pure function

> In computer programming, a function may be considered a `pure function` if both of the following statements about the function hold :
> * The function always evaluates the same result value given the same argument value(s). The function result value cannot depend on any hidden information or state that may change while program execution proceeds or between different executions of the program, nor can it depend on any external input from I/O devices.
> * Evaluation of the result does not cause any semantically observable side effect or output, such as mutation of mutable objects or output to I/O devices
>
> If all functions involved in the expression are `pure functions`, then the expression is `referentially transparent`.  

Can we simplify the following expression ?
`result = f(x) + g(y) * (f(x) - f(x));`

&nbsp;

&nbsp;

&nbsp;

`result = f(x) + g(y) * (0);`

&nbsp;

&nbsp;

&nbsp;

`result = f(x)`

&nbsp;

&nbsp;

&nbsp;

Using the following functions ?
```JavaScript
var a = 0;
function f(b) {
  return a++ + b;
}
function g(c) {
  return c + 1;
}
```

&nbsp;

&nbsp;

&nbsp;

Working with `referentially transparent` expression / `pure function` make it simpler to reason about.

#### Pure or impure ? - 1

```JavaScript
var a = 2;
function add(b) {
  return a + b;
}
```

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

First statement not fulfilled if `a` is altered.

#### Pure or impure ? - 2

```JavaScript
function getHtmlFromId = function(id) {
    return document.getElementById(id).innerHTML;
}
```

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

First statement not fulfilled : DOM can altered.

#### Pure or impure ? - 3

```JavaScript
function add(a, b) {
  console.log(a, b);
  return a + b;
}
```

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

Second statement not fulfilled : output to console.

#### Pure or impure ? - 4

```JavaScript
function append(a) {
  a.push(null);
  return a;
}
```

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

Second statement not fulfilled : the parameter `a` is altered by the `push` method.

## Other definitions

### Imperative programming

> In computer science, `imperative programming` is a `programming paradigm` - a style of building the structure and elements of computer programs - that uses statements (instructions) that change a program's state.
>
> Imperative programming focuses on describing **how** a program operates.

Example => print numbers from 0 to 9 :
```JavaScript
for (var i = 0; i < 10; i++) {
  console.log(i);
}
```

### Declarative programming

> In computer science, `declarative programming` is a `programming paradigm` that expresses the logic of a computation without describing its control flow.

For example SQL is a declarative programming language.  
You don't describe **how** the query should be parsed or executed.

### Tacit programming

> `Tacit programming`, also called `point-free programming`, is a `programming paradigm` in which function definitions do not identify the arguments (or "points") on which they operate.  
> Instead the definitions merely **compose** other functions, among which are `combinators` - `higher-order functions` that uses only function application and earlier defined `combinators` to define a result from its arguments - that manipulate the arguments.

In other words it is the style of programming functions where the parameter is not mentioned.  
UNIX scripting uses this paradigm with pipes.

Example => count distinct URL containing `google` in Apache access log :
```shell
cat access.log | cut -d " " -f 7 | grep 'google' | uniq | wc -l
```

You can create a new "function" for this specific need :
```shell
alias countGoogle='cut -d " " -f 7 | grep 'google' | uniq | wc -l'
cat access.log | countGoogle
```

`countGoogle` is a `tacit or point-free composition`.

## Functional programming in JavaScript

### First-class function and refactoring

Imagine the following code :
```JavaScript
var unicornEl = document.getElementById('unicorn');
unicornEl.className += ' is-magic';
spin(unicornEl);

var fairyEl = document.getElementById('fairy');
fairyEl.className += ' is-magic';
sparkle(fairyEl);

var kittenEl = document.getElementById('kitten');
kittenEl.className += ' is-magic';
rainbowTrail(kittenEl);
```

It can clearly be re-factored using this kind of function :
```JavaScript
function addMagic(id, effect) {
  var element = document.getElementById(id);
  element.className += ' is-magic';
  effect(element);
}
```

And then call it :
```JavaScript
addMagic('unicorn', spin);
addMagic('fairy', sparkle);
addMagic('kitten', rainbow);
```

### Array `forEach`

But now, what if we need to call the `addMagic` function successively a lot of time ?  
We can use an array and iterate through like this :
```JavaScript
var magicalArray = [
  {id: 'unicorn', effect: spin},
  {id: 'fairy',   effect: sparkle},
  {id: 'kitten',  effect: rainbow},
  // [...]
];
for (var i = 0; i < magicalArray.length; i++) {
  addMagic(magicalArray[i].id, magicalArray[i].effect);
}
```

And what if we need to pass more data for each element in the array ? (like the class name...etc.)

Let's rework our `addMagic` function so that it can be called with a simple (and extensible) argument :
```JavaScript
function addMagic(obj) {
  var element = document.getElementById(obj.id);
  element.className += ' ' + obj.className;
  effect(obj.element);
}
```

```JavaScript
for (var i = 0; i < magicalArray.length; i++) {
  addMagic(magicalArray[i]);
}
```

Iterating over an array is a really common feature that we can make a function for that (an `higher-order function`) :
```JavaScript
function forEach (func, array) {
  for (var i = 0; i < array.length; i++) {
    func(array[i]);
  }
}
```

Now it becomes :
```JavaScript
var magicalArray = [
  {id: 'unicorn', effect: spin    , className: 'is-magic'},
  {id: 'fairy',   effect: sparkle , className: 'is-magic'},
  {id: 'kitten',  effect: rainbow , className: 'is-magic'},
  // [...]
];

forEach(addMagic, magicalArray);
```

Iterating over an array is so a common feature that is included in the language itself since [ECMAScript 5 (> IE8)](http://kangax.github.io/compat-table/es5/#test-Array_methods_Array.prototype.forEach) :
```JavaScript
magicalArray.forEach(addMagic);
```

The callback passed to `forEach` will get the element itself as the first argument and the element's index in the array as the second argument.

We have now transformed the code from an `imperative style` to a `declarative style`.  
We also make are code more composable.  
Convinced ? Let's continue.

### Array `filter`

Let's imagine we have the following data :
```JavaScript
var animals = [
  {species: 'dog', name: 'Pongo'},
  {species: 'cat', name: 'Duchesse'},
  {species: 'cat', name: 'Thomas O\'Malley'},
  {species: 'dog', name: 'Perdita'},
  {species: 'dog', name: 'Lucky'},
  {species: 'cat', name: 'Berlioz'},
  {species: 'cat', name: 'Toulouse'},
];
```

And we only want the dogs.  
Let's do it in the `imperative style` :
```JavaScript
var dogs = [];
for (var i = 0; i < animals.length; i++) {
  if (animals[i].species === 'dog') {
    dogs.push(animals[i]);
  }
}
```

Now use the `filter` function :
```JavaScript
var dogs = animals.filter(function(animal) {
  return animal.species === 'dog';
});
```

Advantages ?

1. It is a shorter syntax (less code means less bug)
2. We have decoupled the filtering functionality from the test

Let's write it a little bit different :
```JavaScript
var isDog = function(animal) {
  return animal.species === 'dog';
};
var dogs = animals.filter(isDog);
```

The `isDog` function can be easily reused and is only doing what its name says.  
`isDog` is a pure function !

### Exercise : Generating a tree structure

Imagine the following data :
```JavaScript
var menuItems = [
  {id: 1, parent: null, title: 'root'},
  {id: 2, parent: 1, title: 'Menu 1'},
  {id: 3, parent: 1, title: 'Menu 2'},
  {id: 4, parent: 2, title: 'Menu 1/1'},
  {id: 5, parent: 2, title: 'Menu 1/2'},
  {id: 6, parent: 3, title: 'Menu 2/1'},
  {id: 7, parent: 3, title: 'Menu 2/2'}
];
```

Desired format :
```JavaScript
var tree = {
  'root': {
    'Menu 1': {
      'Menu 1/1': {},
      'Menu 1/2': {}
    },
    'Menu 2': {
      'Menu 2/1': {},
      'Menu 2/2': {}
    }
  }
};
```

Create a recursive function for generating the desired tree structure.

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

Solution :
```JavaScript
function makeTree(flatList, parentId) {
  var tree = {};
  flatList
    .filter(function(item){
      return item.parent === parentId;
    })
    .forEach(function(item){
      tree[item.title] = makeTree(flatList, item.id);
    });
  return tree;
}

var tree = makeTree(menuItems, null);
```

### Array `map`

`map` allow us to iterate through each items in a array and return a new array of the same length where each items have been mapped with the given function.

Let's say we only want the name of the animals :
```JavaScript
var names = animals.map(function(animal) {
  return animal.name;
});
```

### Array `reduce`

`reduce` is a "swiss army knife" function you can use on an array and get a transformation of that array.

Let's say we want to get the total number of characters in the animal names :
```JavaScript
var total = animals.reduce(function(previousReturnValue, animal) {
  return previousReturnValue + animal.name.length;
}, 0);
```

`reduce` take 2 arguments, the second one being the initial value of the iteration.

The callback for reduce will get the return value from the previous iteration as the first argument.  
It will be equal to the initial value at the first iteration.

You can the following code to see what is happening :
```JavaScript
var total = animals.reduce(function(previousReturnValue, animal) {
  console.log(previousReturnValue);
  return previousReturnValue + animal.name.length;
}, 0);
```

### Exercise : calculate the distance between a point an the origin

Imagine the following object :
```JavaScript
var point = {
  x: 2,
  y: 3,
  z: 5,
  toString: function() {
    return '(' + this.x + ';' + this.y + ';' + this.z + ')';
  }
};
```

The mathematic formula needed is :
```JavaScript
d=√(x²+y²+z²)
```

Now create a function that will calculate the distance for the given object.

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

Solution :
```JavaScript
var distance = function(point) {
  var value = Object.values(point)
    .filter(function(coordinate){
      return typeof coordinate == 'number';
    })
    .map(function(coordinate) {
      return coordinate * coordinate;
    })
    .reduce(function(previousReturnValue, coordinate){
      return previousReturnValue + coordinate;
    }, 0);
  return Math.sqrt(value);
};
```

Now use ES6 arrow function.

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

Solution :
```JavaScript
var distance = function(point) {
  var value = Object.values(point)
    .filter(x => typeof x == 'number')
    .map(x => x * x)
    .reduce((a, b) => a + b, 0);
  return Math.sqrt(value);
};
```

Do you see the power ?  
ES6 arrow function syntax perfectly suits with functional programming.

### Exercise : Transform a CSV file into a usable JavaScript object

CSV input file `03_input.csv` :
```CSV
John,Doe,Jacket,70,1
John,Doe,Socks,10,2
Nikita,Smith,Dress,50,1
Nikita,Smith,Tights,10,3
Nikita,Smith,Shoe,90,1
```

JavaScript desired output :
```JavaScript
var output = {
  'John Doe': [
    {name: "Jacket", price: 70, quantity: 1},
    {name: "Socks", price: 10, quantity: 2}
  ],
  'Nikita Smith': [
    {name: "Dress", price: 50, quantity: 1},
    {name: "Tights", price: 10, quantity: 3},
    {name: "Shoe", price: 90, quantity: 1}
  ]
};
```

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

Solution :
```JavaScript
var fs = require('fs');

var output = fs.readFileSync('01_input.csv', 'utf8')
  .trim()
  .split('\n')
  .map(line => line.split(','))
  .reduce((customers, line) => {
    var name = line[0] + ' ' + line[1];
    customers[name] = customers[name] || [];
    customers[name].push({
      name: line[2],
      price: line[3],
      quantity: line[4]
    });
    return customers;
  }, {});

console.log(JSON.stringify(output, null, 2));
```

### Partial application

> In computer science, `partial application` (or `partial function application`) refers to the process of fixing a number of arguments to a function, producing another function of smaller arity.

Imagine the following HTML code :
```HTML
<div>
  <button class="toggle">Toggle button</button>
  <div class="content">
    Lorem ipsum...
  </div>
</div>
```

And the following event listener :
```JavaScript
var toggle = function() {
  var target = document.getElementsByClassName('content')[0];
  var className = 'hidden';
  target.classList.toggle(className);
};
```

Binded to the DOM element :
```JavaScript
var trigger = document.getElementsByClassName('toggle')[0];
trigger.addEventListener('click', toggle);
```

[CodePen example](http://codepen.io/tonai/pen/mPbNzX).

Now what if we want to create a show and a hide button ?
```HTML
<div>
  <button class="toggle">Toggle button</button>
  <button class="show">Show button</button>
  <button class="hide">Hide button</button>
  <div class="content">
    Lorem ipsum...
  </div>
</div>
```

```JavaScript
var trigger = document.getElementsByClassName('toggle')[0];
trigger.addEventListener('click', toggle);
var trigger = document.getElementsByClassName('show')[0];
trigger.addEventListener('click', open);
var trigger = document.getElementsByClassName('hide')[0];
trigger.addEventListener('click', close);
```

We can create a separate `show` and `hide` functions and call them into the `toggle` function :
```JavaScript
var show = function() {
  var target = document.getElementsByClassName('content')[0];
  var className = 'hidden';
  target.classList.remove(className);
}

var hide = function() {
  var target = document.getElementsByClassName('content')[0];
  var className = 'hidden';
  target.classList.add(className);
}






var toggle = function() {
  var target = document.getElementsByClassName('content')[0];
  var className = 'hidden';
  if ((index = (target.className || '').indexOf(className)) !== -1) {
    show();
  } else {
    hide();
  }
};
```

[CodePen example](http://codepen.io/tonai/pen/zqOgEx).

It does not feel really re-factored...

How about using an other argument in the previous toggle version to enforce the desired state ?
```JavaScript
var toggle = function(state) {
  var target = document.getElementsByClassName('content')[0];
  var className = 'hidden';
  var index = (target.className || '').indexOf(className);
  if (state === true || (state !== false && index !== -1)) {
    target.classList.remove(className);
  } else {
    target.classList.add(className);
  }
};
```

Now how am I creating the `show` and `hide` function ? By using `partial application`.  
Here we want to pre-fill the state property with the desired value `true` or `false`.  
In JavaScript this can be done by using the `bind` function :
```JavaScript
var show = toggle.bind(null, true);
var hide = toggle.bind(null, false);
```

Or directly in the event listeners declaration :
```JavaScript
var trigger = document.getElementsByClassName('toggle')[0];
trigger.addEventListener('click', toggle.bind(null, null));
var trigger = document.getElementsByClassName('show')[0];
trigger.addEventListener('click', toggle.bind(null, true));
var trigger = document.getElementsByClassName('hide')[0];
trigger.addEventListener('click', toggle.bind(null, false));
```

And why not doing the same for the target element and the className ?
```JavaScript
var toggle = function(className, target, state) {
  var index = (target.className || '').indexOf(className);
  if (state === true || (state !== false && index !== -1)) {
    target.classList.remove(className);
  } else {
    target.classList.add(className);
  }
};
```

```JavaScript
var className = 'hidden';
var target = document.getElementsByClassName('content')[0];
var trigger = document.getElementsByClassName('toggle')[0];
trigger.addEventListener('click', toggle.bind(null, className, target, null));
var trigger = document.getElementsByClassName('show')[0];
trigger.addEventListener('click', toggle.bind(null, className, target, true));
var trigger = document.getElementsByClassName('hide')[0];
trigger.addEventListener('click', toggle.bind(null, className, target, false));
```

[CodePen example](http://codepen.io/tonai/pen/jqNgoj).

### Currying

> In mathematics and computer science, `currying` is the technique of translating the evaluation of a function that takes multiple arguments (or a tuple of arguments) into evaluating a sequence of functions, each with a single argument.

In JavScript the curry function is not native and you will need to write it yourself or to use an external library like : underscore, lodash, ramda, functional.js, fnjs...etc.

Let's imagine we have the following data :
```JavaScript
var animals = [
  {species: 'dog', name: 'Pongo'},
  {species: 'cat', name: 'Duchesse'},
  {species: 'cat', name: 'Thomas O\'Malley'},
  {species: 'dog', name: 'Perdita'},
  {species: 'dog', name: 'Lucky'},
  {species: 'cat', name: 'Berlioz'},
  {species: 'cat', name: 'Toulouse'}
];
```

And we only want the dogs.  
But instead of using a `isDog` function we will use a more generic function `isSomeSpecies` which take the species we want to filter on as first argument :
```JavaScript
var isSomeSpecies = function(species, animal) {
  return animal.species === species;
};
```

Now how do we use this function in the filter ?
```JavaScript
var dogs = animals.filter(/*isSomeSpecies ?*/);
```

&nbsp;

&nbsp;

&nbsp;

By using the curry function :
```JavaScript
var R = require('ramda');

isSomeSpecies = R.curry(isSomeSpecies);

var dogs = animals.filter(isSomeSpecies('dog'));
```

Easy right ?

Curried function are real practical and easy to use :
```JavaScript
var R = require('ramda');

var someOperation = function(a, b, c) {
  return a + b * c;
}
someOperation = R.curry(someOperation);

someOperation(1, 2, 3); // 7
someOperation(1)(2)(3); // 7
someOperation(1, 2)(3); // 7
someOperation(1)(2, 3); // 7
```

So easy you can turn all your code using curried functions.  
Just take care of the arguments order.

Some libraries have a `curryRight` function which take the arguments in the reverse order :
```JavaScript
var fn = require('fn.js');
var someOperation = function(a, b, c) {
  return a + b * c;
}
someOperation = fn.curryRight(someOperation);
someOperation(3)(2)(1); // 7
```

### Composition

Composition is a tool for combining simple functions together.

The idea is to use functions that take only argument, to combine them together and to return a new function.  
The output of each function populates the input of the next function.

Like `curry`, the `compose` function can be found in functional programming libraries.

Example :
```JavaScript
var R = require('ramda');

function convertLinks(text) {
  var pattern = /\[([^\]]*)\]\(([^\)]*)\)/i;
  return text.replace(pattern, '<a href="$2">$1</a>');
}

function convertParagraph(text) {
  var pattern = /([\n]{2,})/ig;
  return text.replace(pattern, '</p><p>');
}

function convertLineBreak(text) {
  var pattern = /(\n)/ig;
  return text.replace(pattern, '<br/>');
}

function wrapWithParagraph(text) {
  return '<p>' + text + '</p>';
}

var input = `Functional programming

A lightning talk explaining the concept of functional programming in JavaScript.
Written by Tony Cabaye.

Support is available [here](https://github.com/tonai/Lightning-talks)`;

var processSimpleMarkdown = R.compose(wrapWithParagraph, convertLineBreak, convertParagraph, convertLinks);

var output = processSimpleMarkdown(input);
```

Here the order of execution inside `processSimpleMarkdown` is :

1. `convertLinks`
2. `convertParagraph`
3. `convertLineBreak`
4. `wrapParagraph`

Because it is related to that notation :
```JavaScript
processSimpleMarkdown = function(input) {
  return wrapWithParagraph(convertLineBreak(convertParagraph(convertLinks(input))));
}
```

you may wonder why the `compose` is useful if it can be written like above.  
Because you can combine it with curried function.  
For example by simply changing the `wrapParagraph` into a more generic function :
```JavaScript
function wrapWithTag(tag, text) {
  return '<' + tag + '>' + text + '</' + tag + '>';
}
wrapWithTag = R.curry(wrapWithTag);

var processSimpleMarkdown = R.compose(wrapWithTag('p'), convertLineBreak, convertParagraph, convertLinks);
```

 This is much simpler than the nested version.

 **Note :** in the Example above `processSimpleMarkdown` is `point-free style` defined function because parameters are not explicit (because it is a composition of other functions).

If you prefer the UNIX scripting reading direction, some libraries have a `pipe` function which take the arguments in the reverse order :
```JavaScript
var processSimpleMarkdown = R.pipe(convertLinks, convertParagraph, convertLineBreak, wrapWithParagraph);
```

### Exercise : calculate the distance between a point an the origin using composition

Like above, imagine the following object :
```JavaScript
var point = {
  x: 2,
  y: 3,
  z: 5,
  toString: function() {
    return '(' + this.x + ';' + this.y + ';' + this.z + ')';
  }
};
```

And by using the following small functions :
```JavaScript
var R = require('ramda');

function square(value) {
  return value * value;
}

function sum(a, b) {
  return a + b;
}

function istypeOf(type, coordinate) {
  return typeof coordinate == type;
}
istypeOf = R.curry(istypeOf);
```

Take a look to following [Ramda](http://ramdajs.com/docs/) functions :
* [filter](http://ramdajs.com/docs/#filter)
* [map](http://ramdajs.com/docs/#map)
* [reduce](http://ramdajs.com/docs/#reduce)

And create a `distance` function that is a composition.

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

Solution :
```JavaScript
var filterOnlyNumbers = R.filter(istypeOf('number'));
var squareMap = R.map(square);
var sumTogether = R.reduce(sum, 0);

var distance = R.compose(Math.sqrt, sumTogether, squareMap, filterOnlyNumbers, Object.values);
// OR
var distance = R.pipe(Object.values, filterOnlyNumbers, squareMap, sumTogether, Math.sqrt);

var result = distance(point);
```

### Exercise : Calculate baskets' totals from a JSON web service using promises

Imagine we get a JSON web service with the following output :
```JSON
{
  "baskets": {
    "John Doe": [
      {"name": "Jacket", "price": 70, "quantity": 1},
      {"name": "Socks", "price": 10, "quantity": 2}
    ],
    "Nikita Smith": [
      {"name": "Dress", "price": 50, "quantity": 1},
      {"name": "Tights", "price": 10, "quantity": 3},
      {"name": "Shoe", "price": 90, "quantity": 1}
    ]
  }
}
```
You can create the web service by using [json-server](https://github.com/typicode/json-server).

Use the following function to get the promised content :
```JavaScript
var request = require('ajax-request');
const URL = 'http://localhost:3000/db';

function getBaskets() {
  return new Promise(function(resolve, reject){
    request(URL, function(err, res, body){
      if (err) {
        reject(body);
      } else {
        resolve(body);
      }
    });
  });
}
```

Cut the application into small pieces and use above techniques in association with promises to get the total for each basket.

You might need following [Ramda](http://ramdajs.com/docs/) functions  :
* [prop](http://ramdajs.com/docs/#prop)
* [map](http://ramdajs.com/docs/#map)
* [reduce](http://ramdajs.com/docs/#reduce)
* [mapObjIndexed](http://ramdajs.com/docs/#mapObjIndexed)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

Small functions :
```JavaScript
var R = require('ramda');

function sum(a, b) {
  return a + b;
}
sum = R.curry(sum);

function itemTotal(basketItem) {
  return basketItem.price * basketItem.quantity;
}
```

All together :
```JavaScript
getBaskets()
  .then(JSON.parse)
  .then(R.prop('baskets'))
  .then(R.mapObjIndexed(R.map(itemTotal)))
  .then(R.mapObjIndexed(R.reduce(sum, 0)))
  .then(console.log);
```

**Warning :** Here we can't transform `R.mapObjIndexed(R.map(itemTotal))` with a composition because when we add the parameter it look like this `R.mapObjIndexed(R.map(itemTotal))(input)` and it is not what it is intended for composition (`R.mapObjIndexed(R.map(itemTotal(input)))`).

## References

* [Functional programming](https://en.wikipedia.org/wiki/Functional_programming)
* [Anonymous function](https://en.wikipedia.org/wiki/Anonymous_function)
* [Lambda calculus](https://en.wikipedia.org/wiki/Lambda_calculus)
* [First-class function](https://en.wikipedia.org/wiki/First-class_function)
* [Higher-order function](https://en.wikipedia.org/wiki/Higher-order_function)
* [Tail call](https://en.wikipedia.org/wiki/Tail_call)
* [Pure function](https://en.wikipedia.org/wiki/Pure_function)
* [Referential transparency](https://en.wikipedia.org/wiki/Referential_transparency)
* [Imperative programming](https://en.wikipedia.org/wiki/Imperative_programming)
* [Declarative programming](https://en.wikipedia.org/wiki/Declarative_programming)
* [Tacit programming](https://en.wikipedia.org/wiki/Tacit_programming)
* [Partial application](https://en.wikipedia.org/wiki/Partial_application)
* [Currying](https://en.wikipedia.org/wiki/Currying)
* [A Gentle Introduction to Functional JavaScript](http://jrsinclair.com/articles/2016/gentle-introduction-to-functional-javascript-intro/)
* [Why Curry Helps](https://hughfdjackson.com/javascript/why-curry-helps/)
* [funfunfunction](https://www.youtube.com/channel/UCO1cgjhGzsSYb1rsB4bFe4Q)
