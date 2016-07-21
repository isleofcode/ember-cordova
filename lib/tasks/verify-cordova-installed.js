'use strict';

var Task            = require('ember-cli/lib/models/task');
var PromiseExt      = require('ember-cli/lib/ext/promise');
var commandExists   = require('../utils/command-exists');
var chalk           = require('chalk');

var cordovaInstallText = '\nThe command `cordova` was not found. This likely ' +
  'means you need to install cordova globally.  Please run the following ' +
  'command to continue.\n\t';
var cordovaCheckText = '\nYou can check that cordova has been properly ' +
  'installed by checking that the following command returns the currently ' +
  'installed version:\n\t';
var ifHasResumeText = '\nAfter ensuring cordova has been installed globally, ' +
  'run the following command to resume:\n\t';

module.exports = Task.extend({
  ui: undefined,
  command: undefined,
  options: undefined,

  run: function() {
    var task = this;

    if (this.options && this.options.skipCordovaCheck === true) {
      return PromiseExt.resolve();
    }

    return new PromiseExt(function(resolve, reject) {
      var result = commandExists('cordova');

      if (result) {
        resolve();
        return;
      }

      var resumeTaskText = task.command ?
        ifHasResumeText + chalk.white(task.command) + '\n' :
        '';

      task.ui.writeLine(
        chalk.red(cordovaInstallText) +
        chalk.white('npm install cordova -g') + '\n' +
        chalk.red(cordovaCheckText) +
        chalk.white('cordova -v') + '\n' +
        chalk.red(resumeTaskText) + '\n'
      );

      reject();
    });
  }
});
