'use strict';

var EmberBuildTask  = require('../tasks/ember-build');
var CdvBuildTask    = require('../tasks/cordova-build');
var LinkTask        = require('../tasks/link-environment');
var HookTask        = require('../tasks/run-hook');

var path            = require('path');
var defaultPlatform = require('../utils/default-platform');
var isTargetCordova = require('../utils/is-target-cordova');

module.exports = {
  name: 'cordova:build',
  aliases: ['cdv:build'],
  description: 'Build ember & cordova applications',
  works: 'insideProject',

  availableOptions: [{
    name: 'environment',
    type: String,
    default: 'development',
    aliases: ['env']
  }, {
    name: 'platform',
    type: String
  }],

  run: function(options) {
    this.validateLocationType();

    var platform = options.platform || defaultPlatform(this.project);

    var hook = new HookTask({
      project: this.project,
      ui: this.ui
    });

    var emberBuild = new EmberBuildTask({
      project: this.project,
      ui: this.ui,
      buildOptions: options.buildOptions
    });

    var link = new LinkTask({
      project: this.project,
      ui: this.ui
    });

    var cordovaBuild = new CdvBuildTask({
      project: this.project,
      ui: this.ui
    });

    return hook.run('beforeBuild')
           .then(emberBuild.run(options.environment))
           .then(link.run())
           .then(cordovaBuild.run(platform))
           .then(hook.run('afterBuild'));
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
