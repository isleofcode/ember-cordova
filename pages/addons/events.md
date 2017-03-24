---
layout: page
title:  "ember-cordova-events"
---

### Summary

This service provides access to Cordova events, allowing your ember app to react to device level events such as offline, low battery, menu button, and more.

**example: show an alert when the battery is low**

```js
export default Route.extend({
  cordovaEvents: service('ember-cordova/events'),

  onBatteryLow: subscribe('cordovaEvents.batterylow', function() {
    alert('Battery level is low!');
  })
});
```

### Installation

```
ember install ember-cordova-events
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

Events can be handled in two ways:

1: **Subscribe Util:** Recommended for most cases. The subscribe util will clean up listeners automatically.

2: **Events:** For more advanced cases, such as consumption in conditionals / functions (e.g. `beforeModel`).

#### Subscribe Util

This method will clean up your object's listeners automatically, but can only be used at the top-level of an Ember object
(just like `Ember.computed` and `Ember.on`). It will fail when placed in functions, for those cases, you will to use events.


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

The following will fail, because the subscribe util is not top-level on the object. Use Events instead.

```javascript
  beforeModel() {
    // this will not fire, use Events instead
    subscribe('cordovaEvents.deviceready', function() {
      console.log('will never be ready');
    });
  }
```

#### Events

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
