'use strict';

var Task            = require('./-task');
var CordovaRawTask  = require('../tasks/cordova-raw');
var _forEach        = require('lodash').forEach;

module.exports = Task.extend({
  project: undefined,
  ui: undefined,

  platform: undefined,
  isRelease: false,
  isEmulator: true,
  platformOpts: undefined,
  buildConfig: undefined,

  run: function() {
    var cordovaOpts = [];
    var platformOpts = [];
    var _platformOpts = Object.keys(platformOpts).map(function(key) {
      var value = platformOpts[key];

      if (value !== undefined) {
        return '--' + key + '=' + value;
      }
    });

    cordovaOpts.push(this.isRelease ? '--release' : '--debug');
    cordovaOpts.push(this.isEmulator ? '--emulator' : '--device');

    if (this.buildConfig !== undefined) {
      cordovaOpts.push('--buildConfig=' + this.buildConfig);
    }

    if (_platformOpts !== undefined) {
      _forEach(_platformOpts, function(key) {
        var value = _platformOpts[key];

        if (value !== undefined) {
          platformOpts.push('--' + key + '=' + value);
        }
      });

      if (platformOpts.length > 0) {
        cordovaOpts.push('--');
        cordovaOpts = cordovaOpts.concat(platformOpts);
      }
    }

    var build = new CordovaRawTask({
      project: this.project,
      rawApi: 'build',
      ui: this.ui
    });

    return build.run({
      platforms: [this.platform],
      options: cordovaOpts
    });
  }
});
