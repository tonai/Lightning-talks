# AMP

## Boilerplate

```html
<!doctype html>
<html amp lang="en">
<head>
  <meta charset="utf-8">
  <title>AMP version</title>
  <link rel="canonical" href="http://localhost:63342/amp-test/index.html">
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
  <script type="application/ld+json">
    {
      "@context": "http://schema.org",
      "@type": "NewsArticle",
      "headline": "Open-source framework for publishing content",
      "datePublished": "2015-10-07T12:02:41Z",
      "image": [
        "logo.jpg"
      ]
    }
  </script>
  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  <script async src="https://cdn.ampproject.org/v0.js"></script>
</head>
<body>
  <h1>Welcome to the mobile web</h1>
</body>
</html>
```



## Validation

Development mode may be triggered by appending `#development=1` to the URL of the page.




## CSS

### Declaration limitations

* No external CSS
* No inline CSS for HTML elements
* 1 inline style tag (identified with `<style amp-custom>`) which must be less than 50Ko
* Optionally 1 additional style tag for keyframes (identified with `<style amp-keyframes>`) which must be less than 500Ko, located at the end of the document and containing only `@keyframes`, `@media` and `@supports`

### Font limitations

* Custom fonts are allowed
* Custom font from providers are allowed if from following whitelist :
  * Fonts.com
  * Google Fonts
  * Font Awesome
  * Typekit 

### Prohibited classes and ids

* Internal AMP class names prefixed with `-amp-` and `i-amp-`
* Internal AMP IDs prefixed with `-amp-` and `i-amp-`

### Prohibited rules

* `!important`
* `filter`
* `@import`

### Rules limitations

* transitions and animations only for `transform` and `opacity` properties (GPU accelerated)
* `overflow`, `overflow-y` and `overflow-x` may not be styled as `auto` or `scroll`



## HTML

AMP HTML is a subset of HTML for authoring content pages such as news articles in a way that guarantees certain baseline performance characteristics.

### Prohibited tags

* `base`
* `object`
* `embed`
* `param`
* `applet`
* `iframe`
* `frame`
* `frameset`
* `img`
* `video`
* `audio`
* Conditional HTML comments

### Tag limitations

* `script` : Prohibited except amp scripts and `application/ld+json` type
* `style` : 1 required for amp styles and only 1 additional for custom styles
* `link` : Some rel are ok (see http://microformats.org/wiki/existing-rel-values) but rel like `stylesheet`, `preconnect`, `prerender`, `prefetch`...etc. are prohibited
* `meta` : The `http-equiv` attribute may be used for specific allowable values (see https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii).
* `a` : Must not begin with `javascript:`. 
* Most svg tags are allowed

### Prohibited attributes

* Attribute names starting with `on` (such as `onclick` or `onmouseover`)
* `style`
* XML-related attributes, such as `xmlns`, `xml:lang`, `xml:base`, `xml:space`...etc.
* Internal AMP attributes prefixed with `i-amp-`
* Internal AMP class names prefixed with `-amp-` and `i-amp-`
* Internal AMP IDs prefixed with `-amp-` and `i-amp-`

### Form limitations

Form requires loading an additional script `<script async src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script>`

Following types are prohibited :
* `password`
* `file`
* `image`
* `button`



## AMP HTML

### Built-in component

* `amp-pixel` : Tracking pixel
* `amp-layout` : Like a `div` but with amp layout power (see below) 
* `amp-img` : Replacement for the `img` tag (it needs to be closed : `<amp-img></amp-img>`)
* `amp-video` : Replacement for the `video` tag (will soon became an extended component)

### Extended component

Extended components require an additional script.

Replacement tag :
* `amp-audio`
* `amp-iframe`

But also :
* `amp-sidebar`
* `amp-accordion`
* `amp-lightbox`
* `amp-carousel`
* ...

The collection of official AMP components is open-source and open to contributions.

### Layout

AMP provides a set of layouts that specify how an AMP component behaves in the document layout.

Values for the `layout` attribute :
* `container` : The element lets its children define its size, much like a normal HTML `div`.
* `fill` : The element takes the space available to it (both width and height). Parent element must have `position:relative` or `position:absolute`.
* `fixed` : The element has a fixed width and height with no responsiveness supported (The `width` and `height` attributes must be present). 
* `fixed-height` : The element takes the space available to it but keeps the height unchanged (The `height` attribute must be present).
* `flex-item` : The element and other elements in its parent with layout type `flex-item` take the parent container's remaining space.
* `intrinsic` : The element takes the space available to it and resizes its height automatically to the aspect ratio given by the `width` and `height` attributes (The width and height attributes must be present).
* `nodisplay` : The element isn't displayed, and takes up zero space on the screen as if its `display` style was `none`. 
* `responsive` : The element takes the space available to it and resizes its height automatically to the aspect ratio given by the `width` and `height` attributes (The width and height attributes must be present).

`intrinsic` VS `responsive` : component inside a floated element where a responsive layout will render 0x0 and intrinsic layout will inflate to the smaller of its natural size or any CSS constraint.

Custom attributes :
* `sizes` : It describes how the width of the element is calculated depending on the media conditions.
* `heights` : Like `sizes` but applied to the height.
* `media` : The element is shown only if the media query match.



## Actions and events

### General

The `on` attribute is used to install event handlers on elements. 

The value for the syntax is a simple domain-specific language of the form: `eventName:targetId[.methodName[(arg1=value, arg2=value)]]`.

You can listen to multiple events on an element by separating the events with a semicolon `;`: `on="submit-success:lightbox1;submit-error:lightbox2"`

You can execute multiple actions in sequence for the same event by separating the actions with a comma `,`: `on="tap:target1.actionA,target2.actionB"`

### Events

Any elements :
* `tap` : similar to the `click` event.

Inputs :
* `change` : when the value is changed.
* `input-debounced` : change with debounce.
* `input-throttled` : change with throttle.

Forms :
* `submit` : classic submit event.
* `submit-success` : submit + success response.
* `submit-error` : submit + error response.
* `valid` : fired when the form is valid.
* `invalid` : fired when the form is invalid.	 

Each AMP component may have its own events (for example `lightboxOpen` and `lightboxClose` for the `amp-lightbox` component).

### Actions

Any elements :
* `hide` : hides the target element.
* `show` : shows the target element.
* `toggleVisibility` : toggles the visibility of the target element.
* `scrollTo(duration=INTEGER, position=STRING)` : scrolls an element into view with a smooth animation.
* `focus` : makes the target element gain focus.

Forms :
* `clear` : clears any values in the form's inputs.
* `submit` : submits the form.

Each AMP component may have its own actions (for example `open` and `close` for the `amp-lightbox` component).

You also have the special `AMP` target with the following actions :
* `navigateTo` : navigates current window to given URL.
* `goBack` : navigates back in history.
* `print` : print the current page.
* `setState` : merges an object literal into the bindable state (need `amp-bind`).
* `pushState` : merges an object literal into the bindable state and pushes a new entry onto browser history stack (need `amp-bind`).



## AMP CACHE

The Google AMP Cache is a proxy-based content delivery network for delivering all valid AMP documents.

It fetches AMP HTML pages, caches them, and improves page performance automatically.

To make your AMP pages discoverable, add `<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">` in your classic HTML pages.
