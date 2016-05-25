'use strict';

var Task        = require('ember-cli/lib/models/task');
var BashTask    = require('../tasks/bash');
var cordovaPath = require('../utils/cordova-path');

module.exports = Task.extend({
  run: function() {
    var cdvCommand = 'cordova build ' + this.platform;
    if (this.env !== 'development') {
      cdvCommand += ' --release';
    }

    var cdvBuild = new BashTask({
      command: cdvCommand,
      ui: this.ui,
      options: {
        cwd: cordovaPath(this.project)
      }
    });

    return cdvBuild.run();
  }
});
