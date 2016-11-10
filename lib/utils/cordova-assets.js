var path            = require('path');
var chalk           = require('chalk');
var fs              = require('fs');
var existsSync      = fs.existsSync;

module.exports = {
  getPaths: function(platform) {
    var platformsPath = 'platforms';
    var assetsPath;

    if (platform === 'ios') {
      assetsPath = path.join(platformsPath, 'ios', 'www');
    } else if (platform === 'android') {
      assetsPath = path.join(platformsPath, 'android', 'assets', 'www');
    } else if (platform === 'browser') {
      assetsPath = path.join(platformsPath, 'browser', 'www');
    }

    var files = ['cordova_plugins.js', 'cordova.js'];
    if (fs.existsSync(path.join(assetsPath, 'plugins'))) {
      files.push('plugins/**');
    }

    return {
      assetsPath: assetsPath,
      files: files
    }
  },

  /* eslint-disable max-len */
  validatePaths: function(assetsPath, projectPath, ui) {
    if (assetsPath === undefined) {
      throw new Error('ember-cordova: Platform asset path undefined, cant build');
    }

    var platformPath = path.join(projectPath, assetsPath, 'cordova.js');
    var pluginPath = path.join(projectPath, assetsPath, 'cordova_plugins.js');

    if (!existsSync(platformPath) || !existsSync(pluginPath)) {
      ui.writeLine(chalk.yellow(
        'WARNING: ember-cordova: Did not find cordova.js or cordova_plugins.js at ' +
        assetsPath +
        '. Ember App LiveReload will still work, but device & plugin APIS will fail.'
      ));
    }
  }
  /* eslint-enable max-len */
};
