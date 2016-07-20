'use strict';

var easyError = require('../utils/easy-error');
var chalk = require('chalk');
var LINK_DEPRECATION = chalk.yellow(
  '\nDEPRECATED\n--------------\n' +
  '\t`cordova:link` and alias `cdv:link` have been deprecated because\n' +
  '\ttheir behavior is no longer utilized by `ember-cordova` since assets\n'  +
  '\tare now built directly into the cordova/www folder.\n'
);

module.exports = {
  name: 'cordova:link',
  aliases: ['cdv:link'],
  description: '[DEPRECATED] symlink dist to cordova/www',
  works: 'insideProject',

  run: function() {
    easyError(LINK_DEPRECATION);
  }
};
