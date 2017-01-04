---
layout: page
title:  "ember-cordova-events"
---

### Summary

A service providing access to Cordova events, such as deviceready, offline and pause.

### Installation

```
ember install ember-cordova-events
```

### Supported Events

```javascript
// from (#TODO - update sourcelink to plugin url)
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

1: **Subscribe Util:** Recommended for most cases. The subscribe util will clean up listeners automatically; and

2: **Events:** For more advanced cases, such as consumption in conditionals / functions (e.g. `beforeModel`).

You can subscribe to ember-cordova events via generator function, or standard
`Ember.Evented` syntax.

#### Subscribe Util

This method will clean up your object's listeners automatically, but can only be used at the top-level of an Ember object 
(just like `Ember.computed` and `Ember.on`). It will fail when placed in functions, for those cases, you will to use events.


Example usage:

```js
import Ember from 'ember';
import subscribe from 'ember-cordova-events/utils/subscribe';

const {
  Route,
  inject: { service }
} = Ember;

export default Route.extend({
  cordovaEvents: service('ember-cordova/events'),

  logReady: subscribe('cordovaEvents.deviceready', function() {
    console.log('ready');
  })
});
```

The following will fail, because the subscribe util is not top-level on the object. Use Events instead.

```javascript
import Ember from 'ember';
import subscribe from 'ember-cordova/utils/subscribe';

const {
  Route,
  inject: { service }
} = Ember;

export default Route.extend({
  cordovaEvents: service('ember-cordova/events'),

  beforeModel() {
    //I dont fire, use Events instead
    subscribe('cordovaEvents.deviceready', function() {
      console.log('will never be ready');
    });
  }
});
```

#### Events

Use this method for cases where you want to consume inside a conditional or function (e.g. beforeModel).
Using this method means you will need to manually unsubscribe listeners to avoid leaky behaviour.

Example usage:

```javascript
import Ember from 'ember';

const {
  Route,
  inject: { service }
} = Ember;

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
    console.log('do your thing');
  }
});
```
