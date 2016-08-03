'use strict';

var BashTask        = require('../tasks/bash');
var cordovaPath     = require('../utils/cordova-path');
var chalk           = require('chalk');

var VerifyCordovaTask = require('../tasks/verify-cordova-installed');

module.exports = {
  name: 'cordova',
  aliases: ['cdv'],
  description: 'Passes commands to Cordova CLI',
  works: 'insideProject',

  supportedCommands: [
    'build',
    'prepare'
  ],

  knownCordovaCommands: [
    'plugin',
    'plugins',
    'platform',
    'platforms',
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
    var ui = this.ui;
    var project = this.project;

    var verify = new VerifyCordovaTask({
      project: project,
      ui: ui
    });


   return verify.run().then(function() {
      console.log("WOKED");
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
};
