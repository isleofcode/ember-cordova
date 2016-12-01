/* global navigator */
import Ember from 'ember';

const {
  Service,
  inject,
  isPresent
} = Ember;

export default Service.extend({
  cordova: inject.service('cordova'),
  splashSelector: '#splashcreen',

  init() {
    this._super(...arguments);
    console.warn(
      'DEPRECATION WARNING (ember-cordova): \n' +
      'The Splash Mixin has been deprecated. '
      'It will be discontinued as of v0.4.0 on Jan 2. \n' +
      'You need to ember-install ember-cordova-splash . ' +
      'See http://embercordova.com/pages/addons/splash for more info. '
    );
  },

  hide() {
    this.get('cordova').ready()
      .then(() => {
        if (isPresent(navigator) && isPresent(navigator.splashscreen)) {
          navigator.splashscreen.hide();
        }
      });
  },

  show() {
    this.get('cordova').ready()
      .then(() => {
        if (isPresent(navigator) && isPresent(navigator.splashscreen)) {
          navigator.splashscreen.show();
        }
      });
  }
});
