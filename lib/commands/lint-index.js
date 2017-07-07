'use strict';

var Command         = require('./-command');
var LintTask        = require('../tasks/lint-index');

module.exports = Command.extend({
  name: 'cordova:lint-index',
  aliases: [
    'cdv:lint-index'
  ],
  description: 'Lints index.html for attributes with paths relative to root.',
  works: 'insideProject',

  availableOptions: [{
    name: 'source',
    type: String,
    default: 'www/index.html'
  }],

  run: function(options) {
    this._super.apply(this, arguments);

    var lint = new LintTask({
      source: options.source,
      project: this.project
    });

    return lint.run();
  }
});
