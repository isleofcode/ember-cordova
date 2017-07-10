---
layout: page
title:  "CLI & Configuration"
---

All commands follow the pattern `ember cordova:{command}`. `ember cdv:{command}` can be used as shorthand.

## Available Commands
* [ember cdv:open](#open)
* [ember cdv:build](#build)
* [ember cdv:lint-index](#lint-index)
* [ember cdv:plaform](#platform)
* [ember cdv:plugin](#plugin)
* [ember cdv:prepare](#prepare)
* [ember cdv:proxy](#proxy)
* [ember cdv:serve](#serve)

Any arguments documented in the Cordova CLI can also be used in the `build` and `serve` commands, unless otherwise replicated in ember-cordova.

#### Configuration / Defaults

Set preferences in .ember-cli to override defaults. For example, to change ember-cordovas default platform from ios to android:

in .ember-cli:

```
platform: 'android',
reloadUrl: 'http://mycomputer:4200'
```

## Command Reference

{: .description}
### Open

Open the native platform project with the default or specified application

| Options  | default | desc |
|-----|-----| ----- |
| platform | ios | |
| application | system default application ||

#### Examples
+ `ember cordova:open`
+ `ember cordova:open --platform=android --application=eclipse`

### Build

Build the ember and cordova project together running in the simulator or on a device

| Options     | default   | desc |
|------------ |---------- | ---- |
| environment | development| ember env |
| platform    | ios | target cordova platform |
| release     | debug | |
| cordova-output-path | ember-cordova/cordova/www | |
| skip-ember-build (alias: seb) | false | only performs cordova build |
| skip-cordova-build (alias: scb) | false | only performs ember build |

The build command also takes all of the non gradle-specific cordova build opts (e.g. provisioningProfile, codeSignIdentity).

#### Examples
+ `ember cordova:build`
+ `ember cordova:build --environment=production --platform=ios`
+ `ember cordova:build --environment=production --platform=ios --release`

### lint-index

Validates there are no leading `/` paths in ember-cordova/cordova/www/index.html.

While ember:cdv will validate your Ember config pre build, sometimes items such as hardcoded CND urls will slip through.

lint-index is automatically run on builds, however will warn vs error.

#### Examples
+ `ember cordova:lint-index`

### Platform

#### Description
Add or remove cordova platforms. Use the save flag to persist new
platforms to config.xml (default is true).

| Options | default | desc |
|---------|---------| ---- |
| save    | true | store plugin info in `config.xml`. enables cdv:prepare |
| uiwebview | false | initialize with UIWebView vs WKWebView |
| crosswalk | false | initialize with Crosswalk vs Android WebView |

#### Examples
+ `ember cdv:platform add ios`
+ `ember cdv:platform remove ios`
+ `ember cdv:platform add android --crosswalk`

#### Aliases
+ add/a
+ remove/rm/r

### Plugin

Add or remove cordova plugins. Use the save flag to persist new
platforms to config.xml (default is true).

| Options  | default | desc |
|---------|---------| ---- |
| save    | true | store plugin info in `config.xml`. enables cdv:prepare |

#### Examples
+ `ember cdv:plugin add cordova-plugin-name`
+ `ember cdv:plugin rm cordova-plugin-name`

#### Aliases
+ add/a
+ remove/rm/r

### Prepare

Think of cdv:prepare like npm install in a Cordova context. Installs all plugins and platforms in config.xml

Also fires beforePrepare/afterPrepare hooks.

#### Examples
+ `ember cordova:prepare`

## Proxy

Passes commands straight to cordova, without interference.

Because this proxies to cordova-cli, you will need cordova-cli installed (this is not required for usage anywhere else). If you do not already have it installed, you can install it with:
Our hope is you won't need this command very much. If you are, open an issue and tell us.


```
  npm install -g cordova
```

#### Examples
+ `ember cdv:proxy info`
+ `ember cdv:proxy run ios --nobuild`

#### Troubleshooting

When running a proxy command, file paths are relative to
your cordova directory.

For example, running `ember cdv plugin add ../local-plugin-path`
(hint: just use `ember cdv:plugin add ../local-plugin-path`), from your
ember projects root will probably fail. You most likely need `ember
cordova plugin add ../../../local-plugin-path`.

### Serve

Live reload. To learn more, [read here](/pages/workflow/live_reload).

| Options    | default | desc |
|---------  |---------| ---- |
| platform  | ios | cordova platform |
| reloadUrl | auto detected ip | network ip of your machine |
| cordova-output-path| ember-cordova/cordova/www | |
| skip-ember-build (alias: seb) | false | only performs cordova build |
| skip-cordova-build (alias: scb) | false | only performs ember build |

#### Examples
+ `ember cdv:serve`
+ `ember cordova:serve --platform=android --reloadUrl=192.168.1.1`
+ `ember cdv:serve --platform=browser --env "development"`


### make-icons

Automatically generate platform icons from a single svg. For more information, see [icon & splash generation](/pages/generate_icon_splash).

| Options    | default | desc |
|---------  |---------| ----- |
| source  | ember-cordova/icon.svg | splash svg |
| platform | all | platform to build assets for |

#### Examples
+ `ember cdv:make-icons`


### make-splashes

Automatically generate platform splashscreens from a single svg. For more information, see [icon & splash generation](/pages/generate_icon_splash).

| Options    | default | desc |
|---------  |---------| ----- |
| source  | ember-cordova/splash.svg | splash svg |
| platform | all | platform to build assets for |


#### Examples
+ `ember cdv:make-splashes`


