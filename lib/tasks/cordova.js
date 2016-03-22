'use strict';

var Task        = require('ember-cli/lib/models/task');

var path       = require('path');
var runCommand = require('../utils/run-command');

module.exports = Task.extend({
  run: function() {
    var joinedArgs = this.rawArgs.join(' ');
    var cdvCommand = 'cordova ' + joinedArgs;

    var msg = "Running 'cordova " + joinedArgs + "'";

    return runCommand(cdvCommand, msg, {
      cwd: path.join(this.project.root, 'cordova')
    })();
  }
});
