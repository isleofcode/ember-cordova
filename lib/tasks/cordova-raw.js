'use strict';

var Task            = require('./-task');
var Promise         = require('ember-cli/lib/ext/promise');
var cordovaPath     = require('../utils/cordova-path');
var cordovaProj     = require('cordova-lib').cordova;
var easyError       = require('../utils/easy-error');

module.exports = Task.extend({
  project: undefined,
  ui: undefined,
  rawApi: undefined,

  cordovaRawPromise: function() {
    return cordovaProj.raw[this.rawApi].apply(this, arguments)
      .catch(function(err) {
        easyError('ERROR ember-cordova with cordova raw \n' + err);
      });
  },

  run: function() {
    return new Promise(function(resolve) {
      var emberPath = process.cwd();
      process.chdir(cordovaPath(this.project));

      this.cordovaRawPromise.apply(this, arguments).then(function() {
        process.chdir(emberPath);
        resolve();
      });
    }.bind(this));
  }
});
