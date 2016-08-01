
'use strict';

var CdvBuildTask    = require('../tasks/cordova-build');
var HookTask        = require('../tasks/run-hook');
var chalk = require('chalk');
var WatchTask = require('../tasks/ember-build-watch');
var ServeTask = require('../tasks/serve-hang.js');

var validateLocationType = require('../utils/validate-location-type');
var getCordovaConfig = require('../utils/get-cordova-config');
var validateAllowNavigation = require('../utils/validate-allow-navigation');

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
    { name: 'output-path',          type: 'Path',  default: 'ember-cordova/cordova/www',       aliases: ['op', 'out'] },
    { name: 'ssl',                  type: Boolean, default: false },
    { name: 'ssl-key',              type: String,  default: 'ssl/server.key' },
    { name: 'ssl-cert',             type: String,  default: 'ssl/server.crt' }
  ],
  /* eslint-enable max-len */

  run: function(options) {
    var hook, watch, serve, cordovaBuild, validateCordovaConfig;
    var ui = this.ui;

    validateLocationType(this.project.config());

    this.project.targetIsCordova = true;
    var platform = this.project.CORDOVA_PLATFORM = options.platform;
    this.project.RELOAD_PORT = options.port;

    validateCordovaConfig = getCordovaConfig(this.project)
      .then(function(cordovaConfig) {
        return validateAllowNavigation(
          cordovaConfig,
          true
        );
      });

    hook = new HookTask({
      project: this.project,
      ui: ui
    });

    watch = new WatchTask({
      project: this.project,
      ui: ui,
      options: options,
      analytics: this.analytics
    });

    cordovaBuild = new CdvBuildTask({
      project: this.project,
      ui: ui
    });

    serve = new ServeTask({
      ui: ui
    });

    ui.startProgress(chalk.green('Building'), chalk.green('.'));

    return validateCordovaConfig
      .then(hook.prepare('beforeBuild'))
      .then(watch.prepare())
      .then(cordovaBuild.prepare(platform))
      .then(hook.prepare('afterBuild'))
      .then(serve.prepare())
      .catch(function(e) {
        throw e;
      });
  }
};
