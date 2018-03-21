var path            = require('path');
var logger          = require('./logger');
var fsUtils         = require('./fs-utils');
var existsSync      = fsUtils.existsSync;

module.exports = {
  getPaths: function(platform, projectPath) {
    var platformsPath = 'platforms';
    var assetsPath;

    if (platform === 'ios') {
      assetsPath = path.join(platformsPath, 'ios', 'www');
    } else if (platform === 'android') {
      assetsPath = path.join(platformsPath, 'android', 'assets', 'www');
      // cordova-android 7.0 no longer provides assets/www path.
      // so use android/platform_www instead
      if (!existsSync(assetsPath)) {
        assetsPath = path.join(platformsPath, 'android', 'platform_www');
      }
    } else if (platform === 'browser') {
      assetsPath = path.join(platformsPath, 'browser', 'www');
    }

    var files = ['cordova_plugins.js', 'cordova.js', 'config.xml'];

    var pluginPath = path.join(projectPath, assetsPath, 'plugins');
    if (existsSync(pluginPath)) {
      files.push('plugins/**');
    }

    return {
      assetsPath: assetsPath,
      files: files
    }
  },

  /* eslint-disable max-len */
  validatePaths: function(assetsPath, projectPath) {
    if (assetsPath === undefined) {
      throw new Error('ember-cordova: Platform asset path undefined, cant build');
    }

    var platformPath = path.join(projectPath, assetsPath, 'cordova.js');
    var pluginPath = path.join(projectPath, assetsPath, 'cordova_plugins.js');

    if (!existsSync(platformPath) || !existsSync(pluginPath)) {
      logger.warn(
        'Did not find cordova.js or cordova_plugins.js at ' +
        assetsPath +
        '. Ember App LiveReload will still work, but device & plugin APIS will fail.'
      );
    }
  }
  /* eslint-enable max-len */
};
