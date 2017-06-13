var path          = require('path');

module.exports = {
  getPackage: function(projectRoot) {
    return require(path.join(projectRoot, 'package.json'));
  },

  isGlimmer: function(projectRoot) {
    var packageJSON = this.getPackage(projectRoot);
    return packageJSON.devDependencies['@glimmer/application'] !== undefined;
  }
};
