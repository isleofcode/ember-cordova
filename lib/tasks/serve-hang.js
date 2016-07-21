var Promise = require('ember-cli/lib/ext/promise');
var Task = require('./-task');
var chalk = require('chalk');

module.exports = Task.extend({
  ui: undefined,

  run: function() {
    this.ui.writeLine(chalk.green('cordova live reload running...'));

    return new Promise(function(resolve) { /* never resolve ;) */});

  }

});
