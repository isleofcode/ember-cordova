'use strict';

var Command         = require('./-command');
var IconTask        = require('splicon/lib/icon-task');
var chalk           = require('chalk');

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
    default: ['all']
  }],

  run: function(options) {
    this._super.apply(this, arguments);

    this.ui.writeLine(chalk.green(
      'ember-cordova: generating-icons'
    ));

    return new IconTask({
      source: options.source,
      platforms: options.platform,
      projectPath: 'ember-cordova/cordova'
    }).then(function() {
      this.ui.writeLine(chalk.green(
        'ember-cordova: icons generated'
      ));
    }).catch(function(err) {
      this.ui.writeLine(chalk.red(
        'ember-cordova: Error generating icons ' + err
      ));
    });
  }
});
