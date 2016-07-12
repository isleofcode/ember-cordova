'use strict';

var IconTask        = require('splicon/lib/icon-task');

module.exports = {
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
    //assert platforms are valid
    //assert source exists
    return IconTask({
      source: options.source,
      platforms: options.platform,
      projectPath: 'ember-cordova/cordova'
    }).then(() => {
      console.log("DONE");
    }).catch((err) => {
      console.log("ERROR", err);
    });
  }
};

