---
layout: page
title:  "Hooks"
---

Use ember-cordova hooks for any customization, cleanup or warnings. These follow a similar pattern to [Cordova's hooks](https://cordova.apache.org/docs/en/latest/guide/appdev/hooks/index.html#introduction), but are specifc to ember-cordova builds.

To create a hook, create a file at `ember-cordova/cordova/hooks/<hook_name>.js`
where `<hook_name>` is one of the following:

* `beforeBuild`
* `afterBuild`
* `beforePrepare`
* `afterPrepare`

An example hook:

```js
"use strict";

module.exports = function() {
  //do something
};
```
