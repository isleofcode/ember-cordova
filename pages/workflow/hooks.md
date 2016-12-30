---
layout: page
title:  "Hooks"
---

The following hooks are available:

* beforeBuild
* afterBuild
* beforePrepare
* afterPrepare

Use hooks for any customization, cleanup or warnings.

To create a hook, create a file at `ember-cordova/cordova/hooks/<hook_type>/hook_name.js`
where `<hook_type>` is one of the hook types defined in the
[Apache Cordova hook documentation](https://cordova.apache.org/docs/en/latest/guide/appdev/hooks/index.html#introduction).

An example javascript hook:

```js
"use strict";

module.exports = function() {
  //do something
};
```

An example Bash hook:

```bash
#!/usr/bin/env bash
# An example "after_prepare" hook
# ember-cordova/cordova/hooks/after_prepare/echo.sh

echo "Hello, World"

# Capture status of our hook and exit with a proper exit code
STATUS=$?
exit $STATUS
```
