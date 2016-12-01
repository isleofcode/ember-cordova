import Ember from 'ember';

const {
  Mixin,
  inject
} = Ember;

export default Mixin.create({
  splashscreen: inject.service('device/splashscreen'),

  init() {
    this._super(...arguments);

    console.warn(
      'DEPRECATION WARNING (ember-cordova): \n' +
      'The Splash Mixin has been deprecated. ' +
      'It will be discontinued as of v0.4.0 on Jan 2. \n' +
      'You need to ember-install ember-cordova-splash . ' +
      'See http://embercordova.com/pages/addons/splash for more info. '
    );
  },

  afterModel() {
    this.get('splashscreen').hide();

    return this._super(...arguments);
  }
});
