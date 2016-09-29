---
layout: page
title:  "CLI & Configuration"
---

All commands follow the pattern `ember cordova:{command}`. You can use the `cdv` alias
insted of`cordova`, for example `ember cdv:{command}`.

You can proxy a command to cordova without ember-cordova interference by using a space vs a colon, e.g. `ember cdv build`, vs. `ember cdv:build`.

### Available Commands
* [ember cdv:open](#open)
* [ember cdv:build](#build)
* [ember cdv:plaform](#platform)
* [ember cdv:plugin](#plugin)
* [ember cdv:prepare](#prepare)
* [ember cdv:serve](#serve)
* [ember cordova](#cordova)

### Open

Open the native platform project with the default or specified application

| Options  | default |
|----------|---------|
| platform | ios     |
| application | system default application |

#### Examples
+ `ember cordova:open`
+ `ember cordova:open --platform=android --application=eclipse`

### Build

Build the ember and cordova project together running in the simulator or on a device

| Options     | default   |
|------------ |---------- |
| environment | development|
| platform    | ios |
| release     | debug |
| cordova-output-path | ember-cordova/cordova/www |

The build command also takes all of the non gradle-specific cordova build opts (e.g. provisioningProfile, codeSignIdentity).

#### Examples
+ `ember cordova:build`
+ `ember cordova:build --environment=production --platform=ios`
+ `ember cordova:build --environment=production --platform=ios --release`

### Platform

#### Description
Add or remove cordova platforms. Use the save flag to persist new
platforms to config.xml (default is true).

| Options | default |
|---------|---------|
| save    | true |

#### Examples
+ `ember cdv:platform add ios`
+ `ember cdv:platform remove ios`

#### Aliases
+ add/a
+ remove/rm/r

### Plugin

Add or remove cordova plugins. Use the save flag to persist new
platforms to config.xml (default is true).

| Options  | default |
|---------|---------|
| save    | true |

#### Examples
+ `ember cdv:plugin add cordova-plugin-name`
+ `ember cdv:plugin rm cordova-plugin-name`

#### Aliases
+ add/a
+ remove/rm/r

### Prepare

Runs cordova prepare, but also fires beforePrepare/afterPrepare hooks.

If plugins or platforms have been installed to a project with ember
cdv:plugin/platform add foo, running ember cdv:prepare installs these
packages on a fresh clone.

Think of the usage similar to package.json /w npm install.

#### Examples
+ `ember cordova:prepare`

### Serve

Runs the Ember Server for live reload. To learn more, [read
here](livereload.md).

| Options    | default |
|---------  |---------|
| platform  | ios |
| reloadUrl | localhost:4200 |
| cordova-output-path| ember-cordova/cordova/www |

#### Examples
+ `ember cdv:serve`
+ `ember cordova:serve --platform=android --reloadUrl=192.168.1.1`
+ `ember cdv:serve --platform=browser --env "development"`

## Cordova

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

#### Troubleshooting

When running a proxy command, file paths are relative to
your cordova directory.

So for example, if you for reasons unkwown run `ember cdv plugin add ../local-plugin-path`
(hint: just use `ember cdv:plugin add ../local-plugin-path`), from your
ember projects root, it will probably fail. You most likely need `ember
cordova plugin add ../../../local-plugin-path`.

## Configuration / Defaults

If you find yourself needing to override CLI defaults, you can set
new defaults in your .ember-cli file.

e.g. If you are only ever building for one (android), or want to
set a permanent default reload-url.

in .ember-cli:

```
platform: 'android',
reloadUrl: 'http://mycomputer:4200'
```
