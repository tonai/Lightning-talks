In the "Performance" tab:

* adjust CPU throttling to "6x slowdown"
* create a new record
* click on toggling elements
* check the Frames length and the pixel pipeline tasks duration

Expected behaviours:

* `01.html` (Bootstrap without content below): ok.
* `02.html` (Bootstrap with content below): a little "laggy" because of the bottom content being updated each frame.
* `03.html` (Custom with content below): ok because the cost of updating the bottom content is only on the first frame.
