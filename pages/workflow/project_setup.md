---
layout: page
title:  "Project Setup"
---

#### Required Ember App Changes

There are a few changes required to make sure your app will work in a Cordova context. You'll get a warning if you forget.

In config/environment.js:

- Set your config.locationType to 'hash'.

[comment]: `{{rootUrl}}` will not render because Jekyll is rendering it as handlebars.
- Ensure &#123;&#123;rootURL&#125;&#125; or &#123;&#123;baseURL&#125;&#125; dont have a leading forward slash, as Cordova requires relative asset paths. Any hardcoded assets with a leading slash will fail to load.

#### Setting up your dev env

To build for iOS and Android, you will need Xcode or Android Studio installed.
The Cordova team has published a solid set of instructions for [iOS](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html) and [Android](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html).

#### Adding Platforms

Cordova comes generically bundled with no platforms, and you must add
each platform.

```cli
ember cdv:platform add ios
ember cdv:platform add android
```

Browser as a platform will be respected, but does not imply 'web
browser'. Some Cordova plugins have a browser mode to enable easier
testing. For standard builds & livereload, see the Workflow section.

#### Comitting & .gitignore

On install, ember-cordova will update your gitignore. The default behaviour is to maintain empty cordova folders and `config.xml`. Config.xml is Cordovas equivalent of a `package.json`.

You generally don't want to check in the content of ember-cordova/cordova folders, such as plugins or platforms. ember-cordova maintains these as empty folders with a .gitkeep to avoid problems with Cordova APIs.

#### Cloning & Plugin/Platform re-installs

If you install plugins & platforms with `ember cdv:plugin/platform`
commands, you will notice they are added to `ember-cordova/cordova/config.xml`.

Users cloning the repo can run `ember cdv:prepare` to install existing
platforms and plugins, similar to npm install. See the [CLI
Reference](/pages/cli).

#### Next

Once everything is set up, you are ready to start using the CLI. See [building](/pages/workflow/building) and [livereload](/pages/workflow/livereload) for more.

