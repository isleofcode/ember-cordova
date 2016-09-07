'use strict';

var Task            = require('./-task');
var CordovaRawTask  = require('../tasks/cordova-raw');

module.exports = Task.extend({
  project: undefined,
  ui: undefined,

  platform: undefined,
  isRelease: false,
  isEmulator: true,
  platformOpts: undefined,

  run: function() {

    var buildType = this.isRelease ? '--release' : '--debug';
    var buildFor = this.isEmulator ? '--emulator' : '--device';

    var platformOpts = Object.keys(platformOpts).map((key) => {
      var value = platformOpts[key];
      if (value !== undefined) {
        return '--' + key + '=' + value;
      }
    });

    var opts = {
      platforms: [platform],
      options: [
        buildType,
        buildFor,
        buildConfig
      ]
    };

    if (platformOpts !== undeinfed) {
      opts.options.push('--');
      opts.options.concat(platform);
    }

    var build = new CordovaRawTask({
      project: this.project,
      rawApi: 'build',
      ui: this.ui
    });

    return build.run(opts);
  }
});
