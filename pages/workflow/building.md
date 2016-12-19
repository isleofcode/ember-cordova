---
layout: page
title:  "Building"
---

`ember cdv:build` compiles an Ember app for the target platform, and then executes a Cordova build. Once a build is finished, you will need to deploy to an emulator to device for testing.

#### Deploy to a device / emulator

To deploy to an iOS device, you must have Provisioning Profiles set up. Usually, Xcode can set up development profiles for you automatically.

To run:
```bash
ember cdv run --platform=ios --emulator    # Deploy to iOS simulator
ember cdv run --platform=android --device  # Deploy to Android device
```

Alternatively `ember cdv:open` will open your project in Xcode or Android Studio. The IDE can then be used for starting emulators, code signing & app store uploads.

#### Debugging

Android Builds can be remote inspected in Chrome, and iOS builds in Safari.

#### Release Builds

By default, ember-cordova produces debug builds. You need to add a
--release flag for Cordova release builds, see the [cli
reference](pages/cli).

#### Non Cordova Builds

Cordova Assets & plugins will only be injected to `ember cdv:build/serve` tasks. Therefore, builds using `ember build` will not include Cordova assets and will be valid for web. The only service injected by default is [the platform service](/pages/service_platform).
