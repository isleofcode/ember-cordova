'use strict';

var Task            = require('./-task');
var CordovaRun      = require('../utils/cordova-run');

var Promise         = require('ember-cli/lib/ext/promise');
var cordovaLib      = require('cordova-lib');
var buildPromise    = Promise.denodeify(cordovaLib.cordova.build);

module.exports = Task.extend({
  run: function(platform, release) {

    var buildType = release ? '--release' : '--debug';
    var opts = {platforms: [platform], options: [buildType]};

    return CordovaRun(buildPromise, opts, this.project);
  }
});
