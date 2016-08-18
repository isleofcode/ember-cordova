'use strict';

var Task            = require('./-task');
var Promise         = require('ember-cli/lib/ext/promise');

var childProcess    = require('child_process');
var defaults        = require('lodash').defaults;

var BashTask = Task.extend({
  command: undefined,
  options: undefined,

  run: function() {
    if (!this.options) {
      this.options = {};
    }

    var task = this;
    return new Promise(function(resolve) {
      var options = defaults(task.options, {
        maxBuffer: 5000 * 1024,
        stdio: 'inherit'
      });

      task.runCommand(task.command, options);
      resolve();
    });
  }
});

BashTask.prototype.runCommand = function(command, options) {
  childProcess.execSync(command, options);
};

module.exports = BashTask;
