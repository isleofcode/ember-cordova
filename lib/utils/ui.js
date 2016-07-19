var UI = require('ember-cli/lib/ui');
var ui = new UI({
  inputStream: process.stdin,
  outputStream: process.stdout,
  writeLevel: 'DEBUG',
  ci: true
});

module.exports = ui;
