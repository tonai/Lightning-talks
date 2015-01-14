# Intro and types

## Foreword

This files contains examples illustrating [this showing](https://prezi.com/3widspvzh9ck/javascript-scope-and-functions/).

You can use the chrome console for the above examples (avoid firebug).

## Functions

### Function declaration

Example :
```javascript
function add(param1, param2) {
  return param1 + param2;
}
```

### Function expression

Example :
```javascript
var add = function (param1, param2) {
  return param1 + param2;
};
```

### Arguments

Example :
```javascript
function myFunc(x, y) {
  console.log(x);
  console.log(y);
}
```

Result :
```javascript
myFunc(1, 2);
myFunc(1);
myFunc();
myFunc(1, 2, 3);
```

Example :
```javascript
function myFunc(x, y) {
  console.log(arguments);
}
```

Result :
```javascript
myFunc(1, 2);
myFunc(1, 2, 3);
```

## Scope

### Global scope

Example :
```javascript
var x = 1;
function myFunc() {
  var x = -3;
}
```

Result :
```javascript
myFunc();
x;
```

Example :
```javascript
var x = 1;
function myFunc() {
  x = -3;
}
```

Result :
```javascript
myFunc();
x;
```

Example :
```javascript
var x = 1;
block: {
  var x = -3;
  console.log(x);
}
```

Result :
```javascript
x;
```

### Hoisted var

Example :
```javascript
function myFunc() {
  console.log(x);
}
```

Result :
```javascript
myFunc();
```

Example :
```javascript
function myFunc() {
  console.log(x);
  if (false) {
    var x = 3;
  }
}
```

Result :
```javascript
myFunc();
```

Same as :
```javascript
function myFunc() {
  var x;
  console.log(x);
  if (false) {
    x = 3;
  }
}
```

### Hoisted function

```javascript
```

```javascript
```

```javascript
```
