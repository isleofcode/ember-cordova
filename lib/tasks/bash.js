'use strict';

var Task           = require('ember-cli/lib/models/task');
var Promise        = require('ember-cli/lib/ext/promise');

//Sequence of tasks matters a lot
var execSync       = require('child_process').execSync;
var defaults       = require('lodash').defaults;

module.exports = Task.extend({
  run: function() {
    if(!this.options) {
      this.options = {};
    }

    var _this = this;
    return new Promise(function(resolve, reject) {
      var options = defaults(_this.options, {
        maxBuffer: 5000 * 1024,
        stdio: 'inherit',
      });

      execSync(_this.command, options);
    });
  }
});
