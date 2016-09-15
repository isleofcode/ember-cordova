var _forEach        = require('lodash').forEach;

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
  'keystoreType'
];

module.exports = function(platform, options) {
  var cordovaOpts = [];
  var platformOpts = [];

  if (options.release === true) {
    cordovaOpts.push('--release');
  } else {
    cordovaOpts.push('--debug');
  }

  if (options.emulator === true) {
    cordovaOpts.push('--emulator');
  } else {
    cordovaOpts.push('--device');
  }

  if (options.buildConfig !== undefined) {
    cordovaOpts.push('--buildConfig=' + options.buildConfig);
  }

  if (platform === 'ios') {
    platformOpts = IOS_OPTS;
  } else if (platform === 'android') {
    platformOpts = ANDROID_OPTS;
  }

  _forEach(platformOpts, function(optionName) {
    var optionValue = options[optionName];
    if (optionValue !== undefined) {
      cordovaOpts.push('--' + optionName + '=' + optionValue);
    }
  });

  return cordovaOpts;
}
