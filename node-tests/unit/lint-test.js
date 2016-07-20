'use strict';

var glob = require('glob').sync;
var lint = require('mocha-eslint');
var paths, options;

// ht ember-cli
paths = glob('tests/*').filter(function(path) {
  return !/fixtures/.test(path);
});

paths = paths.concat([
  'lib',
  'bin',
  'blueprints'
]);

options = {
  timeout: 5000,
  slow: 1000,
  strict: true
};

lint(paths, options);
