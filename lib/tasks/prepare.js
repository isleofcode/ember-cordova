'use strict';

var Task            = require('./-task');
var CordovaRun      = require('../utils/cordova-run');

var Promise         = require('ember-cli/lib/ext/promise');
var cordovaPrepare  = require('cordova-lib/src/cordova/prepare');
var preparePromise  = Promise.denodeify(cordovaPrepare);

module.exports = Task.extend({
  run: function() {
    this.ui.writeLine('Running cordova prepare');
    return CordovaRun(preparePromise, this.project, []);
  }
});
