/* globals cordova */

import Ember from 'ember';

const { run } = Ember;

export function initialize(app) {
  var config = app.__container__.lookupFactory('config:environment');
  var env = config.environment;

  if (config.cordova.reloadUrl &&
     (env === 'development' || env === 'test')) {

    var url = config.cordova.reloadUrl;
    if (window.location.href.indexOf('file://') > -1) {
      run.later(function() {
        window.location.replace(url);
      }, 50);
    }
  }
};

export default {
  name: 'cordova:in-app-livereload',
  initialize: initialize
};
