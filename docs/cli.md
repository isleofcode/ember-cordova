## CLI

All commands follow the pattern `ember cordova:{command}`. You can use the `cdv` alias
insted of`cordova`, for example `ember cdv:{command}`.

You can pass a command to cordova without
ember-cordova interference with ember cdv build, vs. ember cdv:build.

### Available Commands
* ember cdv:open
* ember cdv:build
* ember cdv:link
* ember cdv:plaform
* ember cdv:plugin
* ember cdv:prepare
* ember cdv:serve
* ember cordova

### Open

#### Description

Open the native platform project with the default or specified application

#### Available options
+ platform (default:ios)
+ application (default:system default application)

#### Examples
+ `ember cordova:open`
+ `ember cordova:open --platform=android --application=eclipse`


### Build

#### Description

Build the ember and cordova project together running in the simulator or on a device

#### Available options
+ environment (default:development)
+ platform (default:ios)
+ release (default: debug)

#### Examples
+ `ember cordova:build`
+ `ember cordova:build --environment=production --platform=ios`
+ `ember cordova:build --environment=production --platform=ios --release`

### Link

#### Description
Symlinks your dist/ to Cordovas www. You generally won't need to run
this, as build will do this for you.

#### Examples
+ `ember cordova:link`

### Platform

#### Description
Add or remove cordova platforms. Use the save flag to persist new
platforms to config.xml (default is true).

#### Available options
+ save (default:true)

#### Examples
+ `ember cdv:platform add ios`
+ `ember cdv:platform rm ios`

### Plugin

#### Description
Add or remove cordova plugins. Use the save flag to persist new
platforms to config.xml (default is true).

#### Available options
+ save (default:true)

#### Examples
+ `ember cdv:plugin add cordova-plugin-name`
+ `ember cdv:plugin rm cordova-plugin-name`

### Prepare

#### Description
Handles running prepare, but will also fire the
beforePrepare/afterPrepare hooks.

#### Examples
+ `ember cordova:prepare`

### Serve

#### Description

Runs the Ember Server for live reload. To learn more, [read
here](livereload.md).

#### Available options
+ platform (default:ios)
+ reloadUrl (default:localhost:4200)

#### Examples
+ `ember cdv:serve`
+ `ember cordova:serve --platform=android --reloadUrl=192.168.1.1`
+ `ember cdv:serve --platform=browser --env "development"`

## Cordova

#### Description

Passes commands straight to cordova, without interference.

Because this proxies to cordova-cli, you will need cordova-cli installed
(this is not required for usage anywhere else).

If you do not already have it installed, you can install it with:

```
  npm install -g cordova
```

Our hope is you won't need this command very much. If you are, open
an issue and tell us.

#### Examples
+ `ember cordova info`

##Setting default Platform

If you are only ever building for one platform, you can set a default
in config.environment.js.

This is handy if the defaults don't work out for you, e.g. you are
only shipping for Android.

in config/environment.js:
```
cordova: {
  platform: 'android'
}
```
