'use strict';

var Task        = require('ember-cli/lib/models/task');
var Promise     = require('ember-cli/lib/ext/promise');

var fs         = require('fs');
var path       = require('path');

module.exports = Task.extend({
  run: function(hookName) {
    var root = this.project.root;
    var hookPath = path.join(root, 'cordova/hooks', hookName);

    if (fs.exists(hookPath)) {
      this.ui.writeLine("Located hook for: " + hookName);
      var hook = require(hookPath);
      hook();
      this.ui.writeLine("Ran hook for: " + hookName);
    }

    return Promise.resolve()
  }
});
