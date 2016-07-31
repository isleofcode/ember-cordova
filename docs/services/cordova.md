## Events

### Description

ember-cordova creates a cordova service, which listens for
events defined and emitted by Cordova (e.g. `deviceready`, `pause`, `resume`).

### Usage

**Simple Usage:**

Many events require only simple callbacks, e.g. pausing / resuming listener
functions, logging the event, etc.

In these cases use the provided util, which provides a generator function that
can subscribe to any `Ember.Evented`-conforming injected depency, with a
function signature matching `Evented.on`:

```js
import Ember from 'ember';
import subscribe from 'ember-cordova/utils/subscribe';

const { Route } = Ember;

export default Route.extend({
  cordova: inject.service(),

  logPause: subscribe('cordova.pause', function() {
    console.log('paused');
  }),

  logResume: subscribe('cordova.resume', function() {
    console.log('resumed');
  },
});
```

**Advanced Usage:**

If you have more advanced needs, e.g. turning on/off an event subscription when
an `Ember.Route` is activated/deactivated, or just prefer a more manual
approach, you can inject the provided service and tinker away:

```javascript
const {
  Route,
  inject
} = Ember;

export default Route.extend({
  cordova: inject.service(),

  activate: function() {
    // use named function to unsubscribe later
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
