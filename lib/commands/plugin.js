'use strict';

//Cordova requires snaked var
/* eslint-disable camelcase */

var Command         = require('./-command');
var CordovaRawTask  = require('../tasks/cordova-raw');
var chalk           = require('chalk');
var SanitizeArgs    = require('../tasks/validate/sanitize-addon-args');

module.exports = Command.extend({
  name: 'cordova:plugin',
  aliases: ['cdv:plugin', 'cdv:p'],
  description: 'Add/remove plugins',
  works: 'insideProject',

  /* eslint-disable max-len */
  availableOptions: [
    { name: 'save',                 type: Boolean,  default: true },
    { name: 'variable',             type: Array },
    { name: 'searchpath',           type: String },
    { name: 'noregistry',           type: Boolean, default: false },
    { name: 'nohooks',              type: Boolean, default: false },
    { name: 'browserify',           type: Boolean, default: false },
    { name: 'link',                 type: String,  default: undefined },
    { name: 'force',                type: Boolean, default: false }
  ],
  /* eslint-enable max-len */

  run: function(options, rawArgs) {
    var ui = this.ui;

    var cordovaArgSanitizer = new SanitizeArgs({
      rawArgs: rawArgs,
      varOpts: options.variable,
      api: 'plugin'
    });

    var pluginTask = new CordovaRawTask({
      project: this.project,
      rawApi: 'plugins',
      ui: this.ui
    });

    return cordovaArgSanitizer.run()
      .then(function(validated) {
        ui.writeLine(chalk.green(
          'Preparing to ' + validated.action + ' plugins ' + rawArgs
        ));

        return pluginTask.run(validated.action, validated.name, {
          save: options.save,
          searchpath: options.searchpath,
          noregistry: options.noregistry,
          nohooks: options.nohooks,
          browserify: options.browserify,
          link: options.link,
          force: options.force,
          cli_variables: validated.varOpts
        });

      }).catch(function(err) {
        ui.writeLine(chalk.red(err));
      });
  }
});
