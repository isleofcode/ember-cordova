var Task       = require('./-task');
var chalk      = require('chalk');
var easyError  = require('../utils/easy-error');
var path = require('path');

var getCordovaConfig = require('../utils/get-cordova-config');
var getCordovaPath      = require('../utils/cordova-path');

// TODO fancy text + pluginName and platform templating
var PLUGIN_NOT_INSTALLED = chalk.red('\nERROR PLUGIN NOT INSTALLED\n');
var PLUGIN_NOT_IN_CONFIGXML = '';
var PLUGIN_NOT_IN_FETCHJSON = '';
var PLUGIN_NOT_IN_PLATFORMJSON = '';

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
        if (pluginIsMatch(plugins[i]), name) {
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
  verbose: false,

  run: function() {
    var task = this;

    return getCordovaConfig(this.project)
      .then(function(cordovaConfig) {
        if (!hasPluginByName(cordovaConfig, task.pluginName)) {
          task.throw(PLUGIN_NOT_IN_CONFIGXML);
        }
      })
      .then(function() {
        var cordovaPath = getCordovaPath(task.project);
        var fetchPath = path.join(cordovaPath, 'plugins/fetch.json');

        try {
          var fetchJSON = require(fetchPath);

          if (!fetchJSON.hasOwnProperty(task.pluginName)) {
            task.throw(PLUGIN_NOT_IN_FETCHJSON);
          }

        } catch (e) {
          task.throw(PLUGIN_NOT_IN_FETCHJSON);
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

          if (
            !platformJSON.hasOwnProperty('installed_plugins') ||
            !platformJSON['installed_plugins'].hasOwnProperty(task.pluginName)
          ) {
            // TODO throw by platform name
            task.throw(PLUGIN_NOT_IN_PLATFORMJSON);
          }

        } catch (e) {
          // TODO throw by platform name
          task.throw(PLUGIN_NOT_IN_PLATFORMJSON);
        }
      })
      .then(function() {
        // validate that the plugin is in fact installed (dir exists and is not empty)
        // ember-cordova/cordova/plugins/<plugin-name>
      });

  },

  throw: function(error) {
    if (this.verbose) {
      easyError(error);
    }
    easyError(PLUGIN_NOT_INSTALLED);
  }

});
