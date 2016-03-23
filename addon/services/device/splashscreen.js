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
    /*
      TODO: This should be hookable for non-cordova usage?
     */
    // if (!this.get('cordova')) {
    //   jQuery(this.get('splashSelector')).hide();
    // }

    this.get('cordova').ready()
      .then(() => {
        //is cordova remove the splash screen
        if (navigator && navigator.splashscreen) {
          navigator.splashscreen.hide();
        }
      });
  },

  show() {
    /*
     TODO: This should be hookable for non-cordova usage?
     */
    // jQuery(this.get('splashSelector')).show();
    this.get('cordova').ready()
      .then(() => {
        //is cordova remove the splash screen
        if (navigator && navigator.splashscreen) {
          navigator.splashscreen.show();
        }
      });
  }

});
