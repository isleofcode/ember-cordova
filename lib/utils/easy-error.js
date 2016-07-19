var ui = require('./ui');

module.exports = function easyError(message) {
  ui.writeLine(message);
  process.exit(1);
};
