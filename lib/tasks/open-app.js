'use strict';

var Task               = require('./-task');
var BashTask           = require('../tasks/bash');
var Promise            = require('rsvp').Promise;
var logger             = require('../utils/logger');
var fs                 = require('fs');

var path               = require('path');
var getOpenCommand     = require('../utils/open-app-command');
var cordovaPath        = require('../utils/cordova-path');

module.exports = Task.extend({
  application: undefined,
  platform: undefined,
  project: undefined,

  run: function() {
    var projectPath, open, command;
    var cdvPath = cordovaPath(this.project);

    if (this.platform === 'ios') {
      projectPath = path.join(cdvPath, 'platforms/ios/*.xcodeproj');
    } else if (this.platform === 'android') {
      var projectFile = path.join(cdvPath, 'platforms/android/.project');

      if (fs.existsSync(projectFile)) {
        projectPath = projectFile;
      } else {
        var docLink = 'http://embercordova.com/pages/cli#open';

        logger.warn('Can\'t open IDE without a project being created. See' +
          docLink +
          'for more info.'
        );

        projectPath = path.join(cdvPath, 'platforms/android/');
      }
    } else {
      return Promise.reject(
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

    return open.run();
  }
});
