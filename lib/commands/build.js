'use strict';

var Command         = require('./-command');

var CdvBuildTask    = require('../tasks/cordova-build');
var HookTask        = require('../tasks/run-hook');
var BuildTask       = require('../tasks/ember-build');
var chalk           = require('chalk');

var ValidateLocationType    = require('../tasks/validate/location-type');
var ValidatePlatformTask    = require('../tasks/validate/platform');
var ValidateAllowNavigation = require('../tasks/validate/allow-navigation');

module.exports = Command.extend({
  name: 'cordova:build',
  aliases: ['cdv:build', 'cdv:b'],
  description: 'Build the ember application for cordova',
  works: 'insideProject',

  /* eslint-disable max-len */
  availableOptions: [
    { name: 'platform',                        type: String,  default: 'ios' },
    { name: 'verbose',                         type: Boolean, default: false,                       aliases: ['v'] },
    { name: 'environment',                     type: String,  default: 'development',               aliases: ['e', 'env', { 'dev': 'development' }, { 'prod': 'production' }] },
    { name: 'cordova-output-path',             type: 'Path',  default: 'ember-cordova/cordova/www', aliases: ['op', 'out'] },
    { name: 'release',                         type: Boolean, default: false },
    { name: 'device',                          type: Boolean, default: false },
    { name: 'emulator',                        type: Boolean, default: true },
    { name: 'buildConfig',                     type: 'Path' },

    // iOS Signing Options
    { name: 'codeSignIdentity',                type: String },
    { name: 'provisioningProfile',             type: String },
    { name: 'codesignResourceRules',           type: String },

    // android Signing Options
    { name: 'keystore',                        type: String },
    { name: 'storePassword',                   type: String },
    { name: 'alias',                           type: String },
    { name: 'password',                        type: String },
    { name: 'keystoreType',                    type: String },

    //Gradle
    { name: 'gradleArg',                       type: Boolean, default: false },
    { name: 'cdvBuildMultipleApks',            type: String },
    { name: 'cdvVersionCode',                  type: String },
    { name: 'cdvReleaseSigningPropertiesFile', type: String },
    { name: 'cdvDebugSigningPropertiesFile',   type: String },
    { name: 'cdvMinSdkVersion',                type: String },
    { name: 'cdvBuildToolsVersion',            type: String },
    { name: 'cdvCompileSdkVersion',            type: String }
  ],
  /* eslint-enable max-len */

  run: function(options) {
    this._super.apply(this, arguments);

    var ui = this.ui;
    var project = this.project;
    var platform = options.platform;
    var isRelease = options.release !== false ? true : false;
    var isEmulator = options.device !== false ? true : false;

    //Vars for live reload addon service
    this.project.targetIsCordova = true;
    this.project.CORDOVA_PLATFORM = platform;

    var validateLocationType = new ValidateLocationType({
      project: this.project,
      ui: this.ui
    });

    var validateAllowNavigation = new ValidateAllowNavigation({
      project: this.project,
      ui: this.ui
    });

    var validatePlatform = new ValidatePlatformTask({
      project: this.project,
      ui: this.ui,
      platform: platform
    });

    var hook = new HookTask({
      project: project,
      ui: ui
    });

    var emberBuild = new BuildTask({
      ui: ui,
      project: project,
      environment: options.environment,
      outputPath: options.cordovaOutputPath
    });

    var cordovaBuild = new CdvBuildTask({
      project: project,
      ui: ui,
      platform: platform,
      isRelease: isRelease,
      isEmulator: isEmulator,
      buildConfig: options.buildConfig,
      platformOpts: parsePlatformOpts(platform, options)
    });

    ui.writeLine(chalk.green('Building'));

    return validateLocationType.run(this.project.config())
      .then(validateAllowNavigation.prepare(false))
      .then(validatePlatform.prepare())
      .then(hook.prepare('beforeBuild'))
      .then(emberBuild.prepare())
      .then(cordovaBuild.prepare(platform, options.release))
      .then(hook.prepare('afterBuild'))
      .then(function() {
        ui.writeLine(chalk.green('Cordova Project Built.'));
      })
      .catch(function(e) {
        throw e;
      });
  }
});
