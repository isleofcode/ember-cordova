'use strict';

var Task        = require('ember-cli/lib/models/task');

var runCommand = require('../utils/run-command');
var fs         = require('fs-extra');
var path       = require('path');

module.exports = Task.extend({
  init: function() {
    if (!this.project) {
      throw new Error('A project must be passed into this function');
    }
  },

  run: function() {
    var cordovaPath = path.join(this.project.root, 'cordova');
    var wwwPath     = path.join(cordovaPath, 'www');

    var cdvCommand = 'cordova prepare';
    var cdvMsg = 'Running cordova prepare';

    return runCommand(cdvCommand, cdvMsg, {
      cwd: path.join(this.project.root, 'cordova')
    })();
  }
});
