var Task            = require('./-task');
var Promise         = require('ember-cli/lib/ext/promise');

var chalk           = require('chalk');
var fs              = require('fs');

var ignorePaths = [
  'ember-cordova/cordova/platforms/',
  'ember-cordova/cordova/plugins/',
  'ember-cordova/cordova/www/'
];

module.exports = Task.extend({
  project: undefined,
  ui: undefined,

  run: function() {
    this.ui.writeLine(chalk.green(
      'ember-cordova: updating .gitignore'
    ));

    return new Promise(function(resolve) {
      try {
        var ignoreContent = '\n';

        var itemsLength = ignorePaths.length;
        while (itemsLength--) {
          var item = ignorePaths[itemsLength];
          ignoreContent += item + '*\n';

          var gitkeepPath = item + '.gitkeep';
          ignoreContent += '!' + gitkeepPath + '\n';

          //create empty .gitkeep
          fs.closeSync(fs.openSync(gitkeepPath, 'w'));
        }

        fs.appendFileSync('.gitignore', ignoreContent);
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
