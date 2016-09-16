var Task            = require('../-task');
var Promise         = require('ember-cli/lib/ext/promise');
var ui              = require('../../utils/ui');
var _pullAll        = require('lodash').pullAll;
var _intersection   = require('lodash').intersection;
var chalk           = require('chalk');

var addCmds = ['add', 'a'];
var rmCmds = ['remove', 'rm', 'r'];

var getCommand = function(rawArgs) {
  if (_intersection(rawArgs, addCmds).length > 0) {
    return 'add';
  } else if (_intersection(rawArgs, rmCmds)) {
    return 'remove'
  }
};

module.exports = Task.extend({
  run: function(rawArgs, type) {
    return new Promise(function(resolve, reject) {
      var command, validatedCommand;

      command = getCommand(rawArgs);

      if (!command) {
        ui.writeLine(chalk.red(
          'Missing add or remove flag, e.g. ember cdv:' + type + ' add ios'
        ));

        reject();
      }

      var commands = addCmds.concat(rmCmds);
      _pullAll(rawArgs, commands);

      validatedCommand = {
        command: command,
        args: rawArgs
      };

      if (type === 'platform') {
        validatedCommand.platform = rawArgs[0];
      }

      resolve(validatedCommand);
    });
  }
});
