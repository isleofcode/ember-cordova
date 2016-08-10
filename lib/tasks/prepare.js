'use strict';

var Task            = require('./-task');
var BashTask        = require('../tasks/bash');
var cordovaPath     = require('../utils/cordova-path');

module.exports = Task.extend({
  run: function() {
    var cdvPath = cordovaPath(this.project);
    var cdvCommand = 'cordova prepare';

    this.ui.writeLine('Running cordova prepare');

    var prepare = new BashTask({
      command: cdvCommand,
      options: {
        cwd: cdvPath
      }
    });

    return prepare.run();
  }
});
