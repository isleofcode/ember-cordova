'use strict';

var Task            = require('./-task');
var CordovaRawTask  = require('../tasks/cordova-raw');

module.exports = Task.extend({
  project: undefined,
  ui: undefined,

  run: function(platform, release, device, gradleArg, emulator, buildConfig, codeSignIdentity, provisioningProfile, codesignResourceRules, keystore, storePassword, alias, password, keystoreType, cdvBuildMultipleApks, cdvVersionCode, cdvReleaseSigningPropertiesFile, cdvDebugSigningPropertiesFile, cdvMinSdkVersion, cdvBuildToolsVersion, cdvCompileSdkVersion) {

    //generic variables
    var buildType = release ? '--release' : '--debug';
    var buildFor = device ? '--device' : '--emulator';
    var buildConfig = buildConfig ? '--buildConfig={buildConfig}';

    //plateformOpts variables
    var iosOptions = '--' + codeSignIdentity ? '--codeSignIdentity={codeSignIdentity}' + provisioningProfile ?'--provisioningProfile={provisioningProfile}' + codesignResourceRules ?'--codesignResourceRules={codesignResourceRules}';
    var androidOptions = '--' + keystore ? '--keystore={keystore}' + storePassword ? '--storePassword={storePassword}' + alias ? '--alias={alias}' + password ? '--password={password}' + keystoreType ? '--keystoreType={keystoreType}';
    var gradleAndroidOptions = '--' + '--gradleArg' + cdvBuildMultipleApks ? '--cdvBuildMultipleApks={cdvBuildMultipleApks}' + cdvVersionCode ? '--cdvVersionCode={cdvVersionCode}' + cdvReleaseSigningPropertiesFile ? '--cdvReleaseSigningPropertiesFile={cdvReleaseSigningPropertiesFile}' + cdvDebugSigningPropertiesFile ? '--cdvDebugSigningPropertiesFile={cdvDebugSigningPropertiesFile}' + cdvMinSdkVersion ? '--cdvMinSdkVersion={cdvMinSdkVersion}' + cdvBuildToolsVersion ? '--cdvBuildToolsVersion={cdvBuildToolsVersion}' + cdvCompileSdkVersion ? '--cdvCompileSdkVersion={cdvCompileSdkVersion}';

    var plateformOpts = if (platform === 'ios') {
      iosOptions;
    } if (platform === 'android'){
        if (gradleArg) {
          gradleAndroidOptions;
        } else {
          androidOptions;
        }
    };

    var opts = {
      platforms: [platform],
      options: [
        buildType,
        buildFor,
        buildConfig,
        plateformOpts
      ]
    };

    var build = new CordovaRawTask({
      project: this.project,
      rawApi: 'build',
      ui: this.ui
    });

    return build.run(opts);
  }
});
