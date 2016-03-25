'use strict';

var rasterizeIcons        = require('./broccoli-plugins/rasterize-icons/plugin');
var rasterizeSplashscreen = require('./broccoli-plugins/rasterize-splashscreen/plugin');

var commands              = require('./lib/commands');
var inArray               = require('./lib/utils/in-array');
var cordovaPath           = require('./lib/utils/cordova-path');

var chalk                 = require('chalk');
var mergeTrees            = require('broccoli-merge-trees');
var Funnel                = require('broccoli-funnel');
var path                  = require('path');
var fs                    = require('fs');

module.exports = {
  name: 'ember-cordova',

  _isTargetCordova: function () {
    var cordovaCommands = ['cdv:', 'cordova:'];
    return inArray(cordovaCommands, process.argv);
  },

  _isCordovaLiveReload: function() {
    return process.env.CORDOVA_LIVERELOAD === "true";
  },

  config: function (env, baseConfig) {
    if (this._isTargetCordova() && env !== 'test') {
      if (baseConfig.locationType && baseConfig.locationType !== 'hash') {
        throw new Error('ember-cli-cordova: You must specify the locationType as \'hash\' in your environment.js or rename it to defaultLocationType.');
      }
    }

    if (this._isCordovaLiveReload()) {
      var conf = {};
      //If cordova live reload, set the reload url
      var reloadUrl = process.env.CORDOVA_RELOAD_ADDRESS;
      conf.cordova = {};
      conf.cordova.reloadUrl = reloadUrl;
      return conf;
    }
  },

  contentFor: function (type) {
    if (this._isTargetCordova() && type === 'body') {
      return '<script src="cordova.js"></script>';
    }
  },

  includedCommands: function () {
    return commands;
  },

  treeForPublic: function (tree) {
    if (this._isCordovaLiveReload() === true) {
      var platform = process.env.CORDOVA_PLATFORM;

      var platformsPath = path.join(cordovaPath(this.project), 'platforms');
      var pluginsPath;

      if (platform === 'ios') {
        pluginsPath = path.join(platformsPath, 'ios', 'www');
      } else if (platform === 'android') {
        pluginsPath = path.join(platformsPath, 'android', 'assets', 'www');
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
