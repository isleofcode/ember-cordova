'use strict';

const path   = require('path');
const MockUI = require('ember-cli/tests/helpers/mock-ui');

module.exports = {
  env: 'development',
  id: 'ember-cordova-mock',
  name: 'ember-cordova-mock',
  platform: 'ios',

  project: {
    root: path.resolve(__dirname, '..', '..', 'fixtures', 'ember-cordova-mock')
  },
  ui: new MockUI()
}
