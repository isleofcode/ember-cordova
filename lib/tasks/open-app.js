'use strict';

var Task               = require('./-task');
var BashTask           = require('../tasks/bash');
var Promise            = require('rsvp').Promise;
var logger             = require('../utils/logger');

var path               = require('path');
var getOpenCommand     = require('../utils/open-app-command');
var cordovaPath        = require('../utils/cordova-path');

module.exports = Task.extend({
  application: undefined,
  platform: undefined,
  project: undefined,

  run: function() {
    return new Promise(function(resolve, reject) {
      var projectPath, open, command;
      var cdvPath = cordovaPath(this.project);

      if (this.platform === 'ios') {
        projectPath = path.join(cdvPath, 'platforms/ios/*.xcodeproj');

      } else if (this.platform === 'android') {
        projectPath = path.join(cdvPath, 'platforms/android/.project');

      } else {
        reject(
          'The ' + this.platform +
          ' platform is not supported. Please use \'ios\' or \'android\''
        );
      }

      logger.success('Opening app for ' + this.platform);

      command = getOpenCommand(projectPath, this.application);
      open = new BashTask({
        command: command,
        options: {
          cwd: this.project.root
        }
      });

      open.run().then(resolve);
    }.bind(this));
  }
});
