(function($){
  'use strict';
  
  /* Plugin variables. */
  var pluginName, defaultOptions = {};
  
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
  }

  /********** Start plugin specific code **********/
  
  /* Plugin name. */
  var pluginName = 'homotheticResize';
  
  /* Plugin default options. */
  var defaultOptions = {
    widthAttr  : 'width',
    heightAttr : 'height'
  };

  /**
   * Setup plugin.
   * e.g. Get DOM elements, setup data...
   */
  Plugin.prototype.setup = function() {
    var width  = this.$element.attr(this.options.widthAttr);
    var height = this.$element.attr(this.options.heightAttr);
    this.ratio = parseInt(width, 10) / parseInt(height, 10);
  };

  /**
   * Bind events.
   */
  Plugin.prototype.bind = function() {
    $(window).on('resize.' + pluginName, this.resize.bind(this));
  };

  /**
   * Initialize default plugin state.
   */
  Plugin.prototype.init = function() {
    this.resize();
  };
  
  /**
   * Event callback.
   * Resize the element homothetically.
   */
  Plugin.prototype.resize = function() {
    this.$element.height(this.$element.width() / this.ratio);
  };

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
