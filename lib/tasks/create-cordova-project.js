'use strict';

var Task        = require('ember-cli/lib/models/task');

var runCommand = require('../utils/run-command');
var path       = require('path');
var fs         = require('fs');
var chalk      = require('chalk');

module.exports = Task.extend({
  run: function() {
    var emberCdvPath = path.join(this.project.root, 'ember-cordova');
    if (!fs.existsSync(emberCdvPath)) {
      this.ui.writeLine('Initting ember-cordova directory');
      fs.mkdirSync(emberCdvPath);
    }

    var cdvPath = path.join(emberCdvPath, 'cordova');
    if (!fs.existsSync(cdvPath)) {
      var config  = this.project.cordovaConfig;
      var command = 'cordova create cordova ' + config.id + ' ' + config.name;

      return runCommand(command, 'Creating Cordova project', {
        cwd: emberCdvPath
      })();
    } else {
      this.ui.writeLine(chalk.yellow(
        'Warning: ember-cordova/cordova project already exists. ' +
        'Please ensure it is a real cordova project.'
      ));
    }
  }
});
