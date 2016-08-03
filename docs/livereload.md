# Device Live Reload

Live reload works for device & simulator builds. It is automatically enabled and configured for `ember-cordova`
`>= 0.2.0`.  Instructions for advanced configuration are below.

**Caveats**

- Live reload will not run in production or test environments.
Your computer and phone must be on the same network.

- Live reload is for assistance in developing your application (just like
ember-cli's live-reload in the browser). It is not a solution for delivering
updates to a production application.

- If you are on Android >4.0, you will need to also install the whitelist plugin:
` ember cdv plugin add cordova-plugin-whitelist `

For help troubleshooting earlier versions, see the [old version guide](#old-version-guide).

## Basic usage

```
  ember cdv:serve
```

You can use s as a shorthand. Serve takes a platform option (e.g. android
or ios) and any options accepted by Ember serve.

## Advanced Configuration

There are times you may find yourself wanting to enable live-reload 
from a remote host and port, or to customize a local url.

## Customize the device live-reload url

In all cases below, `<url>` refers to the full url including protocol,
host, and port.

*via commandline arg*

```cli
ember cdv:serve --reload-url="<url>"
```

or

```cli
ember cdv:s -r "<url>"
```

*via .ember-cli*

```json
{
  deviceLiveReloadUrl: "<url>"
}
```

---------------------------------------------------------------------

# Old Version Guide

There are a few manual steps to getting live reload working right now.
We hope to eventually automate them.

* Modify Cordova's config.xml to allow-navigation to http based urls. You can either specify localhost:4200, your local IP,
or a wildcard. Wildcards are generally unsafe, and you should comment them out before production builds.

```
<allow-navigation href="*" />
```

* If you are on Android >4.0, you will need to also install the whitelist plugin:

```
ember cdv plugin add cordova-plugin-whitelist
```

* To start liveReload, run:

```
ember cordova:serve

OPTIONS
--platform= (android or ios)
--reload-url= Network IP for live reload. Default is locahost:4200.
```

Config options such as reloadUrl can also be stored in ENV.config.cordova.reloadUrl.

This command does two things:

1. Creates an ember-build that is pointed to reload-url (a local ember
   server);
2. Starts ember server.


* Open a build for the same platform (e.g. ember cdv:open —platform=ios).
You can run the app on an emulator or any device connected to your local network and live reload will work.

* Because cordova:serve creates a new build, you should re-build when
  you are finished.

#### Troubleshooting / Finding your Network IP

* If the defaults don't work, you will need to find your computers network ip and use
the reload-url param. For Mac Users, you can find your Network IP at System Preferences -> Network.

An easy way to check them is by loading the same url in a mobile browser - if it works, you have the right IP.

* Your reload-url must include http. So IP's should be http://ip. There is no checking or warnings arond this behaviour.
