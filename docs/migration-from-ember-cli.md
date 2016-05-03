##Migration from ember-cli-cordova

1. Uninstall ember-cli-cordova:

```
npm uninstall ember-cli-cordova --save
```

2. Move your existing /cordova directory to /ember-cordova/cordova.  ember-cordova is also used for hooks, and soon icon / splash management as well.

```
mkdir ember-cordova
mv cordova ember-cordova/
```

3. Install ember-cordova as normal and you are good to go:

```
ember install ember-cordova
```
