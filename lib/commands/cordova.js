'use strict';

var BashTask        = require('../tasks/bash');
var cordovaPath     = require('../utils/cordova-path');

var chalk           = require('chalk');

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
    var joinedArgs = rawArgs.join(' ');
    var cdvCommand = 'cordova ' + joinedArgs;

    var msg = 'Running \'cordova ' + joinedArgs + '\'';
    this.ui.writeLine(msg);

    return new BashTask({
      command: cdvCommand,
      options: {
        cwd: cordovaPath(this.project)
      }
    }).run();
  }
};
