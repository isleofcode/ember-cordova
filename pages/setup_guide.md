---
layout: page
title:  "Install / Setup Guide"
---

If you are migrating from ember-cli-cordova, read the [migration
guide](legacy/migration-from-ember-cli-cordova).

Cordova Assets & plugins will only be injected to `ember cdv:build/serve` tasks. Therefore, builds using `ember build` will not include Cordova assets and will be valid for web. The only service injected by default is [the platform service](/pages/service_platform).

#### Requirements
- Ember 1.13+;
- node 0.12+;

#### Installation

```cli
  ember install ember-cordova
```

Existing Cordova projects at ember-cordova/cordova will not be overwritten.

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

There are a few changes required to make sure your Ember app will work in a Cordova context. In all cases, you'll get a warning from ember-cordova if you forget.

1. Set your config.locationType to 'hash';

[comment]: `{{rootUrl}}` will not render because Jekyll is rendering it as handlebars.

2. Cordova requires relative asset paths. Ensure &#123;&#123;rootURL&#125;&#125; or &#123;&#123;baseURL&#125;&#125; dont have a leading forward slash in `config/environment.js`

3. As a final step, add your desired platforms, e.g.:

```cli
ember cdv:platform add ios
ember cdv:platform add android
ember cdv:platform add browser #experimental
```

#### A note on adding the Android platform
When you try to add the Android platform you may receive the following error: `Error validating package name. Package name must look like: com.company.Name`.  This can be resolved by setting the `id` property on the `widget` node in the Ember Cordova `config.xml` to a domain structure.

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

Some cordova/phonegap plugins have browser fallbacks. For example [phonegap-plugin-barcodescanner](https://github.com/phonegap/phonegap-plugin-barcodescanner) will ask you to manually type the barcode value. Using the browser platform will cause these apis to be avaiable in Chrome.

`ember s` will suffice to simply serve your app. See [here](/pages/live_reload.md) for documentation on device livereload.
