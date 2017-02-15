import PlatformService from 'ember-cordova/services/ember-cordova/platform';

export default PlatformService.extend({
  init() {
    this._super(...arguments);
    this._setPlatforms();

    console.warn(
      'DEPRECATION WARNING (ember-cordova): \n' +
      'The device/platform service is now ember-cordova/platform \n'  +
      'device.isWebView is now isHybrid. \n' +
      'Both old aliases will be discontinued as of March 1. \n' +
      'See http://embercordova.com/pages/service_platform for API info. '
    );
  }
})
