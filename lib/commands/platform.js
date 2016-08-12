'use strict';

var CordovaRawTask  = require('../tasks/cordova-raw');
var chalk           = require('chalk');

var validateCordovaCmd = require('../utils/validate-cordova-command');

module.exports = {
  name: 'cordova:platform',
  aliases: ['cdv:platform', 'cdv:pl'],
  description: 'Add/remove platforms',
  works: 'insideProject',

  /* eslint-disable max-len */
  availableOptions: [
    { name: 'save',                 type: Boolean,  default: true },
  ],

  /* eslint-enable max-len */
  run: function(options, rawArgs) {
    var validated = validateCordovaCmd(rawArgs, 'platform');

    this.ui.writeLine(chalk.green(
      'Preparing to ' + validated.command + ' platforms ' + rawArgs
    ));

    var platformTask = new CordovaRawTask({
      project: this.project,
      rawApi: 'platforms',
      ui: this.ui
    });

    return platformTask.run(validated.command, validated.args, options.save);
  }
};

