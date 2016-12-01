import Ember from 'ember';

const {
  A,
  Service,
  Evented,
  RSVP,
  run
} = Ember;

const { Promise } = RSVP;

// from https://cordova.apache.org/docs/en/4.0.0/cordova_events_events.md.html
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

export default Service.extend(Evented, {
  _listeners: undefined,
  _ready: undefined,
  _readyHasTriggered: false,

  init() {
    this._super();

    console.warn(
      'DEPRECATION WARNING (ember-cordova): \n' +
      'The Events Mixin has been deprecated. \n ' +
      'It will be discontinued as of v0.4.0 on Jan 2. \n' +
      'You need to ember-install ember-cordova-events . ' +
      'See http://embercordova.com/pages/addons/events for more info. '
    );

    this._listeners = [];
    this._ready = RSVP.defer();

    this.setupReady();
    this.setupListeners();
  },

  setupListeners() {
    CORDOVA_EVENTS.forEach(name => {
      const listener = {
        name,
        method: e => { this.trigger(name, e); }
      };

      this._listeners.push(listener);
      document.addEventListener(listener.name, listener.method, true);
    });
  },

  setupReady() {
    this.on('deviceready', () => {
      this._readyHasTriggered = true;
      this._ready.resolve();
      this._ready = null;
    });
  },

  on(name, target, method) {
    if (name === 'deviceready' && this._readyHasTriggered) {
      run.join(target, method);
    }
    return this._super(name, target, method);
  },

  ready() {
    return this._readyHasTriggered ? Promise.resolve() : this._ready.promise;
  },

  willDestroy() {
    this._super();
    this.teardownListeners();

    if (this._ready) {
      this._ready.reject();
      this._ready = null;
    }
  },

  teardownListeners() {
    this._listeners.forEach(listener => {
      document.removeEventListener(listener.name, listener.method, true);
    });
  }
});
