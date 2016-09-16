---
layout: page
title:  "Device: Platform Service"
---

We have introduced a Platform Service, heavily inspired and
partially forked from [Ionic
Platform](http://ionicframework.com/docs/api/utility/ionic.Platform/). Use it to understand what environment your ember-cordova app is running in.

### Service Lookup

```js
  lookup('service:device/platform');
```

### API

|    | Description |
|----|-------------|
|navigator | proxy for window.navigator object|
|ua | proxy for window.navigator.userAgent object|
|platforms | array of all platforms found (e.g. WebView, iOS)|
|isWebView | bool |
|isIPad | bool |
|isIOS | bool |
|isAndroid | bool |
|isWindowsPhone | bool|
|isEdge | bool|
|isCrosswalk | bool|
|platform | string. either ios, android, windowsphone, edge,
crosswalk or navigator.platform|
|version | number |
|device | proxy for window.device|
