'use strict';

var Task            = require('./-task');
var Promise         = require('ember-cli/lib/ext/promise');

var cordovaRun      = require('../utils/cordova-run');
var cordovaBuild    = require('cordova-lib/src/cordova/build');
var buildPromise    = Promise.denodeify(cordovaBuild);

module.exports = Task.extend({
  run: function(platform, release) {
    var buildType = release ? '--release' : '--debug';
    var opts = [{platforms: [platform], options: [buildType]}];

    return cordovaRun(buildPromise, this.project, opts);
  }
});
