'use strict';

var Command         = require('./-command');
var iconTask        = require('splicon/dist/icon-task');
var getAddedPlatforms = require('../utils/get-added-platforms');
var logger          = require('../utils/logger');

var includes        = require('lodash').includes;
var pull            = require('lodash').pull;

module.exports = Command.extend({
  name: 'cordova:make-icons',
  aliases: ['cordova:icons', 'cdv:icon', 'cdv:make-icons'],
  description: 'Generates cordova icon files and updates config',
  works: 'insideProject',

  availableOptions: [{
    name: 'source',
    type: String,
    default: 'ember-cordova/icon.svg'
  }, {
    name: 'platform',
    type: Array,
    values: [
      'added',
      'ios',
      'android',
      'windows',
      'blackberry'
    ],
    default: ['added']
  }],

  run: function(options) {
    this._super.apply(this, arguments);

    if (includes(options.platform, 'added')) {
      var addedPlatforms = getAddedPlatforms(this.project);

      options.platform = options.platform.concat(addedPlatforms);

      pull(options.platform, 'added');
    }

    logger.info('ember-cordova: generating-icons');

    return iconTask({
      source: options.source,
      platforms: options.platform,
      projectPath: 'ember-cordova/cordova'
    }).then(function() {
      logger.success('ember-cordova: icons generated');
    }).catch(function(err) {
      logger.error(err);
    });
  }
});
