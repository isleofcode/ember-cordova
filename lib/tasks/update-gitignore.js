var Task            = require('./-task');
var fsUtils         = require('../utils/fs-utils');
var logger          = require('../utils/logger');
var Promise         = require('rsvp').Promise;

var ignorePaths = [
  'ember-cordova/cordova/platforms/',
  'ember-cordova/cordova/plugins/',
  'ember-cordova/cordova/www/'
];

module.exports = Task.extend({
  project: undefined,

  run: function() {
    return new Promise(function(resolve, reject) {
      logger.info('ember-cordova: updating .gitignore');

      var ignoreContent = '\n';
      ignoreContent += 'ember-cordova/tmp-livereload\n';

      var itemsLength = ignorePaths.length;
      while (itemsLength--) {
        var item = ignorePaths[itemsLength];
        ignoreContent += item + '*\n';

        var gitkeepPath = item + '.gitkeep';
        ignoreContent += '!' + gitkeepPath + '\n';

        //create empty .gitkeep
        fsUtils.write(gitkeepPath, '', { encoding: 'utf8' });
      }

      fsUtils.append('.gitignore', ignoreContent)
        .then(resolve)
        .catch(function(err) {
          reject('failed to update .gitignore, err: ' + err);
        })
    });
  }
});
