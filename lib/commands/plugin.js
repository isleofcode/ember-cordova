'use strict';

var Command         = require('./-command');
var CordovaRawTask  = require('../tasks/cordova-raw');
var chalk           = require('chalk');
var ValidateArgs    = require('../tasks/validate/cordova-raw-args');

module.exports = Command.extend({
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
    this._super.apply(this, arguments);

    var cordovaArgValidator = new ValidateArgs({
      ui: this.ui
    });

    var pluginTask = new CordovaRawTask({
      project: this.project,
      rawApi: 'plugins',
      ui: this.ui
    });

    return cordovaArgValidator.run(rawArgs, 'plugin')
      .then(function(validated) {
        this.ui.writeLine(chalk.green(
          'Preparing to ' + validated.command + ' plugins ' + rawArgs
        ));

        return pluginTask.run(validated.command, validated.args, {
          save: options.save
        });
      }.bind(this));
  }
});
