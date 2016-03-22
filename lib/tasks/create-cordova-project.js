'use strict';

var Task        = require('ember-cli/lib/models/task');

var runCommand = require('../utils/run-command');
var path       = require('path');

module.exports = Task.extend({
  run: function() {
    var config  = this.project.cordovaConfig;
    var command = 'cordova create cordova ' + config.id + ' ' + config.name;

    return runCommand(command, 'Creating Cordova project', {
      cwd: this.project.root
    })();
  }
});
