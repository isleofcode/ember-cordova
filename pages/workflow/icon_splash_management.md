---
layout: page
title:  "Generate Icons & Splashscreens"
---

The `ember cdv:make-icons` and `ember cdv:make-splashes` commands generate all required icons and splashes for your added platforms from a single SVG. This is powered by a separate library called [splicon](https://github.com/isleofcode/splicon).

By default, ember-cordova detects which platforms (e.g. ios) you have installed and only generates assets for those platforms.
Platform & icon source are configurable as documented [in the cli](/pages/cli).

## Icon Generation

Place an icon.svg file at ember-cordova/icon.svg and run `ember cdv:make-icons`. By default, icons for added platforms will be resized and injected.

To specify a specific platform, use the `--platform` option with the desired platform.

```
ember cdv:make-icons --platform ios
```

The source SVG should be a square of any size.

## Splash Generation

Place a splash.svg file at ember-cordova/splash.svg and run `ember cdv:make-splashes`. By default, splashes for added platforms will be resized and injected.

To specify a single platform, use the `--platform` option with the desired platform.

```
ember cdv:make-splashes --platform ios
```

Unlike icons, the variance of splash file is larger. You likely want to download the following [splash SVG template](/examples/safe-splash-template.svg). The source SVG should have a background filling the entire area, and icons / text should be kept to the 'safe area' box.

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

2: Use the [ember-cordova-splash](https://github.com/isleofcode/ember-cordova-splash) service to hide the splashscreen in the afterModel hook.

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
