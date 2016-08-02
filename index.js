'use strict';

var commands              = require('./lib/commands');
var cordovaPath           = require('./lib/utils/cordova-path');
var getNetworkIp          = require('./lib/utils/get-network-ip');

var chalk                 = require('chalk');
var mergeTrees            = require('broccoli-merge-trees');
var Funnel                = require('broccoli-funnel');
var path                  = require('path');
var fs                    = require('fs');

module.exports = {
  name: 'ember-cordova',

  config: function(/* env, baseConfig */) {
    if (this.project.targetIsCordova) {
      var conf = { cordova: {} };
      if (!!this.project.RELOAD_PORT) {
        //If cordova live reload, set the reload url
        var networkAddress = getNetworkIp();
        var deviceServerUrl = 'http://' + networkAddress + ':' + this.project.RELOAD_PORT;

        conf.cordova.reloadUrl = deviceServerUrl;
      }

      return conf;
    }
  },

  contentFor: function(type) {
    if (this.project.targetIsCordova && type === 'body') {
      return '<script src="cordova.js"></script>';
    }
  },

  includedCommands: function() {
    return commands;
  },

  treeForPublic: function(tree) {
    if (this.project.targetIsCordova) {
      var platform = this.project.CORDOVA_PLATFORM;

      var platformsPath = path.join(cordovaPath(this.project), 'platforms');
      var pluginsPath;

      if (platform === 'ios') {
        pluginsPath = path.join(platformsPath, 'ios', 'www');
      } else if (platform === 'android') {
        pluginsPath = path.join(platformsPath, 'android', 'assets', 'www');
      } else if (platform === 'browser') {
        pluginsPath = path.join(platformsPath, 'browser', 'www');
      }

      var files = ['cordova_plugins.js'];

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
