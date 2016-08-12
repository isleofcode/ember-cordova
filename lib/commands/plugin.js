'use strict';

var CordovaRawTask  = require('../tasks/cordova-raw');
var chalk           = require('chalk');

var validateCordovaCmd = require('../utils/validate-cordova-command');

module.exports = {
  name: 'cordova:plugin',
  aliases: ['cdv:plugin', 'cdv:p'],
  description: 'Add/remove plugins',
  works: 'insideProject',

  /* eslint-disable max-len */
  availableOptions: [
    { name: 'save',                 type: Boolean,  default: true },
  ],

  /* eslint-enable max-len */
  run: function(options, rawArgs) {
    var validated = validateCordovaCmd(rawArgs, 'plugin');

    this.ui.writeLine(chalk.green(
      'Preparing to ' + validated.command + ' plugins ' + rawArgs
    ));

    var pluginTask = new CordovaRawTask({
      project: this.project,
      rawApi: 'platform',
      ui: this.ui
    });

    return pluginTask.run(validated.command, validated.args, options.save);
  }
};

