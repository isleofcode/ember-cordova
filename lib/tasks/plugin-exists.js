var Task             = require('./-task');
var CordovaValidator = require('../utils/validate-cordova-xml');


module.exports = Task.extend({
  pluginName: undefined,
  project: undefined,
  platform: undefined,

  run: function() {
    var validator = new CordovaValidator({
      project: this.project,
      platform: this.platform,
      pluginName: this.pluginName
    });

    return validator.validateCordovaConfig()
      .then(validator.validateCordovaJSON.bind(this))
      .then(validator.validatePlatformPluginJSON.bind(this))
      .then(validator.validateDirExists.bind(this));
  }
});
