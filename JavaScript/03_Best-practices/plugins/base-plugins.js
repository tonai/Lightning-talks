(function(){
  'use strict';

  /* Plugin default options. */
  var pluginName, defaultOptions = {};

  /**
   * Constructor.
   */
  function Plugin(options) {
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
  Plugin.prototype.merge = function(target, source) {
    for (var i in source) {
      if (source.hasOwnProperty(i)) {
        target[i] = source[i];
      }
    }
    return target;
  };

  /********** Start plugin specific code **********/

  /* Plugin name. */
  pluginName = 'MyPlugin';

  /* Plugin default options. */
  defaultOptions = {};

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

  /* Export the plugin. */
  window[pluginName] = Plugin;
})();
