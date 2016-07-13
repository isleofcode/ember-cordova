'use strict';

var commands              = require('./lib/commands');
var cordovaPath           = require('./lib/utils/cordova-path');
var isTargetCordova       = require('./lib/utils/is-target-cordova');
var isCordovaLiveReload   = require('./lib/utils/is-cordova-live-reload');

var chalk                 = require('chalk');
var mergeTrees            = require('broccoli-merge-trees');
var Funnel                = require('broccoli-funnel');
var path                  = require('path');
var fs                    = require('fs');

module.exports = {
  name: 'ember-cordova',

  config: function (env, baseConfig) {
    if (isCordovaLiveReload()) {
      var conf = {};
      //If cordova live reload, set the reload url
      var reloadUrl = process.env.CORDOVA_RELOAD_ADDRESS;
      conf.cordova = {};
      conf.cordova.reloadUrl = reloadUrl;

      return conf;
    }
  },

  contentFor: function (type) {
    if (isTargetCordova() && type === 'body') {
      return '<script src="cordova.js"></script>';
    }
  },

  includedCommands: function () {
    return commands;
  },

  treeForPublic: function (tree) {
    if (isCordovaLiveReload()) {
      var platform = process.env.CORDOVA_PLATFORM;

      var platformsPath = path.join(cordovaPath(this.project), 'platforms');
      var pluginsPath;

      if (platform === 'ios') {
        pluginsPath = path.join(platformsPath, 'ios', 'www');
      } else if (platform === 'android') {
        pluginsPath = path.join(platformsPath, 'android', 'assets', 'www');
      } else if (platform === 'browser') {
        pluginsPath = path.join(platformsPath, 'browser', 'www');
      }

      var files = ['cordova.js', 'cordova_plugins.js'];

      files.forEach(function (file) {
        var filePath = path.join(pluginsPath, file);
        if (!fs.existsSync(filePath)) {
          var err = new Error('ember-cordova: ' + filePath + ' did not exist. It is required for Device LiveReload to work.');
          err.stack = null;
          throw err;
        }
      });

      if (fs.existsSync(path.join(pluginsPath, 'plugins'))) {
        files.push('plugins/**');
      }

      var pluginsTree = new Funnel(this.treeGenerator(pluginsPath), {
        srcDir:  '/',
        include: files,
        destDir: '/'
      });

      this.ui.writeLine(chalk.green('ember-cordova: Device LiveReload is enabled'));

      return mergeTrees([tree, pluginsTree]);
    }

    return tree;
  }
};
