'use strict';

var Task        = require('ember-cli/lib/models/task');

var runCommand = require('../utils/run-command');
var cordovaPath = require('../utils/cordova-path');

module.exports = Task.extend({
  run: function() {
    var joinedArgs = this.rawArgs.join(' ');
    var cdvCommand = 'cordova ' + joinedArgs;

    var msg = "Running 'cordova " + joinedArgs + "'";

    return runCommand(cdvCommand, msg, {
      cwd: cordovaPath(this.project)
    })();
  }
});
