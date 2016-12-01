---
layout: page
title:  "Default Webviews"
---

The default Cordova WebViews are not always the most performant option. ember-cordova initializes your platform with the most performant web view if you add platforms with the `ember cdv:platform add` command.

If you want to use the default Cordova WebViews, add platforms the --default-webview flag, e.g. `ember cdv:platform add android --default-webview`.

### For iOS

In iOS, `ember cdv:platform add ios` will initialize a [WKWebView](https://developer.apple.com/reference/webkit/wkwebview) on your behalf, vs a [UIWebView](https://developer.apple.com/reference/uikit/uiwebview).

The UIWebView has been a class since iOS 2, whereas WKWebView was introduced in iOS 8. It includes the newer API's and considerable performance improvements for JS applications.

### For Android

Android allows developers to ship custom in-app browser distributions, and we default to using [Crosswalks](https://crosswalk-project.org) [cordova-plugin-crosswalk-webview](https://github.com/crosswalk-project/cordova-plugin-crosswalk-webview).

Crosswalk will:

- ensure your app is running in the same JS environment, vs. standard Android fragmentation;
- give you consistency with CSS parsing; and
- Improve JS performance, especially for older devices.

The downside of crosswalk is that builds will now give you two apks, one for each of the x86 and armv7 platforms respectively. If you are shipping via the Google Store, you can upload both apks and trust the right one will be delivered. In testing, it is important to ensure you are working from the correct apk. 
