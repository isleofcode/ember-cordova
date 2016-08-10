'use strict';

var PluginTask      = require('../tasks/cordova-plugin');
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

    var plugin = new PluginTask({
      project: this.project,
      rawApi: 'plugin',
      ui: this.ui
    });

    return plugin.run(validated.command, validated.args, options.save);
  }
};

