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
  if (platform === 'ios') {
    return IOS_OPTS;
  } else if (platform === 'android') {
    return ANDROID_OPTS;
  }
}
