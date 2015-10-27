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

### Resize

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

## References

* [Request Quest][request-quest]

[request-quest]: http://jakearchibald.github.io/request-quest/
