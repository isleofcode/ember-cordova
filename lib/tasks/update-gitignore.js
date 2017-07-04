var Task            = require('./-task');
var fsUtils         = require('../utils/fs-utils');
var logger          = require('../utils/logger');
var includes        = require('lodash').includes;

var ignores = [
  'ember-cordova/tmp-livereload',
  'ember-cordova/cordova/node_modules',
  'ember-cordova/cordova/package.json',
  'ember-cordova/cordova/package-lock.json'
];

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

        ignores.forEach(function(ignore) {
          contents += addIfNew(contents, ignore);
        });

        emptyCheckins.forEach(function(item) {
          //First add each item
          contents += addIfNew(contents, item + '*');

          //Add an empty gitKeep as these folders should be checked in
          var gitkeepPath = item + '.gitkeep';
          contents += addIfNew(contents, '!' + gitkeepPath);

          //Create the empty gitkeep
          fsUtils.write(gitkeepPath, '', { encoding: 'utf8' });
        });

        return fsUtils.write('.gitignore', contents);
      });
  }
});
