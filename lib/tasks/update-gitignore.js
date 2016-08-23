var Task            = require('./-task');
var Promise         = require('ember-cli/lib/ext/promise');

var chalk           = require('chalk');
var appendFileSync  = require('fs').appendFileSync;

var ignoreContent = '\n' +
  'ember-cordova/cordova/platforms/\n' +
  '!ember-cordova/cordova/platforms/.gitkeep\n' +
  'ember-cordova/cordova/plugins/\n' +
  '!ember-cordova/cordova/plugins/.gitkeep\n' +
  'ember-cordova/cordova/www\n' +
  '!ember-cordova/cordova/www/.gitkeep\n';

module.exports = Task.extend({
  project: undefined,
  ui: undefined,

  run: function() {
    this.ui.writeLine(chalk.green(
      'ember-cordova: updating .gitignore'
    ));

    return new Promise(function(resolve) {
      try {
        appendFileSync('.gitignore', ignoreContent);
        resolve();
      } catch(err) {
        this.ui.writeLine(chalk.red(
          'ember-cordova: failed to update .gitignore, err: ' + err
        ));
        resolve();
      }
    }.bind(this));
  }
});
