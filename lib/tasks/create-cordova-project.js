'use strict';

var Task        = require('ember-cli/lib/models/task');
var BashTask    = require('../tasks/bash');

var cordovaPath = require('../utils/cordova-path');
var path        = require('path');
var fs          = require('fs');
var chalk       = require('chalk');

module.exports = Task.extend({
  run: function() {
    var emberCdvPath = cordovaPath(this.project, true);
    if (!fs.existsSync(emberCdvPath)) {
      this.ui.writeLine('Initting ember-cordova directory');
      fs.mkdirSync(emberCdvPath);
    }

    var cdvPath = path.join(emberCdvPath, 'cordova');
    if (!fs.existsSync(cdvPath)) {
      var command = 'cordova create cordova ' + this.id + ' ' + this.name;

      var create = new BashTask({
        command: command,
        options: {
          cwd: emberCdvPath
        }
      });

      return create.run();
    } else {
      this.ui.writeLine(chalk.yellow(
        'Warning: ember-cordova/cordova project already exists. ' +
        'Please ensure it is a real cordova project.'
      ));
    }
  }
});

