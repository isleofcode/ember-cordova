'use strict';

var Task            = require('./-task');
var cordovaPath     = require('../utils/cordova-path');

var Promise         = require('ember-cli/lib/ext/promise');
var cordovaLib      = require('cordova-lib');
var buildPromise    = Promise.denodeify(cordovaLib.cordova.build);


module.exports = Task.extend({
  run: function(platform) {
    var emberPath = process.cwd();
    process.chdir(cordovaPath(this.project));

    var buildType = release ? '--release' : '--debug';

    return buildPromise({platforms: [platform]}).then(function() {
      process.chdir(emberPath);
      return;
    });
  }
});
