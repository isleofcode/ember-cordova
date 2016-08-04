'use strict';

var Task            = require('./-task');
var Promise         = require('ember-cli/lib/ext/promise');

var cordovaRun      = require('../utils/cordova-run');
var cordovaPrepare  = require('cordova-lib/src/cordova/prepare');
var preparePromise  = Promise.denodeify(cordovaPrepare);

module.exports = Task.extend({
  run: function() {
    this.ui.writeLine('Running cordova prepare');
    return cordovaRun(preparePromise, this.project, []);
  }
});
