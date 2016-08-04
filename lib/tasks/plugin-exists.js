var Task       = require('./-task');
var chalk      = require('chalk');
var easyError  = require('../utils/easy-error');
var path = require('path');

var getCordovaConfig = require('../utils/get-cordova-config');
var getCordovaPath      = require('../utils/cordova-path');

var NOT_INSTALLED = 'ERROR: Expected a cordova plugin to be installed that was not: ';
var NOT_IN_CONFIGXML = 'Not found in config.xml.';
var NOT_IN_FETCHJSON = 'Not found in fetch.json.';
var NOT_IN_PLATFORMJSON = 'Not found in platform.json.';
var FIX_TEXT = 'You probably need to run ember:cdv plugin add pluginName';

function pluginIsMatch(plugin, name) {
  return plugin.$.name === name;
}

function isArray(v) {
  return Object.prototype.toString.call(v) === '[object Array]';
}

function hasPluginByName(json, name) {
  if (json && json.widget) {
    var plugins = json.widget.plugin;

    if (!!plugins && isArray(plugins)) {
      for (var i = 0; i < plugins.length; i++) {
        if (pluginIsMatch(plugins[i], name)) {
          return true;
        }
      }
    }
  }

  return false;
}

module.exports = Task.extend({
  pluginName: undefined,
  project: undefined,
  platform: undefined,

  run: function() {
    var task = this;

    return getCordovaConfig(this.project)
      .then(function(cordovaConfig) {
        if (!hasPluginByName(cordovaConfig, task.pluginName)) {
          task.throw(task.pluginName, NOT_IN_CONFIGXML);
        }
      })
      .then(function() {
        var cordovaPath = getCordovaPath(task.project);
        var fetchPath = path.join(cordovaPath, 'plugins/fetch.json');

        try {
          var fetchJSON = require(fetchPath);
          var plugins = Object.keys(fetchJSON);

          if (plugins.indexOf(task.pluginName) < 0) {
            task.throw(task.pluginName, NOT_IN_FETCHJSON);
          }

        } catch (e) {
          task.throw(task.pluginName, NOT_IN_FETCHJSON);
        }
      })
      .then(function() {
        var cordovaPath = getCordovaPath(task.project);
        var platformPath = path.join(
          cordovaPath,
          'plugins/' + task.platform + '.json'
        );

        try {
          var platformJSON = require(platformPath);
          var plugins = Object.keys(platformJSON.installed_plugins);

          if (plugins.indexOf(task.pluginName) < 0) {
            task.throw(task.pluginName, NOT_IN_PLATFORMJSON);
          }

        } catch (e) {
          task.throw(task.pluginName, NOT_IN_PLATFORMJSON);
        }
      })
      .then(function() {
        // validate that the plugin is in fact installed (dir exists and is not empty)
        // ember-cordova/cordova/plugins/<plugin-name>
      });

  },

  throw: function(pluginName, error) {
    var message = NOT_INSTALLED + pluginName + ': ' + error + FIX_TEXT;
    easyError(message);
  }
});
