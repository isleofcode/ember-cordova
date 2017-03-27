---
layout: page
title:  "ember-cordova-events"
---

### Summary

`ember-cordova-events` provides access to Cordova events, allowing your ember app to react to device level events such as offline, low battery, menu button, and more.

There are two mechanisms to handle these events:

- **Evented:** All events are available for subscription from inside a function, e.g. lifecycle hooks like `init` or `beforeModel`, via `Ember.Evented`; and
- **Subscribe:** The `subscribe` util is a function that will tear down your listeners and prevent memory leaks. Like the `computed` helper, you register it at the top-level of your file, declare your service property + event, and pass it a function that should fire.

These are not interchangeable; `subscribe` relies on the `this` scope available on the object, while `Evented` relies on the `this` scope inside a function. Whenever possible, we endorse the use of `Subscribe` vs. `Evented`.

### Installation

```
ember install ember-cordova-events
```

### Example Usage

Show an alert when the battery is low, using both forms (demonstration only!!!):

```js
import subscribe from 'ember-cordova-events/utils/subscribe';

export default Route.extend({
  cordovaEvents: service('ember-cordova/events'),

  onBatteryLow: subscribe('cordovaEvents.batterylow', function() {
    this._alertBattery();
  }),

  beforeModel() {
    this.get('cordovaEvents').on('batterylow', this, '_alertBattery');
  },

  deactivate() {
    this.get('cordovaEvents').off('batterylow', this, '_alertBattery');
  },

  _alertBattery() {
    alert('Battery level is low!');
  }
});
```

### Supported Events

from <https://cordova.apache.org/docs/en/latest/cordova/events/events.html>

```javascript
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
```

### Usage

#### Subscribe

This method will tear down your object's listeners automatically, but can only be used at the top-level of an Ember object (just like `Ember.computed` and `Ember.on`).

`Subscribe` will fail when placed in functions; for those cases, you will want to use `Evented`.

**Example usage:**

```js
import subscribe from 'ember-cordova-events/utils/subscribe';

export default Route.extend({
  cordovaEvents: service('ember-cordova/events'),

  logReady: subscribe('cordovaEvents.deviceready', function() {
    console.log('ready');
  })
});
```

The following will fail, because the subscribe util is not top-level on the object. Use `Evented` instead.

```javascript
  beforeModel() {
    // this will not fire, use Events instead
    subscribe('cordovaEvents.deviceready', function() {
      console.log('will never be ready');
    });
  }
```

#### Evented

Use the standard `Ember.Evented` syntax when you want to create listeners inside of a function (e.g. beforeModel).
You will need to manually unsubscribe listeners to avoid leaky behaviour.

**Example usage:**

```javascript
export default Route.extend({
  cordovaEvents: service('ember-cordova/events'),

  activate: function() {
    if (this.shouldNotListen) { return; }

    this.get('cordovaEvents').on('pause', this, '_resumeListening');
  },

  deactivate: function() {
    this.get('cordovaEvents').off('pause', this, '_resumeListening');
  },

  _resumeListening: function() {
    console.log("i'm listening to what you have to say");
  }
});
```
