'use strict';

var LinkTask        = require('../tasks/link-environment');

module.exports = {
  name: 'cordova:link',
  aliases: ['cdv:link'],
  description: 'symlink dist to cordova/www',
  works: 'insideProject',

  run: function(options) {
    var link = new LinkTask({
      project: this.project,
      ui: this.ui
    });

    return link.run();
  }
};
