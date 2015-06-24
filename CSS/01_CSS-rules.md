# CSS rules

## Foreword

Presentation time needed : 30min

## Writing a rule

### Simple selectors

When writing a CSS rule you can use multiples basic types of selectors :
* Universal selector `*` will match all DOM elements.
* Type selector (like `strong`, `div`...etc.) will match all DOM elements whose HTML tag name corresponds.
* Class selector start with a dot (`.`) and will match all DOM elements whose `class` attribute contains the targeted class.
* ID selector start with a hash (`#`) and will match all DOM elements whose `id` attribute is equal to the targeted class.

Reminder : Multiple elements in a document can have the same class value but the id name must be unique in the document.

You can also combine the type selector with the class selector or the id selector for selecting a DOM element corresponding to both conditions.

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

In that case, if no value for an inherited property has been specified on an element, the element gets the `computed` value of that property on its parent element.

Example :
```CSS
p {
  color: green;
}
```

```HTML
<p>This paragraph has <em>emphasized text</em> in it.</p>
```
the words "emphasized text" will appear green whereas no rules are matching this element directly.

### Non-inherited properties

For non-inherited properties, if no value for that property has been specified on an element, the element gets the `initial` value of that property.

Example :
```CSS
p {
  border: 1px solid #000;
}
```

```HTML
<p>This paragraph has <em>emphasized text</em> in it.</p>
```
the words "emphasized text" will not have a border (since the initial value of `border-style` is `none`).

You can change that behavior by using the `inherit` value.

Example :
```CSS
p {
  border: 1px solid #000;
}
em {
  border: inherit;
}
```

```HTML
<p>This paragraph has <em>emphasized text</em> in it.</p>
```

### Font-sizes

When declaring the `font-size` property on an element by using a relative unit like `%` or `em`, the font-size of that element will be calculated relative to the closest ancestor having a `font-size` property.

That value can also be declared using a relative unit, and thus will also be calculated using the same process.

If no ancestor can be found, the `initial` value, which is `medium`, will be used.  
This value depends itself to your browser configuration, but is equal to `16px` by default.

Example :
```CSS
div {
  font-size: 80%;
}
em {
  font-size: 125%;
}
```

```HTML
<body>
  Text in the body.
  <div>
    Text in the div.
    <p>This paragraph has <em>emphasized text</em> in it.</p>
  </div>
</body>
```
The computed font sizes for elements are (with a standard configuration) :
* body : font-size = medium = 16px
* div : font-size = 0.8 * 16 = 12.8 = 13px
* p : font-size = inherit = 13px
* em : font-size = 1.25 * 13 = 16px

When using the `em` unit in a property other than `font-size`, the size will be calculated relative to the font size of the element itself.

Example :
```CSS
div {
  font-size: 80%;
  padding: 2em;
}
```

```HTML
<body>
  <div>
    Text in the div.
  </div>
</body>
```
The computed value for the `div` element are (with a standard configuration) :
* font-size = 0.8 * 16 = 12.8 = 13px
* padding = 2 * 13 = 26px

## Cascade

It is the mechanism used to find which declarations that apply on an element when that element is targeted with multiple conflicting rules.

There are three main concepts that control the order in which CSS declarations are applied :
* Specificity
* Importance
* Source order

### Specificity

If multiple CSS declarations conflict for a given element then the most specific selector overrides others.

Specificity has four components, from less to more :
* the number of type selectors or pseudo-elements in the rule (A)
* the number of class selectors, attribute selectors or pseudo-classes in the rule (B)
* the number of id selectors in the rule (C)
* inline style using the `style` attribute (D)

Special cases :
* The universal selector `*` has a null specificity.
* The negation pseudo-class `:not` is not considered a pseudo-class in the specificity calculation. But selectors placed into the negation pseudo-class count as normal selectors when determining the count of selector types.

Example :

| Rules                                                                  | D | C | B | A |
|------------------------------------------------------------------------|---|---|---|---|
| `.highlight h3`                                                        | 0 | 0 | 1 | 1 |
| `html > head + body #input[type="checkbox"]:checked + *.label::before` | 0 | 1 | 3 | 4 |
| `#input label:not(#exception)`                                         | 0 | 2 | 0 | 1 |
| `<span style="color:red;" >Red text</span>`                            | 1 | 0 | 0 | 0 |

[Here](http://specificity.keegan.st/) is a online specifity calculator.

### Importance

When an `!important` rule is used on a style declaration, this declaration overrides any other declaration made in the CSS, wherever it is in the declaration list.

But if multiple `!important` CSS declarations conflict each other, then the specificity applies on those declarations.

So you can write the complete specificty table like this :

| Rules | D !important | C !important | B !important | A !important  | D | C | B | A |
|-------|--------------|--------------|--------------|---------------|---|---|---|---|

### Source order

When multiple CSS declarations with the same complete specifity conflict each other, the last one overrides the previous rules.

## References

* [Selectors](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_Started/Selectors)
* [Selectors Level 3](http://www.w3.org/TR/selectors/)
* [CSS Pseudo-elements](http://www.w3schools.com/css/css_pseudo_elements.asp)
* [inheritance](https://developer.mozilla.org/en-US/docs/Web/CSS/inheritance)
* [Inheritance and cascade](http://www.w3.org/wiki/Inheritance_and_cascade)
* [Specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)
