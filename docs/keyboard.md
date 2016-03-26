## Keyboard

We have distributed a separate `ember-cordova-keyboard` addon, which handles
subtle layout issues & fires events related to a native device's keyboard
display.

To install:
```
ember install ember-cordova-keyboard
```

N.B. `ember-cordova-keyboard` will install the Cordova `ionic-plugin-keyboard`
plugin & persist this to your config.xml.

### Usage
The addon is initialized automatically, and will handle layout issues without
modification to its host app.

You may also wish to subscribe to events:
```js
// app/components/fancy-box/component.js
import Ember from 'ember';

const {
  Component,
  inject
} = Ember;

export default Component.extend({
  keyboard: service.inject('cordova/keyboard'),
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

```hbs
{{! app/components/fancy-box/template.hbs }}

{{#if !keyboardIsShowing}}
  click inside to type
{{/if}}

<input type='text'>
```

### Service Location

```js
lookup('service:device/splashscreen');
```
