'use strict';

var path       = require('path');

module.exports = function cordovaPath(project, excludeCordova) {
  var cdvPath = path.join(project.root, 'ember-cordova');

  return excludeCordova ?
    cdvPath :
    path.join(cdvPath, 'cordova');
};
