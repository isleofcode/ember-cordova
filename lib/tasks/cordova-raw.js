'use strict';

var Task            = require('./-task');
var Promise         = require('rsvp').Promise;
var cordovaPath     = require('../utils/cordova-path');
var cordovaLib      = require('cordova-lib');
var cordovaProj     = cordovaLib.cordova;
var events          = cordovaLib.events;
var cordovaLogger   = require('cordova-common').CordovaLogger.get();

module.exports = Task.extend({
  project: undefined,
  rawApi: undefined,

  cordovaRawPromise: function(/* rawArgs */) {
    return cordovaProj.raw[this.rawApi].apply(this, arguments);
  },

  run: function() {
    var args = arguments;
    return new Promise(function(resolve, reject) {
      var emberPath = process.cwd();
      process.chdir(cordovaPath(this.project));

      cordovaLogger.subscribe(events);
      if (args[0] && args[0].verbose) { cordovaLogger.setLevel('verbose'); }

      this.cordovaRawPromise.apply(this, args).then(function() {
        process.chdir(emberPath);
        resolve();
      }).catch(function(err) {
        reject(err);
      });
    }.bind(this));
  }
});
