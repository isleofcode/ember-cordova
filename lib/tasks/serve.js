'use strict';

var LiveReloadServer = require('ember-cli/lib/tasks/server/livereload-server');
var ExpressServer    = require('ember-cli/lib/tasks/server/express-server');
var Promise          = require('ember-cli/lib/ext/promise');
var Task             = require('ember-cli/lib/models/task');
var Watcher          = require('ember-cli/lib/models/watcher');
var Builder          = require('ember-cli/lib/models/builder');
var rimraf           = require('rimraf');
var chalk            = require('chalk');

/*
 Largely taken from: https://github.com/ember-cli/ember-cli/blob/master/lib/tasks/serve.js

 We simply need the Serve task without the hang build into ember-clis Task
*/

module.exports = Task.extend({
  run: function(options) {
    var watcher = new Watcher({
      ui: this.ui,
      builder: new Builder({
        ui: this.ui,
        outputPath: 'ember-cordova/tmp-livereload',
        project: this.project,
        environment: options.environment
      }),
      analytics: this.analytics,
      options: options
    });

    var expressServer = new ExpressServer({
      ui: this.ui,
      project: this.project,
      watcher: watcher,
      serverRoot: './server',
    });

    var liveReloadServer = new LiveReloadServer({
      ui: this.ui,
      analytics: this.analytics,
      project: this.project,
      watcher: watcher,
      expressServer: expressServer
    });

    this.cleanupOnExit();

    return Promise.all([
      liveReloadServer.start(options),
      expressServer.start(options),
      watcher.then()
    ]).then(function() {
      this.ui.writeLine(chalk.green(
        'ember-cordova: Device LiveReload is enabled'
      ));

      return new Promise(function() {
        // hang until the user exits.
      });
    }.bind(this));
  },

  cleanupOnExit: function() {
    process.on('SIGINT', function (){
      this.ui.writeLine(chalk.blue(
        'ember-cordova: Exiting livereload, cleaning up tmp serve'
      ));

      try {
        rimraf.sync('ember-cordova/tmp-livereload');
      } catch(err) {
        this.ui.writeLine(chalk.red(
          'ERROR: ember-cordova: failed to clean liveReload dir ' + err
        ));
      }
    }.bind(this));
  }
});
