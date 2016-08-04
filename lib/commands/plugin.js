'use strict';

var PluginTask      = require('../tasks/cordova-platform');
var chalk           = require('chalk');
var _pullAll        = require('lodash').pullAll;
var _includes       = require('lodash').includes;


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
    var command;
    if (_includes(rawArgs, 'add')) { command = 'add' }
    if (_includes(rawArgs, 'remove')) { command = 'remove' }

    if (!command) {
      this.ui.writeLine(chalk.red(
        'Missing add or remove flag, e.g. ember cdv:platform add ios'
      ));

      return;
    }

    _pullAll(rawArgs, ['add', 'remove']);
    this.ui.writeLine(chalk.green(
      'Preparing to ' + command + ' plugins ' + rawArgs
    ));

    var plugin = new PluginTask({
      project: this.project,
      ui: this.ui
    });

    return plugin.run(command, rawArgs, options.save);
  }
};

