---
layout: page
title:  "Live Reload"
---

Live reload works for device & simulator builds. It is automatically enabled and configured for `ember-cordova`
`>= 0.2.0`.  Instructions for advanced configuration are below.

**Caveats**

- Live reload will not run in production or test environments.
Your computer and phone must be on the same network.

- Live reload is for assistance in developing your application (just like
ember-cli's live-reload in the browser). It is not a solution for delivering
updates to a production application.

- If you are on Android >4.0, you will need to also install the whitelist plugin:
`ember cdv plugin add cordova-plugin-whitelist`

For help troubleshooting earlier versions, see the [old version guide](legacy/livereload).

#### Basic usage

```
  ember cdv:serve
```

You can use s as a shorthand. Serve takes a platform option (e.g. android
or ios) and any options accepted by Ember serve. See the [cli reference](cli).

There is no further configuration required. This function will:

1.  Create a shell cordova app ready for live-reload;
2.  Setup an ember serve/watchman instance to catch your changes;
3.  Ensure the cordova shell is pointed to your serve instance.

Once this process is completed, simply start the newly generated app as you normally would (e.g. flash to your device in Xcode). You should notice live reload taking effect immediately.

If you are having further troubles, you likely need to customize the device live-reload url.

#### Customize the device live-reload url

There are times you may find yourself wanting to enable live-reload
from a remote host and port, or to customize a local url because we are
not detecting it correctly.

In all cases below, `<url>` refers to the full url including protocol,
host, and port, e.g. http://localhost:4200

Unless you are explicitly broadcasting from a remote host, you most likely want localhost to be your computers network ip. The [legacy guides](legacy/livereload) may be helpful.

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
