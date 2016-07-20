var Watcher = require('ember-cli/lib/models/watcher');
var Builder = require('ember-cli/lib/models/builder');
var Task = require('./-task');

module.exports = Task.extend({
  ui: undefined,
  project: undefined,
  environment: undefined,
  outputPath: undefined,
  analytics: undefined,
  options: undefined,

  run: function() {
    return new Watcher({
      ui: this.ui,
      builder: new Builder({
        ui: this.ui,
        project: this.project,
        environment: this.options.environment,
        outputPath: this.options.outputPath
      }),
      analytics: this.analytics,
      options: this.options
    });
  }

});
