var getCordovaPath  = require('../utils/cordova-path');
var path            = require('path');

module.exports = function(project) {
  var cordovaPath = getCordovaPath(project);
  var platformsPath = path.join(cordovaPath, 'platforms/platforms.json');
  var platformVersions = require(platformsPath);

  return Object.keys(platformVersions);
}
