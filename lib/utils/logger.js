var chalk             = require('chalk');

var EmberCordovaError = require('./ember-cordova-error');

module.exports = {
  info: function(message) {
    console.log(message);
  },

  success: function(message) {
    console.log(chalk.green(message));
  },

  warn: function(content) {
    var message = 'WARNING: ember-cordova \n';
    message += content;
    console.log(chalk.yellow(message));
  },

  error: function(content) {
    throw new EmberCordovaError(content);
  }
};
