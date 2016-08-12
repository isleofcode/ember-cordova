'use strict';

var commands              = require('./lib/commands');
var getNetworkIp          = require('./lib/utils/get-network-ip');
var getPlatformAssets     = require('./lib/utils/get-platform-assets');

var fs                    = require('fs');
var path                  = require('path');
var chalk                 = require('chalk');
var mergeTrees            = require('broccoli-merge-trees');
var Funnel                = require('broccoli-funnel');

module.exports = {
  name: 'ember-cordova',

  config: function(env, baseConfig) {
    if (this.project.targetIsCordova) {
      var conf = { cordova: {} };
      if (!!this.project.RELOAD_PORT) {
        //If cordova live reload, set the reload url
        if (baseConfig.cordova && baseConfig.cordova.reloadUrl) {
          conf.cordova.reloadUrl = baseConfig.cordova.reloadUrl;
        } else {
          var networkAddress = getNetworkIp();
          var deviceServerUrl = 'http://' + networkAddress + ':' + this.project.RELOAD_PORT;

          conf.cordova.reloadUrl = deviceServerUrl;
        }
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

  cordovaAssetTree: function(tree, assets) {
    var pluginsTree = new Funnel(this.treeGenerator(assets.path), {
      srcDir:  '/',
      include: assets.files,
      destDir: '/'
    });

    return mergeTrees([tree, pluginsTree]);
  },

  treeForPublic: function(tree) {
    if (this.project.targetIsCordova) {
      var platformAssets = getPlatformAssets(this.project);

      if (platformAssets.path === undefined) {
        throw new Error('ember-cordova: Did not receive platform asset path, canot not build');
      };

      var filePath = path.join(platformAssets.path, 'cordova_plugins.js');
      if (!fs.existsSync(filePath)) {
        var err = new Error('ember-cordova: cordova_plugins did not exist. It is required for Device LiveReload to work.');
        err.stack = null;
        throw err;
      }

      return this.cordovaAssetTree(tree, platformAssets);
    }

    return tree;
  }
};
