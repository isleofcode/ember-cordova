'use strict';

var Promise    = require('../ext/promise');
var fs         = require('fs-extra');
var symlink    = Promise.denodeify(fs.symlink);
var remove     = Promise.denodeify(fs.remove);
var path       = require('path');
var chalk      = require('chalk');

module.exports = function(project){
  if(!project) {
    throw new Error('A project must be passed into this function');
  }

  var wwwPath = path.join(project.root, 'cordova/www');

  return function() {
    return remove(wwwPath)
           .then(symlink.bind(this, '../dist', wwwPath, 'dir'))
  };
};
