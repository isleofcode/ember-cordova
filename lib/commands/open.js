'use strict';

var OpenAppTask     = require('../tasks/open-app');
var getPlatform     = require('../utils/get-platform');

module.exports = {
  name: 'cordova:open',
  aliases: ['cdv:open'],
  description: 'Open the native platform project with the default or ' +
    'specified application',
  works: 'insideProject',

  availableOptions: [
    { name: 'platform', type: String, default: 'ios' },
    { name: 'application', type: String }
  ],

  run: function(options) {
    var platform = getPlatform(this.project.config(), options);

    var open = new OpenAppTask({
      application: options.application,
      platform: platform,
      project: this.project,
      ui: this.ui
    });

    return open.run();
  }
};
