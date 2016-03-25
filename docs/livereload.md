##Live reload

There are a few manual steps to getting live reload working right now.
We hope to eventually automate them.

live reload will not run in production or test environments.

1. If you are are having any issues, take note of your network IP.

2. Modify Cordovas config.xml to allow-navigation to http based urls. You can either specify your exact local IP, 
or a wildcard e.g. http;//*. Wildcards are generally unsafe, and you should comment them out before production builds.

```
<allow-navigation href="*" />
```

3. If you are on Android >4.0, you will need to also install the whitelist plugin:

```
ember cdv plugin add cordova-plugin-whitelist
```

4. Config is done. Live reload should be working for you. To start it, run:

```
ember cordova:serve

OPTIONS
--platform= (android or ios)
--reloadUrl= Network IP for live reload, for if localhost:4200 fails.
```

Config options such as reloadUrl can also be stored in
config.cordova.reloadUrl.


5. You now need to run and open a build for the same platform (e.g. ember cdv:build —platform=ios).
You can run the app on an emulator or any device connected to your local network and live reload will work.
