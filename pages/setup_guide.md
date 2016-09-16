---
layout: page
title:  "Install / Setup Guide"
---

If you are migrating from ember-cli-cordova, read the [migration
guide](migration-from-ember-cli-cordova).

#### Requirements
- Ember 1.13+;
- node 0.12+;

#### Installation

```cli
  ember install ember-cordova
```

If you already have a Cordova project at ember-cordova/cordova it will not be overwritten.


You can optionally pass the following params:

|             | type / desc                       |
|------------ | ----------------------------------|
| name        | String (defaults to your ember app name) |
| cordovaid   | String (defaults to your app name) |
| templatePath| String path to cordova template |

```cli
ember install ember-cordova --name=AppName --cordovaid=com.isleofcode.app --templatePath=../template
```

#### Getting Started

1. Set your config.locationType to 'hash' (ember-cordova will warn you if it is not).

2. Cordova requires relative asset paths so check that none of yours are absolute. For ember-cli v2.7.0 and newer, you'll want to remove the references to `{{rootURL}}` from the asset paths in `app/index.html`.

3. As a final step, add your desired platforms, e.g.:

```cli
ember cdv:platform add ios
ember cdv:platform add android
ember cdv:platform add browser #experimental
```

Cordova working relies on the cordova.js script being injected. By default, this happens using ember cdv commands. Your vanilla ember build && ember s commands will not inject cordova.js by design.

#### A note on browser platform

Some cordova/phonegap plugins have browser fallbacks. For example [phonegap-plugin-barcodescanner](https://github.com/phonegap/phonegap-plugin-barcodescanner) will ask you to manually type the barcode value. Using the browser platform, you'll be able to develop your cordova app as it was a regular ember app.
platforms respectively. If you are shipping via the Google Store, you can upload both apks and trust the right one will be delivered. In testing, it is important to ensure you are working from the correct apk. 
