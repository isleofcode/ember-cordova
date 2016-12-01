---
layout: page
title:  "ember-cordova-statusbar"
---

### Summary

This service provides functions to customize the iOS and Android status bar.

### Installation

```
ember install ember-cordova-statusbar
```

### Usage

Service Path:
```js
lookup('service:ember-cordova/statusbar');
```

### API

| Name  | Description |
|---------|-------------|
|hide()| hide the status bar|
|show()| show the status bar|
|isHidden| bool|
|isVisible| bool|
