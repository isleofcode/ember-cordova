---
layout: page
title: "ember-cordova"
---

#### corber announcement

We have started moving the ember-cordova CLI into the corber project, which adds support for other Vue/React/Webpack. This repository is a mirror of the pre-forked, stable ember-cordova. We encourage you to try the corber beta.

ember-cordova will continue receiving bugfixes, but most new feature development will appear in corber. Ember users will see no loss of features by migrating.

Announcement details can be found [here](http://blog.isleofcode.com/announcing-corber-ember-cordova-vue/), the repository [here](https://github.com/isleofcode/corber) and documentation [here](http://corber.io).

#### ember-cordova

ember-cordova provides a pipeline & tooling for extending Ember.js & standalone Glimmer applications with Cordova.

Once [installed](pages/installation), building is as simple as:

```
ember cdv:build --platform=ios
ember cdv:build --platform=android
```

The project includes [on-device livereload](pages/workflow/livereload), a [CLI](pages/cli) for building & deploying to devices, automated [icon/splash generation](pages/workflow/icon_splash_management), a [device info service](pages/service_platform) and a growing ecosystem of plugins.

ember-cordova maintained by [Isle of Code](https://isleofcode.com) in Toronto, with a community of contributors.

See the [Installation](pages/installation) guides to get started, or watch [Hybrid/Ember best practices from EmberConf 2016](https://www.youtube.com/embed/Ry639hvWKbM).
