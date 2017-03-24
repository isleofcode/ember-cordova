'use strict';

var Command         = require('./-command');
var splashTask      = require('splicon/dist/splash-task');
var getAddedPlatforms = require('../utils/get-added-platforms');
var logger          = require('../utils/logger');

var includes        = require('lodash').includes;
var pull            = require('lodash').pull;

module.exports = Command.extend({
  name: 'cordova:make-splashes',
  aliases: ['cordova:splashes', 'cdv:splash', 'cdv:make-splashes'],
  description: 'Generates cordova splash files and updates config',
  works: 'insideProject',

  availableOptions: [{
    name: 'source',
    type: String,
    default: 'ember-cordova/splash.svg'
  }, {
    name: 'platform',
    type: Array,
    values: [
      'added',
      'ios',
      'android'
    ],
    default: ['added']
  }],

  run: function(options) {
    this._super.apply(this, arguments);

    if (includes(options.platform, 'added')) {
      var addedPlatforms = getAddedPlatforms(this.project);

      if (addedPlatforms.length === 0) {
        /* eslint-disable max-len */
        throw new Error('ember-cordova: No added platforms to generate icons for');
        /* eslint-enable max-len */
      }

      options.platform = options.platform.concat(addedPlatforms);

      pull(options.platform, 'added');
    }

    logger.info('ember-cordova: generating-splashes');

    return splashTask({
      source: options.source,
      platforms: options.platform,
      projectPath: 'ember-cordova/cordova'
    }).then(function() {
      logger.success('ember-cordova: splashes generated');
    }).catch(function(err) {
      logger.error(err);
    });
  }
});
