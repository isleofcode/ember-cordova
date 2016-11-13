'use strict';

var td              = require('testdouble');
var cordovaAssets   = require('../../../lib/utils/cordova-assets');
var expect          = require('../../helpers/expect');
var fs              = require('fs');
var MockUI          = require('ember-cli/tests/helpers/mock-ui');

describe('Get Platform Assets Util', function() {
  describe('getPaths', function() {
    it('is valid for ios', function() {
      var assets = cordovaAssets.getPaths('ios', 'fakeProjectPath');
      var expectedPath = 'platforms/ios/www';
      expect(assets.assetsPath).to.equal(expectedPath);
    });

    it('is valid for android', function() {
      var assets = cordovaAssets.getPaths('android', 'fakeProjectPath');
      var expectedPath = 'platforms/android/assets/www';
      expect(assets.assetsPath).to.equal(expectedPath);
    });

    it('is valid for browser', function() {
      var assets = cordovaAssets.getPaths('browser', 'fakeProjectPath');
      var expectedPath = 'platforms/browser/www';
      expect(assets.assetsPath).to.equal(expectedPath);
    });

    it('adds cordova_plugins.js to files', function() {
      var assets = cordovaAssets.getPaths('ios', 'fakeProjectPath');
      expect(assets.files).to.deep.equal(['cordova_plugins.js', 'cordova.js']);
    });
  });

  describe('validatePaths', function() {
    it('throws an error if assetsPath is undefined', function() {
      expect(function() {
        cordovaAssets.validatePaths();
      }).to.throw(
        'ember-cordova: Platform asset path undefined, cant build'
      );
    });

    it('throws an error if cordova.js does not exist', function() {
      td.replace(fs, 'existsSync', function(path) {
        return path !== 'path/cordova.js'
      });

      var mockUI = new MockUI();
      cordovaAssets.validatePaths('fakeAssetPath', 'fakeProjectPath', mockUI);

      expect(mockUI.output).to.contain('WARNING: ember-cordova:');
      expect(mockUI.output).to.contain('cordova.js');
    });

    it('throws an error if cordova_plugins.js does not exist', function() {
      td.replace(fs, 'existsSync', function(path) {
        return path !== 'path/cordova_plugins.js'
      });

      var mockUI = new MockUI();
      cordovaAssets.validatePaths('fakeAssetPath', 'fakeProjectPath', mockUI);

      expect(mockUI.output).to.contain('WARNING: ember-cordova:');
      expect(mockUI.output).to.contain('cordova_plugins.js');
    });
  });
});
