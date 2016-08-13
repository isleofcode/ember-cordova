'use strict';

var CdvBuildTask    = require('../tasks/cordova-build');
var HookTask        = require('../tasks/run-hook');
var BuildTask       = require('../tasks/ember-build');
var ServeTask       = require('../tasks/ember-build-serve');
var getPlatform     = require('../utils/get-platform');

var Promise         = require('ember-cli/lib/ext/promise');
var PortFinder      = require('portfinder');
var chalk           = require('chalk');
var _merge          = require('lodash').merge;

var ValidatePlatformTask    = require('../tasks/validate-platform');
var ValidatePluginTask      = require('../tasks/validate-plugin');
var validateLocationType    = require('../utils/validate-location-type');
var getCordovaConfig        = require('../utils/get-cordova-config');
var validateAllowNavigation = require('../utils/validate-allow-navigation');

var getPort     = Promise.denodeify(PortFinder.getPort);
var defaultPort = process.env.PORT || 4200;

module.exports = {
  name: 'cordova:serve',
  aliases: [
    'cordova:serve',
    'cdv:serve',
    'cdv:s'
  ],
  description: 'Builds app, then runs liveReload server',
  works: 'insideProject',

  /* eslint-disable max-len */
  availableOptions: [
    { name: 'platform',             type: String,  default: 'ios' },
    { name: 'reload-url',           type: String,                          aliases: ['r'] },
    { name: 'verbose',              type: Boolean, default: false,         aliases: ['v'] },
    { name: 'port',                 type: Number,  default: defaultPort,   aliases: ['p'] },
    { name: 'host',                 type: String,                          aliases: ['H'],     description: 'Listens on all interfaces by default' },
    { name: 'proxy',                type: String,                          aliases: ['pr', 'pxy'] },
    { name: 'insecure-proxy',       type: Boolean, default: false,         aliases: ['inspr'], description: 'Set false to proxy self-signed SSL certificates' },
    { name: 'transparent-proxy',    type: Boolean, default: true,          aliases: ['transp'], description: 'Set to false to omit x-forwarded-* headers when proxying' },
    { name: 'watcher',              type: String,  default: 'events',      aliases: ['w'] },
    { name: 'live-reload',          type: Boolean, default: true,          aliases: ['lr'] },
    { name: 'live-reload-host',     type: String,                          aliases: ['lrh'],   description: 'Defaults to host' },
    { name: 'live-reload-base-url', type: String,                          aliases: ['lrbu'],  description: 'Defaults to baseURL' },
    { name: 'live-reload-port',     type: Number,                          aliases: ['lrp'],   description: '(Defaults to port number within [49152...65535])' },
    { name: 'environment',          type: String,  default: 'development', aliases: ['e', 'env', { 'dev': 'development' }, { 'prod': 'production' }] },
    { name: 'output-path',          type: 'Path',  default: 'ember-cordova/cordova/www/',       aliases: ['op', 'out'] },
    { name: 'ssl',                  type: Boolean, default: false },
    { name: 'ssl-key',              type: String,  default: 'ssl/server.key' },
    { name: 'ssl-cert',             type: String,  default: 'ssl/server.crt' }
  ],
  /* eslint-enable max-len */

  run: function(options) {
    var hook, serve, cordovaBuild, validateCordovaConfig, validatePlugin,
        validatePlatform, emberBuild;

    var platform = getPlatform(this.project.config(), options);
    this.project.CORDOVA_PLATFORM = platform;

    //Vars for live reload addon service
    this.project.targetIsCordova = true;
    this.project.RELOAD_PORT = options.port;

    //Confirm location type is hash
    validateLocationType(this.project.config());

    //Warn user we require allow-navigation on
    validateCordovaConfig = getCordovaConfig(this.project)
    .then(function(cordovaConfig) {
      return validateAllowNavigation(
        cordovaConfig,
        true
      );
    });

    validatePlugin = new ValidatePluginTask({
      project: this.project,
      ui: this.ui,
      platform: platform,
      pluginName: 'cordova-plugin-whitelist'
    });

    validatePlatform = new ValidatePlatformTask({
      project: this.project,
      ui: this.ui,
      platform: platform
    });

    hook = new HookTask({
      project: this.project,
      ui: this.ui
    });

    /*
     TODO - rm me. Serve builds directly to outputPath anyway
     This is required to init the cordova-build

     cordova-builds can not be run while serve is
    */
    emberBuild = new BuildTask({
      ui: this.ui,
      project: this.project,
      environment: options.environment,
      outputPath: options.outputPath
    });

    cordovaBuild = new CdvBuildTask({
      project: this.project,
      ui: this.ui
    });

    serve = new ServeTask({
      project: this.project,
      ui: this.ui,
      analytics: this.analytics
    });

    return validateCordovaConfig
      .then(validatePlatform.prepare())
      .then(validatePlugin.prepare())
      .then(hook.prepare('beforeBuild'))
      .then(emberBuild.prepare())
      .then(cordovaBuild.prepare(platform))
      .then(hook.prepare('afterBuild'))
      .then(this._autoFindLiveReloadPort.bind(this, options))
      .then(function(serveOpts) {
        var config = this.project.config();

        _merge(serveOpts, {
          baseURL: config.baseURL || '/',
          rootURL: config.rootURL || '/',
          project: this.project
        });

        return serve.run(serveOpts)
          .then(function() {
            this.ui.writeLine(chalk.green(
              'ember-cordova: Device LiveReload is enabled'
            ));

            return this._serveHang();
          }.bind(this))
      .catch(function(e) {
        throw e;
      });
      }.bind(this));
  },

  _serveHang: function() {
    return new Promise(function() {
      // hang until the user exits.
    });
  },

  //Taken from from ember-cli
  //https://github.com/ember-cli/ember-cli/blob/master/lib/commands/serve.js#L97-L117
  _autoFindLiveReloadPort: function(commandOptions) {
    return getPort({
      port: commandOptions.liveReloadPort,
      host: commandOptions.liveReloadHost
    })
    .then(function(foundPort) {
      // if live reload port matches express port, try one higher
      if (foundPort === commandOptions.port) {
        commandOptions.liveReloadPort = foundPort + 1;
        return this._autoFindLiveReloadPort(commandOptions);
      }

      // port was already open
      if (foundPort === commandOptions.liveReloadPort) {
        return commandOptions;
      }

      // use found port as live reload port
      commandOptions.liveReloadPort = foundPort;

      return commandOptions;
    });
  }.bind(this)
};
