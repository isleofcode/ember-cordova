'use strict';

var Task            = require('./-task');
var getNetworkIp    = require('../utils/get-network-ip');
var Promise         = require('ember-cli/lib/ext/promise');

var cordovaPath     = require('../utils/cordova-path');
var fs              = require('fs')
var path            = require('path');
var chalk           = require('chalk');


module.exports = Task.extend({
  project: undefined,
  ui: undefined,

  //Read in the shell index.html file
  getShellTemplate: function() {
    var shellPath = path.join(
      __dirname,
      '../templates/livereload-shell/index.html'
    );
    return fs.readFileSync(shellPath, 'utf8');
  },

  run: function(port, reloadUrl) {
    var task = this;
    return new Promise(function(resolve, reject) {
      try {
        var html = task.getShellTemplate();
        var outputPath = path.join(cordovaPath(task.project), 'www/index.html');

        if (reloadUrl === undefined) {
          //Replace {{liveReloadUrl}} with address
          var networkAddress = getNetworkIp();
          reloadUrl = 'http://' + networkAddress + ':' + port;
        }
        html = html.replace(new RegExp('{{liveReloadUrl}}', 'gi'), reloadUrl);

        fs.writeFileSync(outputPath, html, 'utf8');
        resolve();
      } catch (err) {
        task.ui.writeLine(chalk.red(
          'ERROR ember-cordova: Error moving index.html for livereload ' + err
        ));
        reject();
      }
    });
  }
});

