'use strict';

var Task            = require('./-task');
var CordovaRawTask  = require('../tasks/cordova-raw');

module.exports = Task.extend({
  project: undefined,
  ui: undefined,

  platform: undefined,
  cordovaOpts: [],

  run: function() {
    var build = new CordovaRawTask({
      project: this.project,
      rawApi: 'build',
      ui: this.ui
    });

    return build.run({
      platforms: [this.platform],
      options: this.cordovaOpts
    });
  }
});
