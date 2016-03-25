'use strict';

var execSync    = require('child_process').execSync;

module.exports = {
  name: 'cordova:serve',
  aliases: [
    'cordova:serve',
    'cdv:serve',
    'cdv:s'
  ],
  description: 'Builds app, then runs liveReload server',
  works: 'insideProject',

  availableOptions: [{
    name: 'reload-url',
    type: String
  }, {
    name: 'platform',
    type: String
  }, {
    name: 'env',
    type: String,
    default: 'development'
  }],

  run: function(options) {
    var config, platform, address;

    config = this.project.config.cordova || {};
    platform = options.platform || config.platform || "ios";
    address = options.reloadUrl || config.reloadUrl || "http://localhost:4200";

    //A little loopy, but will make later automation easier
    var command = "CORDOVA_LIVERELOAD=true" +
      " CORDOVA_RELOAD_ADDRESS=" + address +
      " CORDOVA_PLATFORM=" + platform +
      " ember s --env "+ options.env;

    return execSync(command, {stdio:[0,1,2]});
  }
};
