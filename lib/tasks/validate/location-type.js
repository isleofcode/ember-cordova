var Task            = require('../-task');
var Promise         = require('rsvp').Promise;
var chalk           = require('chalk');
var logger          = require('../../utils/logger');

var MUST_SPECIFY_HASH =
  chalk.red('* config/environment.js: Cordova applications require:') +
  chalk.grey('\n`ENV.locationType = \'hash\'; \n');

module.exports = Task.extend({
  config: undefined,
  force: false,

  run: function() {
    var config = this.config;
    var locationType    = config.locationType;
    var isHashLocation  = locationType === 'hash';

    if (!isHashLocation && this.force === false) {
      return Promise.reject(MUST_SPECIFY_HASH);
    } else {
      var msg = MUST_SPECIFY_HASH;
      msg += 'You have passed the --force flag, so continuing';
      logger.warn(msg);
    }

    return Promise.resolve();
  }
});
