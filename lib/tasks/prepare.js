'use strict';

var Task            = require('./-task');
var Promise         = require('ember-cli/lib/ext/promise');
var cordovaRun      = require('../utils/cordova-run');
var cordovaPrepare  = require('cordova-lib/src/cordova/prepare');
var preparePromise  = Promise.denodeify(cordovaPrepare);

module.exports = Task.extend({
  project: undefined,
  ui: undefined,

  run: function() {
    this.ui.writeLine('Running cordova prepare');
    return cordovaRun(preparePromise, this.project, []);
  }
});
