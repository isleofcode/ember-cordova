'use strict';

var EmberBuildTask  = require('../tasks/ember-build');
var CdvBuildTask    = require('../tasks/cordova-build');
var BashTask        = require('../tasks/bash');

module.exports = {
  name: 'cordova:serve',
  aliases: [
    'cordova:serve',
    'cdv:serve',
    'cdv:s'
  ],
  description: 'Builds app, then runs liveReload server',
  works: 'insideProject',

  availableOptions: [{
    name: 'reload-url',
    type: String
  }, {
    name: 'platform',
    type: String
  }, {
    name: 'env',
    type: String,
    default: 'development'
  }],

  run: function(options) {
    var config, platform, address;

    config = this.project.config.cordova || {};
    platform = options.platform || config.platform || "ios";
    address = options.reloadUrl || config.reloadUrl || "http://localhost:4200";

    var buildOptions ="EMBER_CORDOVA=true" +
      " CORDOVA_RELOAD_ADDRESS=" + address +
      " CORDOVA_PLATFORM=" + platform + " ";

    var emberBuild = new EmberBuildTask({
      project: this.project,
      ui: this.ui
    });

    var cdvBuild = new CdvBuildTask({
      project: this.project,
      ui: this.ui
    });

    var serveCommand = buildOptions + "ember s --env "+ options.env;
    var serve = new BashTask({
      command: serveCommand,
      ui: this.ui,
      options: {
        cwd: this.project.root
      }
    });

    return emberBuild.run(options.env, buildOptions)
           .then(cdvBuild.run(platform))
           .then(serve.run());
  }
};
