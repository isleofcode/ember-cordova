---
layout: page
title:  "Building"
---

#### Building the app

`ember cdv:build` builds the Ember app with Cordova assets injected, and then executes a Cordova build. You'll probably want to specify the target platform and Ember environment, like so:

    ember cdv:build --platform ios --environment production

Once a build is finished, you will need to deploy to a device or emulator for testing.

##### Release Builds

By default, ember-cordova produces debug builds. You need to add a
`--release` flag for Cordova release builds, see the [cli
reference](pages/cli) for more details.

#### Deploying to a device or emulator

After building the app, you can deploy to a device or emulator using `ember cdv run`, like so:

```bash
  ember cdv run --platform=ios --emulator    # Deploy to iOS simulator
  ember cdv run --platform=android --device  # Deploy to Android device
```

To deploy to an iOS device, you must have Provisioning Profiles set up. Usually, Xcode can set up development profiles for you automatically.

Alternatively `ember cdv:open` will open your project in Xcode or Android Studio. The IDE can then be used for starting emulators, code signing & app store uploads.

#### Debugging

Android Builds can be remotely inspected in Chrome ([details](http://geeklearning.io/apache-cordova-and-remote-debugging-on-android/)), and iOS builds in Safari ([details](http://geeklearning.io/apache-cordova-and-remote-debugging-on-ios/)).

#### Non-Cordova Builds

Cordova Assets & plugins will only be injected to `ember cdv:build/serve` tasks. Therefore, builds using `ember build` will not include Cordova assets and will be valid for web. The only service injected by default is [the platform service](/pages/service_platform).
