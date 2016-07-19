var Task = require('ember-cli/lib/models/task');

module.exports = Task.extend({
  prepare: function() {
    var task = this;

    return function preparedTask() {
      task.run.apply(task, arguments);
    }
  }
});
