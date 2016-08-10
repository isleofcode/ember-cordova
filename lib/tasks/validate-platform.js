var Task             = require('./-task');
var CordovaValidator = require('../utils/cordova-validator');


module.exports = Task.extend({
  desiredKeyName  : undefined,
  project: undefined,
  platform: undefined,

  run: function() {
    var validator = new CordovaValidator({
      project: this.project,
      platform: this.platform,
      desiredKeyName  : this.platform,
      type: 'platform',
      dir: 'platforms/',
      jsonPath: 'platforms/platforms.json'
    });

    return validator.validateCordovaConfig()
      .then(validator.validateCordovaJSON.bind(validator))
      .then(validator.validateDirExists.bind(validator));
  }
});
