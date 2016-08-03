'use strict';

var cordovaPath     = require('./cordova-path');

module.exports = function(func, opts, project) {
  var emberPath = process.cwd();
  process.chdir(cordovaPath(project));

  return func(opts).then(function() {
    process.chdir(emberPath);
  })
};

