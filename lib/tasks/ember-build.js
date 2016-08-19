var Builder = require('ember-cli/lib/models/builder');
var Task = require('./-task');

module.exports = Task.extend({
  ui: undefined,
  project: undefined,
  environment: undefined,
  outputPath: undefined,

  run: function() {
    var builder = new Builder({
      ui: this.ui,
      project: this.project,
      environment: this.environment,
      outputPath: this.outputPath
    });

    return builder.build();
  }
});
