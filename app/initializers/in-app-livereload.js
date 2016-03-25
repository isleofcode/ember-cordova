/* globals cordova */

import Ember from 'ember';
import config from '../config/environment';

const { run } = Ember;

export function() {
  var config = config.cordova;

  if (config.cordova && config.cordova.liveReload === true) {
    console.log("FIRING");
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
