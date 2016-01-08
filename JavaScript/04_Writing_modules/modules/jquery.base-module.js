(function($){
  'use strict';

  /* Module variables. */
  var moduleName, defaultOptions = {};

  /**
   * Module Constructor.
   *
   * @param {Node|jQuery} element
   *   Main DOM element.
   * @param {object} options
   *   Instance specific options.
   */
  function Module(element, options) {
    // Merge specific and default options.
    this.options = $.extend({}, defaultOptions, options);

    // Initialize the main element.
    this.$element = (element instanceof $)? element: $(element);

    // Save the instance reference into the DOM element.
    this.$element.data(moduleName, this);

    // Object initialization.
    this.setup && this.setup();
    this.bind  && this.bind();
    this.init  && this.init();
  }

  /********** Start module specific code **********/

  /* Module name. */
  moduleName = 'myModule';

  /* Module default options. */
  defaultOptions = {};

  /**
   * Setup module.
   * e.g. Get DOM elements, setup data...
   */
  Module.prototype.setup = function() {};

  /**
   * Bind events.
   */
  Module.prototype.bind = function() {};

  /**
   * Initialize default module state.
   */
  Module.prototype.init = function() {};

  /********** End module specific code **********/

  /* Expose jQuery module. */
  $.fn[moduleName] = function(options) {
    return this.each(function() {
      var $this = $(this);
      if (!$this.data(moduleName)) {
        new Module($this, options);
      }
    });
  };
})(jQuery);
