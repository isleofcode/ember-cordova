'use strict';

var Command         = require('./-command');
var SplashTask      = require('splicon/dist/splash-task');
var chalk           = require('chalk');

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
    default: ['all']
  }],

  run: function(options) {
    this._super.apply(this, arguments);
    var ui = this.ui;

    this.ui.writeLine(chalk.green(
      'ember-cordova: generating-splashes'
    ));

    return new SplashTask({
      source: options.source,
      platforms: options.platform,
      projectPath: 'ember-cordova/cordova'
    }).then(function() {
      ui.writeLine(chalk.green(
        'ember-cordova: splashes generated'
      ));
    }).catch(function(err) {
      ui.writeLine(chalk.red(
        'ember-cordova: Error generating splashes ' + err
      ));
    });
  }
});
