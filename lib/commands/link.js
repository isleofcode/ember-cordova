'use strict';

var path            = require('path');
var defaultPlatform = require('../utils/default-platform');

module.exports = {
  name: 'cordova:link',
  aliases: ['cdv:link'],
  description: 'symlink dist to cordova/www',
  works: 'insideProject',

  run: function(options) {
    var linkEnvironment = require('../../lib/tasks/link-environment')(this.project);
    return linkEnvironment();
  }
};

