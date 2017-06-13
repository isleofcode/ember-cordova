---
layout: page
title:  "Project Setup"
---

#### Required Ember App Changes

There are a few changes required to make sure your app will work in a Cordova context. You'll get a warning if you forget. *These changes are not required for standalone Glimmer applications.*

In `config/environment.js`:

1) Set locationType to 'hash'.

[comment]: `{{rootUrl}}` will not render because Jekyll is rendering it as handlebars.
2) Ensure &#123;&#123;rootURL&#125;&#125; or &#123;&#123;baseURL&#125;&#125; dont have a leading forward slash. Any hardcoded assets with a leading slash will fail to load.

e.g. change `rootURL: '/',` to `rootURL: '',` in `config/environment.js`

#### ENV Setup for App Compilation

To build for iOS and Android, you will need Xcode or Android Studio installed.
The Cordova team has published a solid set of instructions for [iOS](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html) and [Android](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html).

#### Adding Platforms

Each platform you wish to build with must be added manually, ember-cordova comes with no platforms by default.

```cli
ember cdv:platform add ios
ember cdv:platform add android
```

Available platforms are:
- ios
- android
- blackberry
- windows

Browser as a platform will be respected, but does not imply 'webbrowser'.
Some Cordova plugins have a browser mode to enable easier testing. For standard builds & livereload do not use browser - see the Workflow section.

#### Comitting & .gitignore

On install, ember-cordova will update your gitignore.

First, you will want to check in the _empty_ ember-cordova/www / plugin / platform directories.
ember-cordova maintains these as empty folders with a .gitkeep to avoid problems with Cordova APIs.

`config.xml` should also be checked in, which is the Cordova equivalent of `package.json`.

#### Cloning & Plugin/Platform re-installs

If you install plugins & platforms with `ember cdv:plugin/platform`
commands, you will notice they are added to `ember-cordova/cordova/config.xml`.

Users cloning the repo can run `ember cdv:prepare` to install existing
platforms and plugins, similar to npm install. See the [CLI
Reference](/pages/cli).

#### Next

Once everything is set up, you are ready to start using the CLI. See [building](/pages/workflow/building) and [livereload](/pages/workflow/livereload) for more.

