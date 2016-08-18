'use strict';

var Command         = require('./-command');

var BashTask        = require('../tasks/bash');
var cordovaPath     = require('../utils/cordova-path');
var chalk           = require('chalk');

var ValidateCordova = require('../tasks/validate/cordova-installed');

module.exports = Command.extend({
  name: 'cordova',
  aliases: ['cdv'],
  description: 'Passes commands to Cordova CLI',
  works: 'insideProject',

  supportedCommands: [
    'build',
    'platform',
    'platforms',
    'plugin',
    'plugins',
    'prepare'
  ],

  knownCordovaCommands: [
    'run',
    'emulate'
  ],

  validateAndRun: function(rawArgs) {
    var warning;

    if (this.supportedCommands.indexOf(rawArgs[0]) >= 0) {
      warning = 'Warning: ' +
        rawArgs +
        ' run in cordova, but bypassed ember-cordova command.' +
        ' Consider running ember cdv:' + rawArgs + ' instead';

    } else if (this.knownCordovaCommands.indexOf(rawArgs[0]) === -1) {
      warning = 'Warning: ' +
         rawArgs +
         ' passed to Cordova, but is an unknown Cordova command';

    }

    if (warning !== undefined) {
      this.ui.writeLine(chalk.yellow(warning));
    }

    return this.run({}, rawArgs);
  },

  run: function(options, rawArgs) {
    this._super.apply(this, arguments);

    var ui = this.ui;
    var project = this.project;

    var isInstalled = new ValidateCordova({
      project: project,
      ui: ui
    });

    return isInstalled.run().then(function() {
      var joinedArgs = rawArgs.join(' ');
      var cdvCommand = 'cordova ' + joinedArgs;

      var msg = 'Running \'cordova ' + joinedArgs + '\'';
      ui.writeLine(chalk.green(msg));

      return new BashTask({
        command: cdvCommand,
        options: {
          cwd: cordovaPath(project)
        }
      }).run();
    })
  }
});
