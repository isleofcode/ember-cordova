var chalk = require('chalk');
var easyError = require('./easy-error');
var ui = require('./ui');

var UNSAFE_PRODUCTION_VALUE =
  chalk.yellow('\nYour ember-cordova/cordova/config.xml file has set the' +
    'following flag:\n') +
  chalk.grey('\t<allow-navigation href="${allowNavigation}" />\n') +
  chalk.yellow('This is necessary for device live-reload to work,\n' +
    'but is unsafe and should not be used in production.\n');

var LIVE_RELOAD_CONFIG_NEEDED =
  chalk.red('\nYour ember-cordova/cordova/config.xml file needs the ' +
    'following flag:\n') +
  chalk.grey('\t<allow-navigation href="*" />\n') +
  chalk.red('This is unsafe and should not be used in production,\n' +
    'but is necessary for device live-reload to work.\n');

function getProp(json, field, prop) {
  if (json && json[field]) {
    if (json[field][0] && json[field][0].$) {
      return json[field][0].$[prop];
    }
  }

  return undefined;
}

module.exports = function validateAllowNavigation(config, isDevelopment) {
  isDevelopment = !!isDevelopment;

  var prop = getProp(config.widget, 'allow-navigation', 'href');
  var allowNavigationIsSafe = !prop ||
    (prop.indexOf('localhost') === -1 && prop.indexOf('*') === -1);

  if (!allowNavigationIsSafe) {
    ui.writeLine(UNSAFE_PRODUCTION_VALUE.replace('${allowNavigation}', prop));
  }

  if (isDevelopment) {
    if (allowNavigationIsSafe) {
      easyError(LIVE_RELOAD_CONFIG_NEEDED);
    }
  }

  return false;
};
