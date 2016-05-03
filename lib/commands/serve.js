'use strict';

var BuildTask   = require('../tasks/build');
var BashTask    = require('../tasks/bash');

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

    //A little loopy, but will make later automation easier

    var buildOptions ="EMBER_CORDOVA=true" +
      " CORDOVA_RELOAD_ADDRESS=" + address +
      " CORDOVA_PLATFORM=" + platform + " ";

    var build = new BuildTask({
      env: options.env,
      platform: platform,
      buildOptions: buildOptions,
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

    return build.run().then(serve.run());
  }
};
