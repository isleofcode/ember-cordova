import Ember from 'ember';

const {
  A,
  Service,
  Evented,
  RSVP
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

  on(event, handler) {
    if (event === 'deviceready' && this._readyHasTriggered) {
      run.join(handler);
    }
    return this._super(event, handler);
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
