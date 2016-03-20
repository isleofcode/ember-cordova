'use strict';

var path    = require('path');
var chalk   = require('chalk');

module.exports = {
  name: 'cordova',
  aliases: ['cdv'],
  description: 'Passes commands to Cordova CLI',
  works: 'insideProject',

  knownCordovaCommands: [
    'plugin',
    'plugins',
    'platform',
    'platforms',
    'run',
    'emulate'
  ],

  validateAndRun: function(rawArgs) {
    if(this.knownCordovaCommands.indexOf(rawArgs[0]) === -1) {
      var warning = [
        "Warning:",
        rawArgs,
        "was passed to Cordova, but is an unknown Cordova command"
      ].join(' ');

      this.ui.writeLine(
        chalk.yellow(warning)
      )
    }

    return this.run({}, rawArgs);
  },

  run: function(options, rawArgs) {
    return require('../tasks/cordova')(rawArgs, this.project)();
  }
};
