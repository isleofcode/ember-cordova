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

[comment]: `{{rootUrl}}` will not render because Jekyll is rendering it as handlebars.

2. Cordova requires relative asset paths so check that none of yours are absolute. You'll want to make sure your &#123;&#123;rootURL&#125;&#125; or &#123;&#123;baseURL&#125;&#125; properties dont have a leading forward slash in `app/index.html`

3. As a final step, add your desired platforms, e.g.:

```cli
ember cdv:platform add ios
ember cdv:platform add android
ember cdv:platform add browser #experimental
```

Cordova working relies on the cordova.js script being injected. By default, this happens using ember cdv commands. Your vanilla ember build && ember s commands will not inject cordova.js by design.

#### A note on adding the Android platform
When you try to add the Android platform you may receive the following error: `Error validating package name. Package name must look like: com.company.Name`.  This can be resolved by setting the `id` property on the `widget` node in the Ember Cordova `config.xml`

For example:

```
<?xml version='1.0' encoding='utf-8'?>
<widget id="com.myappdevcompany.phoneapp" version="1.0.0" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
    <name>phoneApp</name>
    <description>
        A sample Apache Cordova application that responds to the deviceready event.
    </description>
 ...
```

#### A note on browser platform

Some cordova/phonegap plugins have browser fallbacks. For example [phonegap-plugin-barcodescanner](https://github.com/phonegap/phonegap-plugin-barcodescanner) will ask you to manually type the barcode value. Using the browser platform, you'll be able to develop your cordova app as it was a regular ember app.
platforms respectively. If you are shipping via the Google Store, you can upload both apks and trust the right one will be delivered. In testing, it is important to ensure you are working from the correct apk. 
