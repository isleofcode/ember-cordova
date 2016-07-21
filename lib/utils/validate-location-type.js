'use strict';

var easyError = require('./easy-error');
var chalk = require('chalk');
var getLastCommandRun = require('./get-last-command');

var MUST_SPECIFY_HASH = chalk.grey('\n(ember-cordova)\t') +
  chalk.red('Cordova applications require that you ' +
    'specify\n`ENV.locationType = \'hash\';` ' +
    'in config/environment.js\n\n') +
  chalk.grey('Please make this change and then rerun `' +
    getLastCommandRun() + '`\n');

module.exports = function(config) {
  var locationType    = config.locationType;
  var isHashLocation  = locationType === 'hash';

  if (!isHashLocation) {
    easyError(MUST_SPECIFY_HASH);
  }
};
