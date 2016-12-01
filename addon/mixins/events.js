import Ember from 'ember';

const {
  Mixin,
  get,
  inject,
  on
} = Ember;

export default Mixin.create({
  cordova: inject.service(),

  subscribeToCordovaEvents: on('init', function() {
    const cordova = this.get('cordova'),
          onCordova = this.get('onCordova');

    console.warn(
      'DEPRECATION WARNING (ember-cordova): \n' +
      'The Events Mixin has been deprecated. \n '
      'This service will be deprecated as of v0.4.0 on Jan 2. \n' +
      'You need to ember-install ember-cordova-events . ' +
      'See http://embercordova.com/pages/addons/events for more info. '
    );

    if (onCordova === undefined) { return; }
    Object.keys(onCordova).forEach(key => {
      const func = get(onCordova, key);

      if (func instanceof Array) {
        func.filter(this._validateIsFunction, this)
          .forEach(fn => {
            cordova.on(key, this, fn);
          });
      } else if (this._validateIsFunction(func)) {
        cordova.on(key, this, func);
      }
    }, this);
  }),

  _validateIsFunction: function(func) {
    if (func instanceof Function) { return true; }
    if (typeof func === 'string') { return this.get(func) instanceof Function; }

    return false;
  }
});
