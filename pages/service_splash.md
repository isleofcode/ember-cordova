---
layout: page
title:  "Device: Splash Screen Management"
---

Included is a Splashscreen service, which works alongside Cordova's splashscreen
plugin to show / hide the native splashscreen.

There is also a mixin available to hide the splashscreen in a route's
`afterModel` hook.

### Prerequisites

This service requires the Cordova SplashScreen plugin to be installed:

`ember cdv:plugin add cordova-plugin-splashscreen --save`

More information about this Cordova plugin can be found at: [https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-splashscreen/](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-splashscreen/)

At this time, following the guidelines outlined in the Cordova plugin, you must add preferences to account for certain platform quirks:
[https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-splashscreen/#preferences](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-splashscreen/#preferences)

### Service Lookup

```js
lookup('service:device/splashscreen');
```

### Usage

#### Mixin
The SplashScreenMixin (you'll likely want to use this) will add a callback to hide the splash screen in the `afterModel` hook of your Ember route.

```js
// app/routes/application.js
import Ember from 'ember';
import SplashscreenMixin from 'ember-cordova/mixins/device/splashscreen';

const { Route } = Ember;

export default Route.extend(SplashscreenMixin, {
  // ...
  // the splash screen will get automatically hidden
  afterModel() {
    // ...
  }
});
```

#### Service
Alternately, you can inject the service into your route and use it directly:

```js
// app/routes/application.js
import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  splashScreenService: Ember.inject.service('device/splashscreen'),

  beforeModel() {
    this.get('splashScreenService').show();
  },

  afterModel() {
    this.get('splashScreenService').hide();
  }
  // ...
});
```

### Service API

|   | Description |
|---|-------------|
|show | show the splashscreen|
|hide | hide the splashscreen|
