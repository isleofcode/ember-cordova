'use strict';

var Task        = require('ember-cli/lib/models/task');
var Builder     = require('ember-cli/lib/models/builder');

var runCommand = require('../utils/run-command');
var path       = require('path');
var linkEnv    = require('../tasks/link-environment');

module.exports = Task.extend({
  run: function() {
    var emberCommand = 'ember build --environment ' + this.env;

    var emberMsg   = 'Building ember project for environment ' + this.env;
    var emberBuild = runCommand(emberCommand, emberMsg, {
      cwd: this.project.root
    });

    var cdvCommand = 'cordova build ' + this.platform;

    if (this.env !== 'development') {
      cdvCommand += ' --release'
    }

    var cdvMsg   = 'Building cordova project for platform ' + this.platform;
    var cdvBuild = runCommand(cdvCommand, cdvMsg, {
      cwd: path.join(this.project.root, 'cordova')
    });

    return emberBuild().then(cdvBuild());
  }
});
