var path                  = require('path');
var fs                    = require('fs');
var cordovaPath           = require('./cordova-path');

module.exports = function(project) {
  var platform = project.CORDOVA_PLATFORM;

  var platformsPath = path.join(cordovaPath(project), 'platforms');
  var assetsPath;

  if (platform === 'ios') {
    assetsPath = path.join(platformsPath, 'ios', 'www');
  } else if (platform === 'android') {
    assetsPath = path.join(platformsPath, 'android', 'assets', 'www');
  } else if (platform === 'browser') {
    assetsPath = path.join(platformsPath, 'browser', 'www');
  }

  var files = ['cordova_plugins.js'];
  if (fs.existsSync(path.join(assetsPath, 'plugins'))) {
    files.push('plugins/**');
  }

  return {
    path: assetsPath,
    files: files
  }
};
