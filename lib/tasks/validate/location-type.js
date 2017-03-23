var Task            = require('../-task');
var Promise         = require('rsvp').Promise;
var chalk           = require('chalk');

var MUST_SPECIFY_HASH =
  chalk.red('* config/environment.js: Cordova applications require:') +
  chalk.grey('\n`ENV.locationType = \'hash\'; \n');

module.exports = Task.extend({
  config: undefined,

  run: function() {
    var config = this.config;

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
