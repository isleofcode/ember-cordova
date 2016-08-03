'use strict';

var cordovaPath     = require('./cordova-path');

module.exports = function(func, project, opts) {
  var emberPath = process.cwd();
  process.chdir(cordovaPath(project));

  return func.apply(this, opts).then(function() {
    process.chdir(emberPath);
  })
};

