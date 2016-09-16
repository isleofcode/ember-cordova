---
layout: page
title:  "Cordova Service & Event Bindings"
---

ember-cordova creates a cordova service, which listens for
events defined and emitted by Cordova (e.g. `deviceready`, `pause`, `resume`).

### Supported Events

Supported events are listed [in the source](https://github.com/isleofcode/ember-cordova/blob/master/addon/services/cordova.js#L12-L29)
and are pasted here for convenience:

```javascript
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
```

### Usage

You can subscribe to ember-cordova events via generator function, or standard
`Ember.Evented` syntax.

#### Subscribe Util
We recommend using the provided `subscribe` generator function, as it will
clean up your object's listeners automatically. Usage looks like a standard
`Ember.on` invocation, but supports registering listeners on injected deps:

```js
import Ember from 'ember';
import subscribe from 'ember-cordova/utils/subscribe';

const {
  Route,
  inject
} = Ember;

export default Route.extend({
  cordova: inject.service(),

  logReady: subscribe('cordova.deviceready', function() {
    console.log('ready');
  })
});
```

The `subscribe` util should be used at the top-level of your Ember object, much
like a call to `Ember.computed` or `Ember.on`. In-function usage like the
following is discouraged, as it generally won't "work" as you'd "expect".
For this case use Ember.Evented (below).

```
import Ember from 'ember';
import subscribe from 'ember-cordova/utils/subscribe';

const {
  Route,
  inject
} = Ember;

export default Route.extend({
  cordova: inject.service(),

  beforeModel() {
    // plz don't copy-pasta me; i'm not supposed to work
    subscribe('cordova.deviceready', function() {
      console.log('will never be ready');
    }
  }
});
```

#### Ember.Evented
Sometimes you want more control over listener handling, e.g. if the listener
should be added conditionally, or if the listener should be removed prior to
the object's `willDestroy` phase.

In such cases, you can treat the Cordova service like any `Ember.Evented` object
and register / unregister listeners from within any function (e.g. `beforeModel`
or `activate` hooks):

```javascript
import Ember from 'ember';

const {
  Route,
  inject
} = Ember;

export default Route.extend({
  cordova: inject.service(),

  activate: function() {
    if (this.shouldNotListen) { return; }

    this.get('cordova').on('pause', this, '_resumeListening');
  },

  deactivate: function() {
    this.get('cordova').off('pause', this, '_resumeListening');
  },

  _resumeListening: function() {
    console.log('do your thing');
  }
});
```
