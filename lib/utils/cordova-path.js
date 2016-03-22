'use strict';

var path       = require('path');

module.exports = function defaultPlatform(project) {
  return path.join(project.root, 'ember-cordova', 'cordova');
};
