import Ember from 'ember';

const {
  A,
  Service,
  Evented,
  RSVP
} = Ember;

const {
  Promise
} = RSVP;

// from https://cordova.apache.org/docs/en/4.0.0/cordova_events_events.md.html
// use var because cordova/android was throwing errors re: const && strict mode
const CORDOVA_EVENTS = new A([
  'deviceready',
  'pause',
  'resume',
  'backbutton',
  'menubutton',
  'searchbutton',
  'startcallbutton',
  'endcallbutton',
  'volumedownbutton',
  'volumeupbutton',
  'batterycritical',
  'batterylow',
  'batterystatus',
  'online',
  'offline'
]);

// the cordova service listens for cordova events emitted to the document,
// and triggers the same events in emberland.
//
// subscribe to cordova events as such:
//
// ```javascript
// export default MyEmberObject.extend({
//   cordova: Ember.inject.service()
//
//   init: function() {
//     cordova.on('resume', function() { console.log('i am resumed'); });
//   }
// });
// ```

export default Service.extend(Evented, {

  _readyHasTriggered: false,
  ready() {
    if (this._readyHasTriggered) {
      return Promise.resolve();
    }
    return this._ready.promise;
  },


  /*
   * Create a listener for each default Cordova event
   * and have it trigger the event on the service
   */
  _listeners: null,
  setupListeners() {
    if (this._listeners) {
      return;
    }
    this._listeners = [];

    // add an additional handler for deviceready
    // ensure it fires first
    let listener = {
      name: 'deviceready',
      method: (e) => {
        this._readyHasTriggered = true;
        this._ready.resolve();
        this._ready = null;
      }
    };
    this._listeners.push(listener.name, listener.method, true);

    CORDOVA_EVENTS.forEach((name) => {
      let listener = {
        name,
        method: (e) => {
          this.trigger(name, e);
        }
      };

      this._listeners.push(listener);
    });

    this._listeners.forEach((l) => {
      document.addEventListener(l.name, l.method, true);
    });
  },

  /*
   * Services are long lived, but still need teardown to avoid
   * leaking in automated tests
   */
  teardownListeners() {
    if (!this._listeners) {
      return;
    }
    this._listeners.forEach((listener) => {
      document.removeEventListener(listener.name, listener.method, true);
    });
  },

  willDestroy() {
    this._super();
    this.teardownListeners();

    if (this._ready) {
      this._ready.reject();
      this._ready = null;
    }
  },

  init() {
    this._super();
    this.setupListeners();
    this._ready = RSVP.defer();
  }
});
