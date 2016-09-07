var _kebabCase = require('lodash').kebabCase;
var _forEach = require('lodash').forEach;

var IOS_OPTS = [
  'codeSignIdentity',
  'provisioningProfile',
  'codesignResourceRules'
];

var ANDROID_OPTS = [
  'keystore',
  'provisioningProfile',
  'storePassword',
  'alias',
  'password',
  'keystoreType',
  'gradleArg',
  'cdvBuildMultipleApks',
  'cdvVersionCode',
  'cdvReleaseSigningPropertiesFile',
  'cdvDebugSigningPropertiesFile',
  'cdvMinSdkVersion',
  'cdvBuildToolsVersion',
  'cdvCompileSdkVersion'
];

module.exports = function(platform, options) {
  var optsKeys = [];
  var parsedOptions = {};

  if (platform === 'ios') { optsKeys = IOS_OPTS; }
  else if (platform === 'android') { optsKeys = ANDROID_OPTS; }

  _forEach(optsKeys, function(key) {
    _key = _kebabCase(key)
    parsedOptions[key] = options[_key];
  });

  return parsedOptions;
}
