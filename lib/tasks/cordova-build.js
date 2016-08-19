'use strict';

var Task            = require('./-task');
var CordovaRawTask  = require('../tasks/cordova-raw');

module.exports = Task.extend({
  project: undefined,
  ui: undefined,

  run: function(platform, release) {
    var buildType = release ? '--release' : '--debug';
    var opts = { platforms: [platform], options: [buildType] };

    var build = new CordovaRawTask({
      project: this.project,
      rawApi: 'build',
      ui: this.ui
    });

    return build.run(opts);
  }
});
