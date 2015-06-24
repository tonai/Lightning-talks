# CSS rules

## Foreword

Presentation time needed : 30min

## Writing a rule

### Simple selectors

When writing a CSS rule you can use multiples basic types of selectors :
* Universal selector `*` will match all DOM elements.
* HTML tag name selector (like `strong`, `div`...etc.) will match targeted DOM elements.
* Class selector start with a dot (`.`) and will match all DOM elements whose `class` attribute contains the targeted class.
* ID selector start with a hash (`#`) and will match all DOM elements whose `id` attribute is equal to the targeted class.

Reminder : Multiple elements in a document can have the same class value but the id name must be unique in the document.

You can also combine the HTML tag name selector with the class selector or the id selector for selecting a DOM element corresponding to both conditions.
Example :
```CSS
a.highlight {
  font-weight: bold;
  font-size: 120%;
}
```
Will apply all styles included in the declaration block to all `a` elements having the `highlight` class.

### Attributes selectors

Attributes selector are writen using hooks (`[` and `]`) and are used to match specific DOM elements based on their attributes :
* `[att]` will match all DOM elements possessing the targeted attribute, whatever the value of the attribute.
* `[att=val]` will match all DOM elements whose targeted attribute is equal to the specified value.
* `[att~=val]` will match all DOM elements whose targeted attribute contains exactly the specified value considering the attribute value as a whitespace-separated list of words (like the class selector).
* `[att|=val]` will match all DOM elements whose targeted attribute is equal to the specified value or begins with that value immediately followed by a dash `-`.
* `[att^=val]` will match all DOM elements whose targeted attribute begins with the specified value.
* `[att$=val]` will match all DOM elements whose targeted attribute ends with the specified value.
* `[att*=val]` will match all DOM elements whose targeted attribute contains the specified value.

Attribute selectors can be used independently or combined with a simple selector.
Example :
```CSS
code[hreflang=fr] {
  background-color: white;
}
```
Will apply all styles included in the declaration block to all `code` elements having the `hreflang` attribute equal to `fr` or strating with `fr` immediately followed by a dash `-` (like `fr-fr`...etc.).

### Pseudo-classes

A CSS pseudo-class start with a colon (`:`) followed by a keyword that is added to selectors that specifies a special case of the element to be selected.
Example :
```CSS
a:hover {
  text-decoration: underline;
  color: red;
}
```
Will apply all styles included in the declaration block to all `a` elements when they are hovered.

Some usefull pseudo-class :
* `:hover` : activates when an element is hovered by mouse
* `:checked` : activates when an form element (radio, checkbox or select option) is in `on` state.
* `:first-child` : activates if the element is the first child of its parent.
* `:last-child` : activates if the element is the last child of its parent.

See [here](http://www.w3.org/TR/selectors/#selectors) for a complete list of pseudo-classes.

### Pseudo-elements

Pseudo-elements can be used for selecting specific part inside a DOM element.

They start with two colons (`::`) followed by a keyword, but they can also be writen with a single colon (old CSS2 syntax) :
* `::after`	: inserts content after matched elements.
* `::before` : inserts content before matched elements.
* `::first-letter` : selects the first letter of matched elements.
* `::first-line` : selects the first line of matched elements.
* `::selection` : selects the portion of matched elements that is selected by a user

### Combinators

You can use combinators for selecting more precisely some elements by using relationships between selectors.
Combinator are used to separate 2 sequences of selectors :
* The whitespace `A B` represents an element `B` that is an arbitrary descendant of some ancestor element `A`.
* The greater-than sign `A > B` represents an element `B` that is an immediate descendant of some parents element `A`.
* The plus sign `A + B` represents an element `B` that is immediately preceded by some siblings element `A`.
* The tilde sign `A ~ B` represents an element `B` that is arbitrary preceded by some siblings element `A`.

### Groups of selectors

You can group multiple rules together, which have the same styles, using the comma `,`.
Example :
```CSS
h2,
.title,
.highlight h3 {
  text-transform: uppercase;
  color: blue;
}
```
Will apply all styles included in the declaration block to each rules `h2`, `.title` and `.highlight h3`.

## Inheritance

### Inherited properties

Some properties are automatically inherited by descendants without explicitly having a matching rule.

In that case, if no value for an inherited property has been specified on an element, the element gets the computed value of that property on its parent element.

Example :
```CSS
body {
  color: black;
}
.green {
  color: green;
}
```

```HTML
<body>
  <p>This paragraph has not emphasized text in it.<</p>
  <p class="green">This paragraph has <em>emphasized text</em> in it.</p>
</body>
```
the first paragraph will appear black and the words "emphasized text" will appear green whereas no rules are matching these element directly.

## Specificity (rule accuracy)

:construction:

## References

* [Selectors](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_Started/Selectors)
* [Selectors Level 3](http://www.w3.org/TR/selectors/)
* [CSS Pseudo-elements](http://www.w3schools.com/css/css_pseudo_elements.asp)
