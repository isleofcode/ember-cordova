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
      var hook = require(hookPath);
      hook();
    }

    return Promise.resolve()
  }
});
