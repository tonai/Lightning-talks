# Loading and performance

## Foreword

You can use the navigator's debug console (F12) to try the above examples yourself.

Presentation time needed : 45min

## Load or not quiz

### Images

**01 :**
```html
<p>Download img.png</p>
```
=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/01.html)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

**02 :**
```html
<p>No, seriously, download img.png</p>
```
=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/02.html)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

**03 :**
```html
<image href="img.png">
```
=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/03.html)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

**04 :**
```html
<div style="display: none"><img src="img.png"></div>
```
=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/04.html)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

### Background images

**05 :**
```html
<div style="display:none">
  <div style="background: url(img.png)"></div>
</div>
```
=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/05.html)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

**06 :**
```html
<div style="background: url(img.png); display: none"></div>
```
=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/06.html)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

**07 :**
```html
<div style="background: url(img.png); visibility: hidden"></div>
```
=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/07.html)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

### Images with JavaScript

**08 :**
```javascript
var img = document.createElement('img');
img.src = 'img.png';
```
=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/08.html)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

### Background images with JavaScript

**09 :**
```javascript
var div = document.createElement('div');
div.style.background = 'url(img.png)';
```
=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/09.html)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

**10 :**
```javascript
var div = document.createElement('div');
div.style.background = 'url(img.png)';
document.body.appendChild(div);
document.body.removeChild(div);
```
=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/10.html)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

**11 :**
```javascript
var div = document.createElement('div');
div.style.background = 'url(img.png)';
document.body.appendChild(div);
div.style.background;
document.body.removeChild(div);
```
=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/11.html)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

**12 :**
```javascript
var div = document.createElement('div');
div.style.background = 'url(img.png)';
document.body.appendChild(div);
div.innerHTML;
document.body.removeChild(div);
```
=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/12.html)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

**13 :**
```javascript
var div = document.createElement('div');
div.style.background = 'url(img.png)';
document.body.appendChild(div);
div.offsetWidth;
document.body.removeChild(div);
```
=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/13.html)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

### Scripts

**14 :**
```html
<script src="script.js" type="foo/bar"></script>
```
=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/14.html)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

**15 :**
```html
<script src="script.js" type="script/dart"></script>
```
=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/15.html)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

**16 :**
```html
<script src="script.js" type="text/html"></script>
```
=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/16.html)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

**17 :**
```html
<script src="script.js" LANGUAGE=DART></script>
```
=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/17.html)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

**18 :**
```html
<script src="script.js"></script>
```
=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/18.html)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

### Scripts with JavaScript

**19 :**
```javascript
var script = document.createElement('script');
script.href = 'script.js';
```
=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/19.html)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

**20 :**
```javascript
var script = document.createElement('script');
script.src = 'script.js';
```
=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/20.html)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

**21 :**
```javascript
var script = document.createElement('script');
script.src = 'script.js';
document.body.appendChild(script);
document.body.removeChild(script);
```
=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/21.html)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

### Links with JavaScript

**22 :**
```javascript
var link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'style.css';
```
=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/22.html)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

**23 :**
```javascript
var link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'style.css';
link.type = 'text/javascript';
document.body.appendChild(link);
```
=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/23.html)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

**24 :**
```javascript
var link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'style.css';
document.body.appendChild(link);
document.body.removeChild(link);
```
=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/24.html)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

### Iframes

**25 :**
```html
<iframe></iframe>
```
=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/25.html)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

**26 :**
```html
<iframe src=""></iframe>
```
=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/26.html)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

**27 :**
```html
<iframe src="#"></iframe>
```
=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/27.html)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

**28 :**
```html
<iframe src="?"></iframe>
```
=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/28.html)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

### Using document.write

**29 :**
```html
<script>document.write('<'+'!--')</script>
<img src="img.png">
-->
```
=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/29.html)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

**30 :**
```html
<script async>document.write('<'+'!--')</script>
<img src="img.png">
-->
```
=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/30.html)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

**31 :**
```html
<script defer>document.write('<'+'!--')</script>
<img src="img.png">
-->
```
=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/31.html)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

**32 :**
```html
<script defer>document.write('<'+'!--')</script>
-->
<img src="img.png">
-->
```
=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/32.html)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

### Reload and resize

**33 :**
```javascript
window.onresize = function() {
  window.location.reload();
};
```
=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/33.html)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

**34 :**
```javascript
window.onresize = function() {
  window.location.reload();
};
var event = document.createEvent('Event');
event.initEvent('resize', false, false);
window.dispatchEvent(event);
```
=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/34.html)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

This is a violation a the [HTML specs](https://html.spec.whatwg.org/multipage/browsers.html#dom-location-reload).

**35 :**
```javascript
window.onresize = function() {
  window.location.reload();
};
window.onresize();
```
=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/35.html)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

### Fonts

**36 :**
```html
<style>
  @font-face {
    font-family: 'myfont';
    src: url('font.woff2');
  }
</style>
```
=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/36.html)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

**37 :**
```html
<style>
  @font-face {
    font-family: 'myfont';
    src: url('font.woff2');
  }
  p { font-family: myfont, sans-serif; }
</style>
```
=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/37.html)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

**38 :**
```html
<style>
  @font-face {
    font-family: 'myfont';
    src: url('font.woff2');
  }
  p { font-family: myfont, sans-serif; }
</style>
<p></p>
```
=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/38.html)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

**39 :**
```html
<style>
  @font-face {
    font-family: 'myfont';
    src: url('font.woff');
  }
  p { font-family: myfont, sans-serif; }
</style>
<p>HI THERE!!</p>
```
=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/39.html)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

### Answers

|    | Chrome 45 | Opera 33 | Firefox 41 | IE9 | IE10 | IE11 | Safari 7 |
|:--:|:---------:|:--------:|:----------:|:---:|:----:|:----:|:--------:|
| 01 |           |          |            |     |      |      |          |
| 02 |           |          |            |     |      |      |          |
| 03 |           |          |            |     |      |      |          |
| 04 | X         | X        | X          | X   | X    | X    | X        |
| 05 |           |          |            | X   | X    |      |          |
| 06 | X         | X        |            | X   | X    | X    | X        |
| 07 | X         | X        | X          | X   | X    | X    | X        |
| 08 | X         | X        | X          | X   | X    | X    | X        |
| 09 |           |          |            |     |      |      |          |
| 10 |           |          |            | X   |      |      |          |
| 11 |           |          |            | X   |      |      |          |
| 12 |           |          |            | X   | X    | X    |          |
| 13 | X         | X        | X          | X   | X    | X    | X        |
| 14 | X         | X        | X          | X   | X    | X    |          |
| 15 | X         | X        | X          | X   | X    | X    |          |
| 16 | X         | X        | X          | X   | X    | X    |          |
| 17 | X         | X        | X          | X   | X    | X    |          |
| 18 | X         | X        | X          | X   | X    | X    | X        |
| 19 |           |          |            |     |      |      |          |
| 20 |           |          |            | X   | X    | X    |          |
| 21 | X         | X        | X          | X   | X    | X    | X        |
| 22 |           |          |            |     |      |      |          |
| 23 | X         | X        |            |     |      |      | X        |
| 24 | X         | X        | X          | X   | X    | X    | X        |
| 25 |           |          |            |     |      |      |          |
| 26 |           |          |            |     |      |      |          |
| 27 | X         | X        |            |     |      |      | X        |
| 28 | X X       | X X      | X          | X   | X    | X    | X X      |
| 29 | X         | X        | X          | X   | X    | X    |          |
| 30 | X         | X        | X          | X   | X    | X    |          |
| 31 | X         | X        | X          | X   | X    | X    |          |
| 32 | X         | X        | X          | X   | X    | X    | X        |
| 33 |           |          |            |     |      |      |          |
| 34 | X         | X        | X          | X   | X    | X    | X        |
| 35 | X         | X        | X          | X   | X    | X    | X        |
| 36 |           |          |            |     |      |      |          |
| 37 |           |          |            |     |      |      |          |
| 38 |           |          | X          | X   | X    | X    |          |
| 39 | X         | X        | X          | X   | X    | X    | X        |

## Understanding network

In the developer toolbar you can see the following timing in the network tab :
* **Stalled/Blocking :** Time the request spent waiting before it could be sent. This time is inclusive of any time spent in proxy negotiation. Additionally, this time will include when the browser is waiting for an already established connection to become available for re-use, obeying Chrome's maximum six TCP connection per origin rule.
* **Proxy Negotiation :** Time spent negotiating with a proxy server connection.
* **DNS Lookup :** Time spent performing the DNS lookup. Every new domain on a page requires a full roundtrip to do the DNS lookup.
* **Initial Connection / Connecting :** Time it took to establish a connection, including TCP handshakes/retries and negotiating a SSL.
* **SSL :** Time spent completing a SSL handshake.
* **Request Sent / Sending :** Time spent issuing the network request. Typically a fraction of a millisecond. (upload)
* **Waiting (TTFB) :** Time spent waiting for the initial response, also known as the Time To First Byte. This time captures the latency of a round trip to the server in addition to the time spent waiting for the server to deliver the response.
* **Content Download / Downloading :** Time spent receiving the response data.

## Resources and scripts

### Speculative parsing

Traditionally in browsers the HTML parser has run on the main thread and has blocked after a `</script>` tag until the script has been retrieved from the network and executed.

In modern browsers, resources are downloaded before scripts are finished executing. This is called [speculative parsing][speculative-parsing].

But scripts does still need to be executed in order.

=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/51.html)

DomContentLoaded ~= 7s  
Load ~= 7s

### `async` attribute

You can use the `async` attribute to speed up the DOM rendering. Scripts aren't blocking anymore because they are executed asynchronously.

=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/52.html)

But you don't have control on the order the scripts are executed anymore.

The `async` attribute is not supported by IE < 10 : http://caniuse.com/#search=async

DomContentLoaded ~= 100-150ms  
Load ~= 7s

### `defer` attribute

The `defer` attribute will tell the browser that the execution of the script can be deferred after that the DOM has been completely parsed.

=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/53.html)

Deferred scripts are executed in order and the DomContentLoaded is only triggered at the end.

The `defer` attribute can have a different comportment that the one defined in the specs for IE < 10 : http://caniuse.com/#search=defer

DomContentLoaded ~= 7s  
Load ~= 7s

### Creating a `script` tag with JavaScript

This methos is similar to the `async` attribute method, but with no browser restriction.

=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/54.html)

DomContentLoaded ~= 100-150ms  
Load ~= 7s

### Creating an `img` tag with JavaScript

As scripts need to be executed in order, it will delay the loading of images.

=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/55.html)

DomContentLoaded ~= 7s  
Load ~= 7s

And if create both tags with JavaScript you may expect the result :

=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/56.html)

DomContentLoaded ~= 100-150ms  
Load ~= 7s

### Including scripts at the end of the `body`

The most simple and reliable method to render the content quickly while keeping the script execution order.

=> [Try it yourself !](http://tonai.github.io/Lightning-talks/JavaScript/04_Various/02_Loading-and-performance/57.html)

DomContentLoaded ~= 7s  
Load ~= 7s

## References

* [Request Quest][request-quest]
* [Resource network timing][resource-network-timing]
* [Optimizing your pages for speculative parsing][speculative-parsing]

[request-quest]: http://jakearchibald.github.io/request-quest/
[resource-network-timing]: https://developer.chrome.com/devtools/docs/network#resource-network-timing
[speculative-parsing]: https://developer.mozilla.org/en-US/docs/Web/HTML/Optimizing_your_pages_for_speculative_parsing
