---
layout: page
title:  "ember-cordova-keyboard"
---

### Summary

Fire events related to the native device's keyboard display. Currently
very beta.

### Installation
```
ember install ember-cordova-keyboard
```

### Usage

Service Path:
```js
lookup('service:ember-cordova/keyboard');
```

You may also wish to subscribe to events or toggle the keyboard:

```js
// app/components/fancy-box/component.js
import Ember from 'ember';

const {
  Component,
  inject
} = Ember;

export default Component.extend({
  keyboard: service.inject('ember-cordova/keyboard'),
  keyboardIsShowing: false,

  didInsertElement() {
    this._super();

    this.get('keyboard').on('keyboardDidShow', this.keyboardDidShow);
    this.get('keyboard').on('keyboardDidHide', this.keyboardDidHide);
  },

  willDestroyElement() {
    this.get('keyboard').off('keyboardDidShow', this.keyboardDidShow);
    this.get('keyboard').off('keyboardDidHide', this.keyboardDidHide);

    this._super();
  },

  keyboardDidShow() {
    this.set('keyboardIsShowing', true);
  },

  keyboardDidHide() {
    this.set('keyboardIsShowing', false);
  }
});
```

#### Example template usage
```hbs
{% raw %}
{{! app/components/fancy-box/template.hbs }}

{{#if !keyboardIsShowing}}
  click inside to type
{{/if}}
{% endraw %}
<input type='text'>
```
