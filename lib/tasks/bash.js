'use strict';

var Task            = require('ember-cli/lib/models/task');
var Promise         = require('ember-cli/lib/ext/promise');

var childProcess    = require('child_process');
var defaults        = require('lodash').defaults;

var BashTask = Task.extend({
  run: function() {
    if (!this.options) {
      this.options = {};
    }

    //TODO - unresolved promise == problem & bad form
    return new Promise(() => {
      var options = defaults(this.options, {
        maxBuffer: 5000 * 1024,
        stdio: 'inherit'
      });

      this.runCommand(this.command, options);
    });
  }
});

BashTask.prototype.runCommand = function(command, options) {
  childProcess.execSync(command, options);
};

module.exports = BashTask;
