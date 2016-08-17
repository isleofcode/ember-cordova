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

  run: function(port, reloadUrl) {
    var task = this;
    return new Promise(function(resolve, reject) {
      try {
        //Read in the shell index.html file
        var shellPath = path.join(
          __dirname,
          '../templates/livereload-shell/index.html'
        );
        var outputPath = path.join(cordovaPath(task.project), 'www/index.html');
        var html = fs.readFileSync(shellPath, 'utf8');

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

