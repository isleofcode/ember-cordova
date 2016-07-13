'use strict';

var EmberBuildTask  = require('../tasks/ember-build');
var CdvBuildTask    = require('../tasks/cordova-build');
var LinkTask        = require('../tasks/link-environment');
var HookTask        = require('../tasks/run-hook');
var BashTask        = require('../tasks/bash');

var defaultPlatform = require('../utils/default-platform');
var isTargetCordova = require('../utils/is-target-cordova');

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
    name: 'environment',
    type: String,
    default: 'development',
    aliases: ['env']
  }, {
    name: 'platform',
    type: String
  }, {
    name: 'reload-url',
    type: String
  }],

  run: function(options) {
    var buildOptions, serveCommand, hook, link, emberBuild, cordovaBuild, serve;

    this.validateLocationType();

    options.platform = options.platform || defaultPlatform(this.project);
    options.buildOptions = this.parseBuildOptions(options);

    serveCommand = options.buildOptions + "ember s --env "+ options.environment;

    hook = new HookTask({
      project: this.project,
      ui: this.ui
    });

    emberBuild = new EmberBuildTask({
      project: this.project,
      ui: this.ui,
      buildOptions: options.buildOptions
    });

    link = new LinkTask({
      project: this.project,
      ui: this.ui
    });

    cordovaBuild = new CdvBuildTask({
      project: this.project,
      ui: this.ui
    });

    serve = new BashTask({
      command: serveCommand,
      ui: this.ui,
      options: {
        cwd: this.project.root
      }
    });

    return hook.run('beforeBuild')
           .then(emberBuild.run(options.environment))
           .then(link.run())
           .then(cordovaBuild.run(options.platform))
           .then(hook.run('afterBuild'))
           .then(serve.run());
  },

  parseBuildOptions: function(options) {
    var config, platform, address;

    config = this.project.config.cordova || {};
    platform = options.platform;
    address = options.reloadUrl || config.reloadUrl || "http://localhost:4200";

    return "EMBER_CORDOVA=true" +
      " CORDOVA_RELOAD_ADDRESS=" + address +
      " CORDOVA_PLATFORM=" + platform + " ";
  },

  validateLocationType: function() {
    var config          = this.project.config,
        locationType    = config.locationType,
        isHashLocation  = locationType === 'hash';

    if (isTargetCordova() && !isHashLocation) {
      throw new Error('ember-cordova: You must specify the locationType as \'hash\' in your environment.js.');
    }
  }
};
