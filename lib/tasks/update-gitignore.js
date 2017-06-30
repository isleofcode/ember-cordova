var Task            = require('./-task');
var fsUtils         = require('../utils/fs-utils');
var logger          = require('../utils/logger');
var includes        = require('lodash').includes;

var emptyCheckins = [
  'ember-cordova/cordova/platforms/',
  'ember-cordova/cordova/plugins/',
  'ember-cordova/cordova/www/'
];

var addLine = function(contents, path) {
  return '\n' + path;
};

var addIfNew = function(contents, path) {
  if (includes(contents, path) === false) {
    return addLine(contents, path);
  } else {
    return '';
  }
};

module.exports = Task.extend({
  project: undefined,

  run: function() {
    logger.info('ember-cordova: updating .gitignore');

    return fsUtils.read('.gitignore', { encoding: 'utf8' })
      .then(function(contents) {
        contents += addIfNew(contents, 'ember-cordova/tmp-livereload');

        var itemsLength = emptyCheckins.length;
        while (itemsLength--) {
          //First add each item
          var item = emptyCheckins[itemsLength];
          contents += addIfNew(contents, item + '*');

          //Add an empty gitKeep as these folders should be checked in
          var gitkeepPath = item + '.gitkeep';
          contents += addIfNew(contents, '!' + gitkeepPath);

          //Create the empty gitkeep
          fsUtils.write(gitkeepPath, '', { encoding: 'utf8' });
        }

        return fsUtils.write('.gitignore', contents)
      });
  }
});
