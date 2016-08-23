var Task            = require('./-task');
var Promise         = require('ember-cli/lib/ext/promise');

var chalk           = require('chalk');
var fs              = require('fs');



module.exports = Task.extend({
  project: undefined,
  ui: undefined,
  ignoreContent: '\n' +
    'ember-cordova/cordova/platforms/\n' +
    '!ember-cordova/cordova/platforms/.gitkeep\n' +
    'ember-cordova/cordova/plugins/\n' +
    '!ember-cordova/cordova/plugins/.gitkeep\n' +
    'ember-cordova/cordova/www\n' +
    '!ember-cordova/cordova/www/.gitkeep\n',

  run: function() {
    this.ui.writeLine(chalk.green(
      'ember-cordova: updating .gitignore'
    ));

    return new Promise(function(resolve) {
      try {
        fs.appendFileSync('.gitignore', this.ignoreContent);
        resolve();
      } catch (err) {
        this.ui.writeLine(chalk.red(
          'ember-cordova: failed to update .gitignore, err: ' + err
        ));
        resolve();
      }
    }.bind(this));
  }
});
