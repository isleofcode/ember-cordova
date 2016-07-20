'use strict';

var Task            = require('./-task');
var Promise         = require('ember-cli/lib/ext/promise');

var childProcess    = require('child_process');
var defaults        = require('lodash').defaults;

var BashTask = Task.extend({
  run: function() {
    var task;

    if (!this.options) {
      this.options = {};
    }

    //TODO - unresolved promise == problem & bad form
    task = this;
    return new Promise(function() {
      var options = defaults(task.options, {
        maxBuffer: 5000 * 1024,
        stdio: 'inherit'
      });

      task.runCommand(task.command, options);
    });
  }
});

BashTask.prototype.runCommand = function(command, options) {
  childProcess.execSync(command, options);
};

module.exports = BashTask;
