---
layout: page
title: "Migrating from ember-cli-cordova"
---

- Uninstall ember-cli-cordova:

```
npm uninstall ember-cli-cordova --save
```

- Move your existing /cordova directory to /ember-cordova/cordova.  ember-cordova is also used for hooks, and soon icon / splash management as well.

```
mkdir ember-cordova
mv cordova ember-cordova/
```

- cordova Install ember-cordova as normal and you are good to go:

```
ember install ember-cordova
```
