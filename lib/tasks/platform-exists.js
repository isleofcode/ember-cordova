var Task             = require('./-task');
var CordovaValidator = require('../utils/cordova-validator');


module.exports = Task.extend({
  pluginName: undefined,
  project: undefined,
  platform: undefined,

  run: function() {
    //TODO - change pluginName
    //TODO - dont need platform + pluginName for platform
    //TODO - fetchJSONPath makes no sense for platform
    //TODO - errors dont make sense anymore as they say plugin
    var validator = new CordovaValidator({
      project: this.project,
      platform: this.platform,
      pluginName: this.platform,
      type: 'platform',
      dir: 'platforms/',
      fetchJsonPath: 'platforms/platforms.json'
    });

    return validator.validateCordovaConfig()
      .then(validator.validateCordovaJSON.bind(validator))
      .then(validator.validateDirExists.bind(validator));
  }
});
