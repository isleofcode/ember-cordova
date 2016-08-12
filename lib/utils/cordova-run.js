'use strict';

var cordovaPath     = require('./cordova-path');
var Promise         = require('ember-cli/lib/ext/promise');

module.exports = function(func, project, opts) {
  return new Promise(function(resolve) {
    var emberPath = process.cwd();
    process.chdir(cordovaPath(project));

    func.apply(this, opts).then(function() {
      process.chdir(emberPath);
      resolve();
    });
  });
};

