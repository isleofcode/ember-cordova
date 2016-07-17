'use strict';

var EmberBuildTask  = require('../tasks/ember-build');
var CdvBuildTask    = require('../tasks/cordova-build');
var LinkTask        = require('../tasks/link-environment');
var HookTask        = require('../tasks/run-hook');

var path            = require('path');
var defaultPlatform = require('../utils/default-platform');

var validateLocationType = require('../utils/validate-location-type');

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
    validateLocationType(this.project.config());

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
  }
};
