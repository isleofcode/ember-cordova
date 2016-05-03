import Ember from 'ember';

const { run } = Ember;

export function initialize(app) {
  let config, env;

  if (app.resolveRegistration) {
    config = app.resolveRegistration('config:environment');
  } else {
    config = app.container.lookupFactory('config:environment');
  }
  env = config.environment;

  if (config.cordova && config.cordova.reloadUrl &&
     (env === 'development' || env === 'test')) {

    let url = config.cordova.reloadUrl;
    if (window.location.href.indexOf('file://') > -1) {
      run.later(function() {
        window.location.replace(url);
      }, 50);
    }
  }
}

export default {
  name: 'cordova:in-app-livereload',
  initialize: initialize
};
