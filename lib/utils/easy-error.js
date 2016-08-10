var ui              = require('./ui');
var chalk           = require('chalk');

module.exports = function easyError(message) {
  ui.writeLine(chalk.red(message));
  throw new Error();
};
