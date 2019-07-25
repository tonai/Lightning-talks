(function(){
  'use strict';

  /* Module variables. */
  var moduleName, defaultOptions = {};

  /**
   * Constructor.
   */
  function Module(options) {
    // Merge specific and default options.
    this.options = this.merge({}, defaultOptions);
    this.merge(this.options, options);

    // Object initialization.
    this.setup && this.setup();
    this.bind  && this.bind();
    this.init  && this.init();
  };

  /**
   * Merge target object with source object.
   * @param {object} target Target object.
   * @param {object} source Source object.
   */
  Module.prototype.merge = function(target, source) {
    for (var i in source) {
      if (source.hasOwnProperty(i)) {
        target[i] = source[i];
      }
    }
    return target;
  };

  /********** Start module specific code **********/

  /* Module name. */
  moduleName = 'MyModule';

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

  /* Export the module. */
  window[moduleName] = Module;
})();
