'use strict';

var Task            = require('./-task');
var cordovaRun      = require('../utils/cordova-run');
var cordovaProj     = require('cordova-lib').cordova;

var pluginPromise = function() {
  return cordovaProj.raw['plugin'].apply(this, arguments);
};

module.exports = Task.extend({
  run: function(command, pluginNames, save) {
    var opts = [command, pluginNames, { save: save }];

    return cordovaRun(pluginPromise, this.project, opts);
  }
});
