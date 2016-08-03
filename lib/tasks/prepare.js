'use strict';

var Task            = require('./-task');
var CordovaRun      = require('../utils/cordova-run');

var Promise         = require('ember-cli/lib/ext/promise');
var cordovaLib      = require('cordova-lib');
var preparePromise  = Promise.denodeify(cordovaLib.cordova.prepare);

module.exports = Task.extend({
  run: function() {
    this.ui.writeLine('Running cordova prepare');
    return CordovaRun(preparePromise, this.project, []);
  }
});
