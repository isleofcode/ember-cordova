'use strict';

var CdvBuildTask    = require('../tasks/cordova-build');
var HookTask        = require('../tasks/run-hook');

var validateLocationType    = require('../utils/validate-location-type');
var getCordovaConfig        = require('../utils/get-cordova-config');
var validateAllowNavigation = require('../utils/validate-allow-navigation');

var Builder = require('ember-cli/lib/models/builder');
var path    = require('path');
var chalk   = require('chalk');

module.exports = {
  name: 'cordova:build',
  aliases: ['cdv:build', 'cdv:b'],
  description: 'Build the ember application for cordova',
  works: 'insideProject',

  availableOptions: [
    { name: 'platform',             type: String,  default: 'ios' },
    { name: 'verbose',              type: Boolean, default: false,         aliases: ['v'] },
    { name: 'environment',          type: String,  default: 'development', aliases: ['e', 'env', { 'dev': 'development' }, { 'prod': 'production' }] },
    { name: 'output-path',          type: 'Path',  default: 'dist/',       aliases: ['op', 'out'] },
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
