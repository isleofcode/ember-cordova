'use strict';

var Task        = require('ember-cli/lib/models/task');

var runCommand  = require('../utils/run-command');
var cordovaPath = require('../utils/cordova-path');
var fs          = require('fs-extra');

module.exports = Task.extend({
  init: function() {
    if (!this.project) {
      throw new Error('A project must be passed into this function');
    }
  },

  run: function() {
    var cdvPath = cordovaPath(this.project);
    var cdvCommand = 'cordova prepare';
    var cdvMsg = 'Running cordova prepare';

    return runCommand(cdvCommand, cdvMsg, {
      cwd: cdvPath
    })();
  }
});
