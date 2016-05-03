##Live reload

There are a few manual steps to getting live reload working right now.
We hope to eventually automate them.

live reload will not run in production or test environments. Your computer and phone must be on the same network.

* Modify Cordovas config.xml to allow-navigation to http based urls. You can either specify localhost:4200, your local IP,
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

###Troubleshooting / Finding your Network IP

* If the defaults don't work, you will need to find your computers network ip and use
the reload-url param. For Mac Users, you can find your Network IP at System Preferences -> Network.

An easy way to check them is by loading the same url in a mobile browser - if it works, you have the right IP.

* Your reload-url must include http. So IP's should be http://ip. There is no checking or warnings arond this behaviour.
