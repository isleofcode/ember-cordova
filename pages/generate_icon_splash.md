---
layout: page
title:  "Generate Icons & Splashscreens"
---

The `ember:cdv-make-icons` and `ember cdv:make-splashes` commands make it possible to generate all platform icon/splashes from a single svg.

This is powered by a separate library called [splicon](https://github.com/isleofcode/splicon).

## Icon Generation

Place an icon.svg file at ember-cordova/icon.svg and run `ember cdv:make-icons`. Icons will be resized injected.

The source svg should be a square of any size.

Platform & icon source are configurable as documented [in the cli](/pages/cli).

## Splash Generation

Place a splash.svg file at ember-cordova/splash.svg and run `ember cdv:make-splashes`. Splashes will be resized & injected.

Unlike icons, the variance of splash file is larger. You likely want to download the following [splash svg template](/examples/safe-splash-template.svg).

The source svg should have a background filling the entire area, and icons / text should be kept to the 'safe area' box.

Platform & splash source are configurable as documented [in the cli](/pages/cli).

### Splash Screen Best Practices

Generally in an ember-app, it is best to:

1: Configure your config.xml to set AutoHideSplashScreen to false.
This means that once booted, Cordova will not automatically hide your splash screen.

Placed in ember-cordova/cordova/config.xml

```xml
<widget>
  ...
  <preference name="AutoHideSplashScreen" value="false"/>
</widget>
```

2: Use the ember-cordova-splash service to hide the splashscreen in the afterModel hook.

```js
// app/routes/application.js
import Ember from 'ember';

const {
  Route,
  inject: { service }
} = Ember;

export default Route.extend({
  splashscreenService: service('device/splashscreen'),

  afterModel() {
    this.get('splashScreenService').hide();
  }
  // ...
});
```
