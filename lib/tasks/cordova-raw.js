'use strict';

var Task            = require('./-task');
var cordovaRun      = require('../utils/cordova-run');
var cordovaProj     = require('cordova-lib').cordova;
var easyError       = require('../utils/easy-error');

var cordovaRawPromise = function() {
  return cordovaProj.raw[this.rawApi].apply(this, arguments)
    .catch(function(err) {
      easyError('ERROR ember-cordova with cordova raw \n' + err);
    });
};

module.exports = Task.extend({
  project: undefined,
  ui: undefined,
  rawApi: undefined,

  run: function() {
    return cordovaRun(cordovaRawPromise.bind(this), this.project, arguments);
  }
});
