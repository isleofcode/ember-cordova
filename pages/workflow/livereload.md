---
layout: page
title:  "Live Reload"
---

Live reload takes the standard ember serve live reload behaviour to apps running on your phone. Apps running in this context maintain access to Cordova plugins.

Making changes to your ember source will cause a reload, and more than one device can be connected at once.

**Caveats**

- Live reload is not for production environments. It is not a solution for delivering over the air updates in a production context.

- Your computer and phone/device must be on the same network.

#### Usage

```
  ember cdv:serve
  ember cdv:s --environment=staging --platform=android
```

Some whitelisting may be required in config.xml, which ember-cordova will guide you through. For options, see the [cli reference](/pages/cli).

At a high level, this command builds a cordova container app, and then starts a slightly modified ember serve.
Once serve is running, deploy the newly generated app to a device/emulator as explained in [build workflow](/pages/workflow/building).

Code changes should immediately resolve on your device. If you are having further troubles, you likely need to customize the device live-reload url.

#### Additional Android Steps

The whitelist plugin is also required for Android >4.0:
`ember cdv:plugin add cordova-plugin-whitelist`

#### Customize the device live-reload url

Livereload works by redirecting the cordova apps window.location from file://index.html to your locally running serve instance.
There are times you may need to run live-reload from a remote host and port, or to customize a local url because we are not detecting it correctly.

In all cases below, `<url>` refers to the full url including protocol,
host, and port, e.g. http://localhost:4200


*via commandline arg*

```cli
ember cdv:serve --reload-url="<url>"
```

or

```cli
ember cdv:s -r "<url>"
```

*via config/environment.js*

```json
{
  cordova: {
    reloadUrl: "<url>"
  }
}
```
