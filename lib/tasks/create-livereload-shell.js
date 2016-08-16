'use strict';

var Task            = require('./-task');
var getNetworkIp    = require('../utils/get-network-ip');
var Promise         = require('ember-cli/lib/ext/promise');

var easyError       = require('../utils/easy-error');
var cordovaPath     = require('../utils/cordova-path');
var fs              = require('fs')
var path            = require('path');
var chalk           = require('chalk');


module.exports = Task.extend({
  run: function(port) {
    var task = this;
    console.log(this.project.addonBlueprintLookupPaths());
    return new Promise(function(resolve, reject) {
      try {
        //TODO - saner path lookup
        var shellPath = path.join('node_modules/ember-cordova/blueprints', 'live-reload-shell/index.html');
        var outputPath = path.join(cordovaPath(task.project), 'www', 'index.html');
        var html = fs.readFileSync(shellPath, 'utf8');

        var networkAddress = getNetworkIp();
        var deviceServerUrl = 'http://' + networkAddress + ':' + port;

        html = html.replace(new RegExp('{{liveReloadUrl}}', 'gi'), deviceServerUrl);
        fs.writeFileSync(outputPath, html, 'utf8');

        resolve();
      } catch(err) {
        task.ui.writeLine(chalk.red(
          "ERROR ember-cordova: Error moving index.html for livereload " + err
        ));
        reject();
      }
    });
  }
});

