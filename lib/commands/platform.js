'use strict';

var CordovaRawTask  = require('../tasks/cordova-raw');
var chalk           = require('chalk');
var ValidateArgs    = require('../tasks/validate/cordova-raw-args');

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
    var cordovaArgValidator = new ValidateArgs();

    var platformTask = new CordovaRawTask({
      project: this.project,
      rawApi: 'platforms',
      ui: this.ui
    });

    return cordovaArgValidator.run(rawArgs, 'plugin')
      .then(function(validated) {
        this.ui.writeLine(chalk.green(
          'Preparing to ' + validated.command + ' plugins ' + rawArgs
        ));

        return platformTask.run(validated.command, validated.args, {
          save: options.save
        });
      }.bind(this));
  }
};

