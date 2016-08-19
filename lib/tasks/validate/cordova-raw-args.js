var Task            = require('../-task');
var Promise         = require('ember-cli/lib/ext/promise');
var ui              = require('../../utils/ui');
var _pullAll        = require('lodash').pullAll;
var _includes       = require('lodash').includes;
var chalk           = require('chalk');

module.exports = Task.extend({
  run: function(rawArgs, type) {
    return new Promise(function(resolve, reject) {
      var command;

      if (_includes(rawArgs, 'add')) { command = 'add' }
      if (_includes(rawArgs, 'remove')) { command = 'remove' }

      if (!command) {
        ui.writeLine(chalk.red(
          'Missing add or remove flag, e.g. ember cdv:' + type + ' add ios'
        ));

        reject();
      }

      _pullAll(rawArgs, ['add', 'remove']);

      resolve({ command: command, args: rawArgs });
    });
  }
});
