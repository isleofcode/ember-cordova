var cordovaPath = require('./cordova-path');
var parseXml = require('./parse-xml');
var path = require('path');

module.exports = function getCordovaConfig(project) {
  var cdvPath = cordovaPath(project);
  var configPath = path.join(cdvPath, 'config.xml');

  return parseXml(configPath);
};
