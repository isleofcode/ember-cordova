'use strict';

var getCordovaConfig = require('./get-cordova-config');
var getCordovaPath   = require('./cordova-path');
var easyError        = require('./easy-error');

var existsSync       = require('fs').existsSync;
var Promise          = require('ember-cli/lib/ext/promise');
var chalk            = require('chalk');
var path             = require('path');

var FIX_TEXT         = 'You probably need to run ember:cdv plugin add pluginName';
var NOT_INSTALLED    = 'ERROR: Expected a cordova plugin to be installed that was not: ';
var NOT_IN_CONFIGXML = 'Not found in config.xml.';
var NOT_IN_FETCHJSON = 'Not found in fetch.json.';
var NOT_IN_DIR       = 'Dir not found.';
var NOT_IN_PLATFORMJSON = 'Not found in platform.json.';

var throwError = function(pluginName, error) {
  var message = NOT_INSTALLED + pluginName + ': ' + error + FIX_TEXT;
  easyError(message);
}

var nameIsMatch = function(node, name) {
  return node.$.name === name;
}

var isArray = function(v) {
  return Object.prototype.toString.call(v) === '[object Array]';
}

//type == platform || plugin
//name == 'ios', 'android', 'cordova-plugin-camera'
var hasByName = function(json, name, type) {
  if (json && json.widget) {
    var nodes = json.widget[type];

    if (!!nodes && isArray(nodes)) {
      for (var i = 0; i < nodes.length; i++) {
        if (nameIsMatch(nodes[i], name)) {
          return true;
        }
      }
    }
  }

  return false;
}

function CordovaValidator(opts) {
  this.project = opts.project;
  this.pluginName = opts.pluginName;
  this.platform = opts.platform;
  this.type = opts.type;
  this.dir = opts.dir;
  this.fetchJsonPath = opts.fetchJsonPath;
}

CordovaValidator.prototype.validateCordovaConfig = function() {
  var validator = this;
  return new Promise(function(resolve) {
    getCordovaConfig(validator.project).then(function(cordovaConfig) {
      if (!hasByName(cordovaConfig, validator.pluginName, validator.type)) {
        throwError(validator.pluginName, NOT_IN_CONFIGXML);
      } else {
        resolve();
      }
    });
  });
}

//TODO - pass
CordovaValidator.prototype.validateCordovaJSON = function() {
  var validator = this;
  return new Promise(function(resolve) {
    var cordovaPath = getCordovaPath(validator.project);
    var fetchPath = path.join(cordovaPath, validator.fetchJsonPath);

    try {
      var fetchJSON = require(fetchPath);
      var plugins = Object.keys(fetchJSON);

      if (plugins.indexOf(validator.pluginName) < 0) {
        throwError(validator.pluginName, NOT_IN_FETCHJSON);
      }
      resolve();
    } catch (e) {
      throwError(validator.pluginName, NOT_IN_FETCHJSON);
    }
  });
}

CordovaValidator.prototype.validatePluginJSON = function() {
  var validator = this;
  return new Promise(function(resolve) {
    var cordovaPath = getCordovaPath(validator.project);
    var platformPath = path.join(
      cordovaPath,
      'plugins/' + validator.platform + '.json'
    );

    try {
      var platformJSON = require(platformPath);
      var plugins = Object.keys(platformJSON.installed_plugins);

      if (plugins.indexOf(validator.pluginName) < 0) {
        throwError(validator.pluginName, NOT_IN_PLATFORMJSON);
      }
      resolve();
    } catch (e) {
      throwError(validator.pluginName, NOT_IN_PLATFORMJSON);
    }
  });
}

CordovaValidator.prototype.validateDirExists = function() {
  var validator = this;
  return new Promise(function(resolve) {
    var cordovaPath = getCordovaPath(validator.project);
    var filePath = path.join(cordovaPath, validator.dir, validator.pluginName);

    if (existsSync(filePath)) {
      resolve()
    } else {
      throwError(validator.pluginName, NOT_IN_DIR);
    }
  });
}

module.exports = CordovaValidator;
