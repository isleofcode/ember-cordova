'use strict';

var PrepareTask     = require('../tasks/prepare');
var HookTask        = require('../tasks/run-hook');
var path            = require('path');

module.exports = {
  name: 'cordova:prepare',
  aliases: ['cdv:prepare'],
  description: 'Runs cordova prepare and ember cdv link',
  works: 'insideProject',

  run: function(options) {
    var prepare = new PrepareTask({
      project: this.project,
      ui: this.ui
    });

    var hook = new HookTask({
      project: this.project,
      ui: this.ui
    });

    return hook.run('beforePrepare')
           .then(prepare.run())
           .then(hook.run('afterPrepare'));
  }
};
