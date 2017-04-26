var _pick           = require('lodash').pick;

var CORDOVA_OPTS = [
  'release',
  'debug',
  'emulator',
  'device',
  'buildConfig'
];

var IOS_OPTS = [
  'codeSignIdentity',
  'provisioningProfile',
  'codesignResourceRules',
  'developmentTeam',
  'packageType'
];

var ANDROID_OPTS = [
  'keystore',
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
  var buildKeys;

  if (platform === 'ios') {
    buildKeys = CORDOVA_OPTS.concat(IOS_OPTS);
  } else if (platform === 'android') {
    buildKeys = CORDOVA_OPTS.concat(ANDROID_OPTS);
  }

  return _pick(options, buildKeys);
};
