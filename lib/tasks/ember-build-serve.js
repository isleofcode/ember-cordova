'use strict';

var LiveReloadServer = require('ember-cli/lib/tasks/server/livereload-server');
var ExpressServer    = require('ember-cli/lib/tasks/server/express-server');
var Promise          = require('ember-cli/lib/ext/promise');
var Task             = require('ember-cli/lib/models/task');
var Watcher          = require('ember-cli/lib/models/watcher');
var Builder          = require('ember-cli/lib/models/builder');

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
        outputPath: options.cordovaOutputPath,
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

    return Promise.all([
      liveReloadServer.start(options),
      expressServer.start(options),
      watcher.then()
    ]);
  }
});
