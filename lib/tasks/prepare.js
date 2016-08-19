'use strict';

var Task            = require('./-task');
var CordovaRawTask  = require('../tasks/cordova-raw');

module.exports = Task.extend({
  project: undefined,
  ui: undefined,

  run: function() {
    this.ui.writeLine('Running cordova prepare');
    var prepare = new CordovaRawTask({
      project: this.project,
      rawApi: 'prepare',
      ui: this.ui
    });

    return prepare.run();
  }
});
