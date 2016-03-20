'use strict';

var path            = require('path');
var chalk           = require('chalk');

module.exports = {
  name: 'cordova:prepare',
  aliases: ['cdv:prepare'],
  description: 'Runs cordova prepare and ember cdv link',
  works: 'insideProject',

  run: function(options) {
    return require('../tasks/prepare')(this.project)();
  }
};
