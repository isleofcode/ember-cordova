'use strict';

var commands              = require('./lib/commands');
var getNetworkIp          = require('./lib/utils/get-network-ip');
var getPlatformAssets     = require('./lib/utils/get-platform-assets');

var existsSync            = require('fs').existsSync;
var path                  = require('path');
var chalk                 = require('chalk');
var mergeTrees            = require('broccoli-merge-trees');
var Funnel                = require('broccoli-funnel');

module.exports = {
  name: 'ember-cordova',

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

  treeForPublic: function() {
    var tree = this._super.treeForPublic.apply(this, arguments);

    if (this.project.targetIsCordova) {
      var platformAssets = getPlatformAssets(this.project);

      if (platformAssets.path === undefined) {
        throw new Error('ember-cordova: Did not receive platform asset path, canot not build');
      };

      var platformPath = path.join(platformAssets.path, 'cordova.js');
      var pluginPath = path.join(platformAssets.path, 'cordova_plugins.js');
      if (!existsSync(platformPath) || !existsSync(pluginPath)) {
        this.ui.writeLine(chalk.yellow(
          'WARNING: ember-cordova: Did not find cordova.js or cordova_plugins.js at ' +
          platformAssets.path +
          '. Ember App LiveReload will still work, but device & plugin APIS will fail.'
        ));
      }

      return this.cordovaAssetTree(tree, platformAssets);
    }

    return tree;
  }
};
