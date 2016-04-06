##Live reload

There are a few manual steps to getting live reload working right now.
We hope to eventually automate them.

live reload will not run in production or test environments.

* Modify Cordovas config.xml to allow-navigation to http based urls. You can either specify localhost:4200, your local IP,
or a wildcard. Wildcards are generally unsafe, and you should comment them out before production builds.

```
<allow-navigation href="*" />
```

* If you are on Android >4.0, you will need to also install the whitelist plugin:

```
ember cdv plugin add cordova-plugin-whitelist
```

* Live reload should be working for you. To start it, run:

```
ember cordova:serve

OPTIONS
--platform= (android or ios)
--reload-url= Network IP for live reload. Default is locahost:4200.
```

Config options such as reloadUrl can also be stored in
config.cordova.reloadUrl.


* You now need to open a build for the same platform (e.g. ember cdv:open —platform=ios).
You can run the app on an emulator or any device connected to your local network and live reload will work.

* If you are are having any issues, take note of your network IP. Ensure
  it is whitelisted in config.xml, and start cordova:serve with this as
your reload-url.
