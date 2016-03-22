'use strict';

var Task        = require('ember-cli/lib/models/task');
var Promise     = require('ember-cli/lib/ext/promise');

var path           = require('path');
var runCommand     = require('../utils/run-command');
var getOpenCommand = require('../utils/open-app');

module.exports = Task.extend({
  run: function() {
    var projectPath, command;
    if (this.platform === 'ios') {
      projectPath = path.join(this.project.root, 'cordova', 'platforms/ios/*.xcodeproj');
    } else if (this.platform === 'android') {
      projectPath = path.join(this.project.root, 'cordova', 'platforms/android/.project');
    } else {
      return Promise.reject(new Error('The ' + this.platform + ' platform is not supported. Please use "ios" or "android"'));
    }

    var command = getOpenCommand(projectPath, this.application);

    this.ui.writeLine("Opening app for " + this.platform);
    return runCommand(command, 'Opening ' + this.platform + ' project with the default application')();
  }
});
