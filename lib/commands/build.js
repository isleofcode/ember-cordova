'use strict';

var CdvBuildTask    = require('../tasks/cordova-build');
var HookTask        = require('../tasks/run-hook');
var BuildTask       = require('../tasks/ember-build');
var getPlatform     = require('../utils/get-platform');

var ValidatePlatformTask    = require('../tasks/validate-platform');
var validateLocationType    = require('../utils/validate-location-type');
var getCordovaConfig        = require('../utils/get-cordova-config');
var validateAllowNavigation = require('../utils/validate-allow-navigation');

var chalk   = require('chalk');

module.exports = {
  name: 'cordova:build',
  aliases: ['cdv:build', 'cdv:b'],
  description: 'Build the ember application for cordova',
  works: 'insideProject',

  /* eslint-disable max-len */
  availableOptions: [
    { name: 'platform',             type: String,  default: 'ios' },
    { name: 'verbose',              type: Boolean, default: false,         aliases: ['v'] },
    { name: 'environment',          type: String,  default: 'development', aliases: ['e', 'env', { 'dev': 'development' }, { 'prod': 'production' }] },
    { name: 'cordova-output-path',  type: 'Path',  default: 'ember-cordova/cordova/www',       aliases: ['op', 'out'] },
    { name: 'release',              type: Boolean, default: false }
  ],
  /* eslint-enable max-len */

  run: function(options) {
    var hook, validatePlatform, build, cordovaBuild, validateCordovaConfig;
    var ui = this.ui;
    var project = this.project;

    var platform = getPlatform(project.config(), options);
    project.CORDOVA_PLATFORM = platform;

    project.targetIsCordova = true;

    //Confirm location type is hash
    validateLocationType(this.project.config());

    //Warn the user if allow-navigation is still on
    validateCordovaConfig = getCordovaConfig(this.project)
      .then(function(cordovaConfig) {
        return validateAllowNavigation(
          cordovaConfig,
          false
        );
      });

    validatePlatform = new ValidatePlatformTask({
      project: this.project,
      ui: this.ui,
      platform: platform
    });

    hook = new HookTask({
      project: project,
      ui: ui
    });

    build = new BuildTask({
      ui: ui,
      project: project,
      environment: options.environment,
      outputPath: options.cordovaOutputPath
    });

    cordovaBuild = new CdvBuildTask({
      project: project,
      ui: ui
    });

    ui.writeLine(chalk.green('Building'));

    return validateCordovaConfig
      .then(validatePlatform.prepare())
      .then(hook.prepare('beforeBuild'))
      .then(build.prepare())
      .then(cordovaBuild.prepare(platform, options.release))
      .then(hook.prepare('afterBuild'))
      .then(function() {
        ui.writeLine(chalk.green('Cordova Project Built.'));
      })
      .catch(function(e) {
        throw e;
      });
  }
};
