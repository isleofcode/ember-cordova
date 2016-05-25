'use strict';

var Task        = require('ember-cli/lib/models/task');
var BashTask    = require('../tasks/bash');

module.exports = Task.extend({
  run: function(buildOptions) {
    var buildCommand;
    if (buildOptions) {
      buildCommand = buildOptions + ' ';
    }
    buildCommand += 'EMBER_CORDOVA=true ember build --environment ' + this.env;

    var emberBuild = new BashTask({
      command: buildCommand,
      ui: this.ui,
      options: {
        cwd: this.project.root
      }
    });

    return emberBuild.run();
  }
});
