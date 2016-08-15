'use strict';

var existsSync       = require('fs').existsSync;
var path             = require('path');
var LiveReloadServer = require('ember-cli/lib/tasks/server/livereload-server');
var ExpressServer    = require('ember-cli/lib/tasks/server/express-server');
var Promise          = require('ember-cli/lib/ext/promise');
var Task             = require('ember-cli/lib/models/task');
var Watcher          = require('ember-cli/lib/models/watcher');
var ServerWatcher    = require('ember-cli/lib/models/server-watcher');
var Builder          = require('ember-cli/lib/models/builder');

/*
 Largely taken from: https://github.com/ember-cli/ember-cli/blob/master/lib/tasks/serve.js

 We simply need the Serve task without the hang build into ember-clis Task
*/

module.exports = Task.extend({
  run: function(options) {
    var builder = new Builder({
      ui: this.ui,
      outputPath: options.cordovaOutputPath,
      project: this.project,
      environment: options.environment
    });

    var watcher = new Watcher({
      ui: this.ui,
      builder: builder,
      analytics: this.analytics,
      options: options
    });

    var serverRoot = './server';
    var serverWatcher = null;
    if (existsSync(serverRoot)) {
      serverWatcher = new ServerWatcher({
        ui: this.ui,
        analytics: this.analytics,
        watchedDir: path.resolve(serverRoot),
        options: options
      });
    }

    var expressServer = new ExpressServer({
      ui: this.ui,
      project: this.project,
      watcher: watcher,
      serverRoot: serverRoot,
      serverWatcher: serverWatcher
    });

    var liveReloadServer = new LiveReloadServer({
      ui: this.ui,
      analytics: this.analytics,
      project: this.project,
      watcher: watcher,
      expressServer: expressServer
    });

    return Promise.all([
      liveReloadServer.start(options),
      expressServer.start(options),
      watcher.then()
    ]);
  }
});
