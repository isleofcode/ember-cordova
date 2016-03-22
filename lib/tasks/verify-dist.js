'use strict';

var Promise     = require('ember-cli/lib/ext/promise');
var path       = require('path');
var fs         = require('fs');
var mkdir      = Promise.denodeify(fs.mkdir);

module.exports = function(project) {
  return function() {
    var distPath = path.join(project.root, 'dist');

    if(fs.existsSync(distPath)) {
      return Promise.resolve();
    } else {
      return mkdir(distPath);
    }
  }
};
