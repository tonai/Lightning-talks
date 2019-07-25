<!--highlight_style=solarized-dark-->
<!--top_margin_logo_title=250px-->
<!--left_margin_logo_title=400px-->
<!--top_margin_logo_subtitle=295px-->
<!--left_margin_logo_subtitle=445px-->
<!--client_logo_path=images/logo.png-->
<!--logo_title=Frontend-->
<!--logo_subtitle=Performances-->
<!--title=The RAIL model-->
<!--subtitle=-->
<!--version=1.0-->
<!--author=Tony Cabaye-->
<!--new-page=<div class="page-break"></div>-->

# RAIL model

## Response: process events in under 50ms

The goal is to complete a transition initiated by user input within 100ms.

**Guidelines :**

* For actions that take longer than 50ms to complete, always provide feedback.

## Animation: produce a frame in 10ms

the goal is to produce a frame in 16ms (60 fps) but browsers need about 6ms to render each frame.

**Guidelines :**

* Pre-calculate expensive work so that you maximize your chances of hitting 60fps.
* These are also considered animations :
  * entrances, exits and loading indicators
  * scrolling
  * dragging (map panning, pinch to zoom)

## Idle: maximize idle time

**Guidelines :**

* Use idle time to complete deferred work. (For example, for the initial page load, load as little data as possible, then use idle time to load the rest.)
* Perform work during idle time in 50ms or less. Any longer, and you risk interfering with the app's ability to respond to user input within 100ms.
* If a user interacts with a page during idle time work, the user interaction should always take the highest priority and interrupt the idle time work.

![Rail response details](./images/rail-response-details.png)

## Load: deliver content and become interactive in under 5 seconds

**Guidelines :**

* Test your load performance on the mobile devices and network connections that are common among your users.
* Focus on optimizing the Critical Rendering Path to unblock rendering.
* You don't have to load everything in under 5 seconds to produce the perception of a complete load. Enable progressive rendering and do some work in the background. Defer non-essential loads to periods of idle time.





# The pixel pipeline (Animation)

![The pixel pipeline](./images/frame-full.jpg)

* **JavaScript:** Typically JavaScript is used to handle work that will result in visual changes (CSS Animations, Transitions, and the Web Animations API are also commonly used).
* **Style calculations:** This is the process of figuring out which CSS rules apply to which elements based on matching selectors.
* **Layout:** Once the browser knows which rules apply to an element it can begin to calculate how much space it takes up and where it is on screen.
* **Paint:** Painting is the process of filling in pixels. The drawing is typically done onto multiple surfaces, often called layers.
* **Compositing:** Since the parts of the page were drawn into potentially multiple layers they need to be drawn to the screen in the correct order so that the page renders correctly. (z-index)

If you change a "layout" property (width, top...), so that’s one that changes an element’s geometry the browser will have to check all the other elements and "reflow" the page. Any affected areas will need to be repainted, and the final painted elements will need to be composited back together.

If you changed a "paint only" property (background, shadow...), then the browser skips layout, but it will still do paint.

If you change a property that requires neither layout nor paint (transform, opacity...), and the browser jumps to just do compositing.

The later is only true if the element on which you change these properties is on its own compositor layer. (using the CSS `will-change` property)

[List of CSS property](https://csstriggers.com/)





# User-centric performance metrics

When a user navigates to a web page, they're typically looking for visual feedback to reassure them that everything is going to work as expected.

|   |   |   |
|---|---|---|
| 1 | Is it happening? | Did the navigation start successfully? Has the server responded? |
| 2 | Is it useful? | Has enough content rendered that users can engage with it? |
| 3 | Is it usable? | Can users interact with the page, or is it still busy loading? |
| 4 | Is it delightful? | Are the interactions smooth and natural, free of lag and jank? |

To understand when a page delivers this feedback to its users, we've defined several new metrics:

### Time To First Byte (TTFB)

Seen as the time between clicking a link and the first bit of content coming in.

### First Paint (FP)

The first time any pixel gets becomes visible to the user.

### First Contentful Paint (FCP)

The time when requested content (article body, etc) becomes visible.

### First Meaningful Paint (FMP)

The time at which the user feels that the primary content (hero elements) of the page is visible. (like the primary video for a youtube page).

### First CPU Idle

The First CPU Idle metric measures when a page is minimally interactive.

### Time To Interactive (TTI)

The time at which a page becomes interactive (events wired up, etc).

The TTI metric identifies the point at which the page's initial JavaScript is loaded and the main thread is idle (free of long tasks).

### Long Tasks

Long tasks are any task longer than 50 milliseconds.

### Speed Index

The Speed Index is the average time at which visible parts of the page are displayed.

It is expressed in milliseconds and dependent on size of the view port.

### Estimated Input Latency / First Input Delay (FID)

The time the browser respond after a user input.

### DOMContentLoaded Event

The time when all the DOM (Document Object Model) of the primary HTML request is loaded.

### Onload Event

The time when the browser has finished processing all ressources on the page (CSS, JS, images, videos...).

### Summary

|   |   |   |
|---|---|---|
| 1 | Is it happening? | FP / FCP |
| 2 | Is it useful? | FMP |
| 3 | Is it usable? | First CPU Idle / TTI |
| 4 | Is it delightful? | Long Tasks (absence of) / Estimated Input Latency / FID |

![speed metrics 1](./images/speed-metrics.png)
![speed metrics 2](./images/perf-metrics-load-timeline.png)

### Rendering strategies

#### Server-Side Rendering (SSR)

An application where input is navigation requests ans the output is HTML response to them.

**Pros :**

* TTI = FCP
* Fully streaming (HTTP2)

**Cons:**

* Slow TTFB
* Inflexible

#### Client-Side Rendering (CSR)

A Single Page Application. All logic, rendering and booting is done on the client. HTML is essentially just script and style tags.

**Pros :**

* Flexible
* Fast TTFB

**Cons:**

* TTI >>> FCP
* No streaming

#### Static SSR

Built as a SPA, but all pages prerendered to static HTML as a build step, and the Js is removed. 

**Pros :**

* fast TTFB
* TTI = FCP
* Fully streaming

**Cons:**

* Inflexible
* Leads to hydratation

#### Rehydration (SSR + CSR)

Built as a SPA. The server prerenders pages, but the full app is also booted on the client. 

**Pros :**

* Flexible

**Cons:**

* Slow TTFB
* TTI >>> FCP

#### CSR with prerendering (Static SSR + CSR)

A SPA, where the initial shell/skeleton is prerendered to static HTML at build time.

**Pros :**

* Flexible
* fast TTFB

**Cons:**

* TTI > FCP
* Limited streaming





# Idle Until Urgent (Idle)

## Use case

FID is too long because of components initialization.  

## Potential solution : Prioritize and defer UI components

* Only helps if the component isn’t yet rendered. If it’s already rendered than deferring initialization runs the risk that the user tries to interact with it and it’s not yet ready.
* In many cases all UI components are either equally important or they depend on each other, so they all need to be initialized at the same time.
* Sometimes individual components take long enough to initialize that they’ll block the main thread even if they’re run in their own tasks.

## Potential solution : Broke up component initialization

**Main evaluation strategies:**

* Eager evaluation: where you run your expensive code right away.
* Lazy evaluation: where you wait until another part of your program needs the result of that expensive code, and you run it then.

**Downsides:**

* Eager evaluation: Increase TTI
* Lazy evaluation: Increase FID

**Other evaluation strategies:**

* Deferred evaluation: where you schedule your code to be run in a future task, using something like `setTimeout`.
* Idle evaluation: a type of deferred evaluation where you use an API like `requestIdleCallback` to schedule your code to run.

Provides better solutions but deferring the initialization of UI components means that they are less likely to block user input, but they also run the risk of not being ready when the user tries to interact with them. 

## Preferred solution : Idle Until Urgent

Like `Idle evaluation` but triggers the evaluation immediately if the code is needed.





# Tools

## Chrome DevTools

Check the following items:

* "Performance" panel
* "Performance monitor" tab
* "Rendering" tab

You can:

* Throttle your CPU to simulate a less-powerful device.
* Throttle the network to simulate slower connections.

##  [Lighthouse](https://developers.google.com/web/tools/lighthouse/)

Included in Chrome DevTools ("Audits" panel).

Gives you 5 notes:

* Performance with following informations:
  * Metrics
  * Opportunities for improving the performances
  * Diagnostics of performance issues
* Progressive Web App
* Accessibility
* Best Practices
* SEO

## [WebPageTest](https://www.webpagetest.org/)

Gives you 6 notes:

* First Byte Time (TTFB)
* Keep-Alive Enabled (all files)
* Compress Transfer (all text files)
* Compress Images (jpeg images)
* Cache static content (text and image files excluding the HTML document)
* Effective use of CDN (all static non-html content)





# Optimizing

## FP / FCP

* Remove any render blocking scripts or stylesheets from the <head> of your document.
* Identify the critical styles and inline them in the <head>.

## FMP / TTI

* Identify hero elements and ensure the initial script load contains just the code needed for these elements.
* In cases where it's not possible to minimize the TTI time, your interfaces should make it clear that the page isn't yet interactive.

## Long tasks

* Splitting the code also helps to reduce long tasks.
* Defer non urgent code to the next idlepoint. By executing this logic asynchronously in smaller chunks, you leave room on the main thread for the browser to respond to user input.
* You should make sure you're testing your third party code and holding any slow running code accountable





# Useful links

* [Front-End Performance Checklist 2019](https://www.smashingmagazine.com/2019/01/front-end-performance-checklist-2019-pdf-pages/)
* [Front-End Performance Checklist](https://github.com/thedaviddias/Front-End-Performance-Checklist)
* [Third Party Web](https://github.com/patrickhulce/third-party-web)
