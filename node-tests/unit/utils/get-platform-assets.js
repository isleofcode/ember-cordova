'use strict';

var getAssets         = require('../../../lib/utils/get-platform-assets');
var cordovaPath       = require('../../../lib/utils/cordova-path');
var expect            = require('../../helpers/expect');
var mockProject       = require('../../fixtures/ember-cordova-mock/project');
var path              = require('path');

describe('Get Platform Assets Util', function() {
  var mockPath = cordovaPath(mockProject.project);
  mockProject.project.CORDOVA_PLATFORM = 'ios';

  describe('assets path', function() {
    it('is valid for ios', function() {
      var assets = getAssets(mockProject.project);
      var expectedPath = path.join(mockPath, 'platforms/ios/www');
      expect(assets.path).to.equal(expectedPath);
    });

    it('is valid for android', function() {
      mockProject.project.CORDOVA_PLATFORM = 'android';
      var assets = getAssets(mockProject.project);
      var expectedPath = path.join(mockPath, 'platforms/android/assets/www');
      expect(assets.path).to.equal(expectedPath);
    });

    it('is valid for browser', function() {
      mockProject.project.CORDOVA_PLATFORM = 'browser';
      var assets = getAssets(mockProject.project);
      var expectedPath = path.join(mockPath, 'platforms/browser/www');
      expect(assets.path).to.equal(expectedPath);
    });
  });

  it('adds cordova_plugins.js to files', function() {
    var assets = getAssets(mockProject.project);
    expect(assets.files).to.deep.equal(['cordova_plugins.js']);
  });
});
