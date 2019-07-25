Buttons:

* the `main` button launch the components initialization
* the `button` button simply display a message in the console
* the `alert` button also display a message in the console but the event listener is bounded when the component loads

Expected behaviours:

* `01.html` (No loading strategy): when clicking the `button` or `alert` buttons, the message only show up in the console after 1.5s
* `02.html` (Lazy loading strategy): the `button` response is faster, but the `alert` is inactive until the component is loaded.
* `03.html` (Idle until urgent strategy): the `alert` component is loaded if the `alert` button is clicked.
