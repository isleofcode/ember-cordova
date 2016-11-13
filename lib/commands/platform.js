'use strict';

var Command         = require('./-command');
var CordovaRawTask  = require('../tasks/cordova-raw');
var SanitizeArgs    = require('../tasks/validate/sanitize-addon-args');
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
    { name: 'default-webview',      type: Boolean,  default: false },
    { name: 'link',                 type: String,  default: undefined }
  ],

  /* eslint-enable max-len */
  run: function(options, rawArgs) {
    this._super.apply(this, arguments);

    var project = this.project;
    var ui = this.ui;
    var cordovaArgValidator = new SanitizeArgs({
      rawArgs: rawArgs,
      api: 'platform'
    });

    var platformTask = new CordovaRawTask({
      project: project,
      ui: ui,
      rawApi: 'platforms'
    });

    return cordovaArgValidator.run()
      .then(function(validated) {
        var action = validated.action;

        ui.writeLine(chalk.green(
          'Preparing to ' + action + ' platform ' + rawArgs
        ));

        var opts = { save: options.save, link: options.link };
        return platformTask.run(validated.action, validated.name, opts)
          .then(function() {
            //By default we upgrade the default WebView
            //See ${DOCLINK} TODO
            var platform = validated.name;

            if (action === 'add' && options.defaultWebview !== true &&
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
      }).catch(function(err) {
        ui.writeLine(chalk.red(err));
      });
  }
});
