var ui              = require('./ui');
var _pullAll        = require('lodash').pullAll;
var _includes       = require('lodash').includes;
var chalk           = require('chalk');


module.exports = function(rawArgs, type) {
  var command;

  if (_includes(rawArgs, 'add')) { command = 'add' }
  if (_includes(rawArgs, 'remove')) { command = 'remove' }

  if (!command) {
    ui.writeLine(chalk.red(
      'Missing add or remove flag, e.g. ember cdv:' + type + ' add ios'
    ));

    return new Error();
  }

  _pullAll(rawArgs, ['add', 'remove']);

  return { command: command, args: rawArgs };
};
