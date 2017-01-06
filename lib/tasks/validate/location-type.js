var Task            = require('../-task');
var Promise         = require('ember-cli/lib/ext/promise');

var getLastCommandRun = require('../../utils/get-last-command');

var MUST_SPECIFY_HASH =
  'Cordova applications require that you ' +
  'specify\n`ENV.locationType = \'hash\';` ' +
  'in config/environment.js\n\n' +
  'Please make this change and then rerun `' +
  getLastCommandRun() + '`\n';

module.exports = Task.extend({
  project: undefined,

  run: function(config) {
    return new Promise(function(resolve, reject) {
      var locationType    = config.locationType;
      var isHashLocation  = locationType === 'hash';

      if (!isHashLocation) {
        reject(MUST_SPECIFY_HASH);
      }

      resolve();
    });
  }
});
