var Task            = require('../-task');
var Promise         = require('ember-cli/lib/ext/promise');
var chalk           = require('chalk');

var MUST_SPECIFY_HASH =
  chalk.red('* config/environment.js: Cordova applications require:') +
  chalk.grey('\n`ENV.locationType = \'hash\'; \n');

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
