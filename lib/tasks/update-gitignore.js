var Task            = require('./-task');
var createGitkeep   = require('../utils/create-gitkeep');
var fsUtils         = require('../utils/fs-utils');
var easyError       = require('../utils/easy-error');

var chalk           = require('chalk');

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

    var ignoreContent = '\n';
    ignoreContent += 'ember-cordova/tmp-livereload\n';

    var itemsLength = ignorePaths.length;
    while (itemsLength--) {
      var item = ignorePaths[itemsLength];
      ignoreContent += item + '*\n';

      var gitkeepPath = item + '.gitkeep';
      ignoreContent += '!' + gitkeepPath + '\n';

      //create empty .gitkeep
      createGitkeep(gitkeepPath);
    }

    return fsUtils.append('.gitignore', ignoreContent)
      .catch(function(err) {
        console.log('caught');
        easyError(
          'ember-cordova: failed to update .gitignore, err: ' + err
        );
      })
  }
});
