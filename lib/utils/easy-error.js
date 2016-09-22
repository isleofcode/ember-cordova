var chalk           = require('chalk');

module.exports = function easyError(message, ui) {
  if (ui === undefined) {
    ui = require('./ui');
  }

  ui.writeLine(chalk.red(message));
  throw new Error();
};
