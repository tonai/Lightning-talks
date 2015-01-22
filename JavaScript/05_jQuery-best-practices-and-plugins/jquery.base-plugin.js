(function($){
  'use strict';
  
  /* Plugin name. */
  var pluginName = 'myPlugin';
  
  /* Plugin default options. */
  var defaultOptions = {};
  
  /**
   * Constructor.
   */
  function Plugin(element, options) {
    // Merge specific and default options.
    this.options = $.extend({}, defaultOptions, options);

    // Initialize the main element.
    this.$element = (element instanceof $)? element: $(element);

    // Save the instance reference into the DOM element.
    this.$element.data(pluginName, this);

    // Object initialisation.
    this.setup && this.setup();
    this.bind  && this.bind();
    this.init  && this.init();
  };

  /********** Start plugin specific code **********/

  /**
   * Setup plugin.
   * e.g. Get DOM elements, setup data...
   */
  Plugin.prototype.setup = function() {};

  /**
   * Bind events.
   */
  Plugin.prototype.bind = function() {};

  /**
   * Initialize default plugin state.
   */
  Plugin.prototype.init = function() {};

  /********** End plugin specific code **********/

  /* Expose jQuery plugin. */
  $.fn[pluginName] = function(options) {
    return this.each(function() {
      var $this = $(this);
      if (!$this.data(pluginName)) {
        new Plugin($this, options);
      }
    });
  };
})(jQuery);
