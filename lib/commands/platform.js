'use strict';

var Command         = require('./-command');
var CordovaRawTask  = require('../tasks/cordova-raw');
var ValidateArgs    = require('../tasks/validate/cordova-raw-args');
var SetupWebView    = require('../tasks/setup-webview');
var Promise         = require('ember-cli/lib/ext/promise');
var chalk           = require('chalk');

module.exports = Command.extend({
  name: 'cordova:platform',
  aliases: ['cdv:platform', 'cdv:pl'],
  description: 'Add/remove platforms',
  works: 'insideProject',

  /* eslint-disable max-len */
  availableOptions: [
    { name: 'save',                 type: Boolean,  default: true },
    { name: 'default-webview',      type: Boolean,  default: false }
  ],

  /* eslint-enable max-len */
  run: function(options, rawArgs) {
    this._super.apply(this, arguments);

    var project = this.project;
    var ui = this.ui;
    var cordovaArgValidator = new ValidateArgs();

    var platformTask = new CordovaRawTask({
      project: project,
      ui: ui,
      rawApi: 'platforms'
    });

    return cordovaArgValidator.run(rawArgs, 'platform')
      .then(function(validated) {
        var command = validated.command;

        ui.writeLine(chalk.green(
          'Preparing to ' + command + ' platform ' + rawArgs
        ));

        var opts = { save: options.save };
        return platformTask.run(command, validated.args, opts)
          .then(function() {
            //By default we upgrade the default WebView
            //See ${DOCLINK} TODO
            var platform = validated.platform;

            if (command === 'add' && options.defaultWebview !== true &&
                (platform === 'ios' || platform === 'android')) {
              var setup = new SetupWebView({
                project: project,
                ui: ui,
                platform: platform
              });
              return setup.run();
            } else {
              return Promise.resolve();
            }
          });
      });
  }
});
