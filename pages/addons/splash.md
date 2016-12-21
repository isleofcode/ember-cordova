---
layout: page
title:  "ember-cordova-splash"
---

### Summary

An ember-service to manage splash screen displays.

For splash generation & best practices, see [splash & icon generation](/pages/workflow/icon_splash_management).

### Installation

```
ember install ember-cordova-splash
```

### Usage

Service Path:
```js
lookup('service:ember-cordova/splash');
```

```js
// app/routes/application.js
import Ember from 'ember';

const {
  Route,
  inject: { service }
} = Ember;

export default Route.extend({
  splashscreenService: service('ember-cordova/splash'),

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
