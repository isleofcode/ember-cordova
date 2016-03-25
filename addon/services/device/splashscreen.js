/* global navigator */
import Ember from 'ember';

const {
  Service,
  inject
} = Ember;

export default Service.extend({
  cordova: inject.service('cordova'),
  splashSelector: '#splashcreen',

  hide() {
    this.get('cordova').ready()
      .then(() => {
        if (navigator && navigator.splashscreen) {
          navigator.splashscreen.hide();
        }
      });
  },

  show() {
    this.get('cordova').ready()
      .then(() => {
        if (navigator && navigator.splashscreen) {
          navigator.splashscreen.show();
        }
      });
  }
});
