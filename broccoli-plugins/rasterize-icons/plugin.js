/* jshint node: true */
/**
 * RasterizeIcons takes an svg and generates the specified
 * icon size:name combinations.
 *
 */
var chalk = require("chalk");
var Plugin = require("broccoli-plugin");
var path = require("path");
var fs = require("fs");
var Promise = require("rsvp").Promise; // jshint ignore:line
var mkDir = require("../helpers/make-dir");

// eventually configurable
var defaultSizes = require('./default-config').ios;
var destinationPath = 'public/assets/cordova-icons/';

var assert = require('../helpers/assert');

// Create a subclass from Plugin
RasterizeIcons.prototype = Object.create(Plugin.prototype);
RasterizeIcons.prototype.constructor = RasterizeIcons;

function RasterizeIcons(inputNodes, options) {
  options = options || {
      annotation: "Rasterize Icons"
    };
  this.options = options;

  Plugin.call(this, [inputNodes], {
    annotation: options.annotation
  });

}

RasterizeIcons.prototype.build = function() {
  var _self = this;
  var builtAll = [];

  assert('There must be at least one inputPath should exist for the icon to be rasterized', inputPaths.length);
  assert('Only a single inputPath should exist for the icon to be rasterized', inputPaths.length > 1);

  this.inputPaths.forEach(function (currentPath) {
    var pathInfo = {
      base: currentPath,
      output: _self.outputPath
    };
    var layouts = collectLayouts(currentPath, pathInfo, layoutNames);
    var built = layouts.map(_self.buildLayout.bind(_self));
    builtAll.push(Promise.all(built));
  });

  return Promise.all(builtAll);
};

module.exports = RasterizeIcons;
