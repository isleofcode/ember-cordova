'use strict';

var Task            = require('./-task');
var cordovaRun      = require('../utils/cordova-run');
var cordovaProj     = require('cordova-lib').cordova;
var easyError       = require('../utils/easy-error');

var pluginPromise = function() {
  return cordovaProj.raw[this.rawApi].apply(this, arguments)
    .catch(function(err) {
      easyError('ERROR ember-cordova with cordova raw \n' + err);
    });
};

module.exports = Task.extend({
  run: function(command, pluginNames, save) {
    var opts = [command, pluginNames, { save: save }];

    return cordovaRun(pluginPromise.bind(this), this.project, opts);
  }
});
