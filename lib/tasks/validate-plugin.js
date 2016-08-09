var Task             = require('./-task');
var CordovaValidator = require('../utils/cordova-validator');


module.exports = Task.extend({
  pluginName: undefined,
  project: undefined,
  platform: undefined,

  run: function() {
    var validator = new CordovaValidator({
      project: this.project,
      platform: this.platform,
      pluginName: this.pluginName,
      type: 'plugin',
      dir: 'plugins/',
      fetchJsonPath: 'plugins/fetch.json'
    });

    return validator.validateCordovaConfig()
      .then(validator.validateCordovaJSON.bind(validator))
      .then(validator.validatePluginJSON.bind(validator))
      .then(validator.validateDirExists.bind(validator));
  }
});
