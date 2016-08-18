'use strict';

var PrepareTask     = require('../tasks/prepare');
var HookTask        = require('../tasks/run-hook');

module.exports = {
  name: 'cordova:prepare',
  aliases: ['cdv:prepare'],
  description: 'Runs cordova prepare and ember cdv link',
  works: 'insideProject',

  run: function() {
    var prepare = new PrepareTask({
      project: this.project,
      ui: this.ui
    });

    var hook = new HookTask({
      project: this.project,
      ui: this.ui
    });

    return hook.run('beforePrepare')
      .then(prepare.prepare())
      .then(hook.prepare('afterPrepare'));
  }
};
