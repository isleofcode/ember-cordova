'use strict';

var EmberBuildTask  = require('../tasks/ember-build');
var CdvBuildTask    = require('../tasks/cordova-build');
var LinkTask        = require('../tasks/link-environment');
var HookTask        = require('../tasks/run-hook');

var defaultPlatform = require('../utils/default-platform');

var validateLocationType = require('../utils/validate-location-type');

var chalk = require('chalk');

var getCordovaConfig = require('../utils/get-cordova-config');
var validateAllowNavigation = require('../utils/validate-allow-navigation');

var Watcher = require('ember-cli/lib/models/watcher');
var Builder = require('ember-cli/lib/models/builder');
var defaultPort = process.env.PORT || 4200;

module.exports = {
  name: 'cordova:build',
  aliases: ['cdv:build', 'cdv:b'],
  description: 'Build the ember application for cordova',
  works: 'insideProject',

  availableOptions: [
    { name: 'platform',             type: String,  default: 'ios' },
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
    { name: 'output-path',          type: 'Path',  default: 'dist/',       aliases: ['op', 'out'] },
    { name: 'ssl',                  type: Boolean, default: false },
    { name: 'ssl-key',              type: String,  default: 'ssl/server.key' },
    { name: 'ssl-cert',             type: String,  default: 'ssl/server.crt' }
  ],

  run: function(options) {
    var hook, cordovaBuild, validateCordovaConfig;
    var ui = this.ui;
    var project = this;

    validateLocationType(project.config());

    validateCordovaConfig = getCordovaConfig(this.project)
      .then(function(cordovaConfig) {
        return validateAllowNavigation(cordovaConfig, options.environment !== 'production');
      });

    project.targetIsCordova = true;
    var platform = project.CORDOVA_PLATFORM = options.platform;

    hook = new HookTask({
      project: project,
      ui: ui
    });

    cordovaBuild = new CdvBuildTask({
      project: project,
      ui: ui
    });

    ui.startProgress(chalk.green('Building'), chalk.green('.'));

    return validateCordovaConfig
      .then(hook.prepare('beforeBuild'))
      .then(function() {
        new Builder({
          ui: ui,
          project: project,
          environment: options.environment,
          outputPath: options.outputPath
        })
      })
      .then(cordovaBuild.prepare(platform))
      .then(hook.prepare('afterBuild'))
      .then(function() {
        ui.writeLine(chalk.green('Cordova Project Built.'));
      })
      .catch(function(e) {
        throw e;
      });
  }
};
