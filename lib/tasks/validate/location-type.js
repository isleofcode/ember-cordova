var Task            = require('../-task');
var Promise         = require('ember-cli/lib/ext/promise');

var easyError       = require('../../utils/easy-error');
var chalk           = require('chalk');
var getLastCommandRun = require('../../utils/get-last-command');

var MUST_SPECIFY_HASH = chalk.grey('\n(ember-cordova)\t') +
  chalk.red('Cordova applications require that you ' +
    'specify\n`ENV.locationType = \'hash\';` ' +
    'in config/environment.js\n\n') +
  chalk.grey('Please make this change and then rerun `' +
    getLastCommandRun() + '`\n');

module.exports = Task.extend({
  project: undefined,
  ui: undefined,

  run: function(config) {
    var locationType    = config.locationType;
    var isHashLocation  = locationType === 'hash';

    if (!isHashLocation) {
      easyError(MUST_SPECIFY_HASH);
    }

    return Promise.resolve();
  }
});
