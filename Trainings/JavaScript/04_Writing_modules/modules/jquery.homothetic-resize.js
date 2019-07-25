(function($){
  'use strict';
  
  /* Module variables. */
  var moduleName, defaultOptions = {};
  
  /**
   * Constructor.
   */
  function Module(element, options) {
    // Merge specific and default options.
    this.options = $.extend({}, defaultOptions, options);

    // Initialize the main element.
    this.$element = (element instanceof $)? element: $(element);

    // Save the instance reference into the DOM element.
    this.$element.data(moduleName, this);

    // Object initialisation.
    this.setup && this.setup();
    this.bind  && this.bind();
    this.init  && this.init();
  }

  /********** Start module specific code **********/
  
  /* Module name. */
  moduleName = 'homotheticResize';
  
  /* Module default options. */
  defaultOptions = {
    widthAttr  : 'width',
    heightAttr : 'height'
  };

  /**
   * Setup module.
   * e.g. Get DOM elements, setup data...
   */
  Module.prototype.setup = function() {
    var width  = this.$element.attr(this.options.widthAttr);
    var height = this.$element.attr(this.options.heightAttr);
    this.ratio = parseInt(width, 10) / parseInt(height, 10);
  };

  /**
   * Bind events.
   */
  Module.prototype.bind = function() {
    $(window).on('resize.' + moduleName, this.resize.bind(this));
  };

  /**
   * Initialize default module state.
   */
  Module.prototype.init = function() {
    this.resize();
  };
  
  /**
   * Event callback.
   * Resize the element homothetically.
   */
  Module.prototype.resize = function() {
    this.$element.height(this.$element.width() / this.ratio);
  };

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
