var Task = require('ember-cli/lib/models/task');

module.exports = Task.extend({
  prepare: function() {
    var task = this;
    var args = Array.prototype.slice.call(arguments);

    return function preparedTask() {
      return task.run.apply(task, args);
    };
  }
});
