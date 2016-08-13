'use strict';

const getAssets     = require('../../../lib/utils/get-platform-assets');
const cordovaPath   = require('../../../lib/utils/cordova-path');
const expect        = require('../../helpers/expect');
const mockProject   = require('../../fixtures/ember-cordova-mock/project');
const path          = require('path');

describe('Get Platform Assets Util', () => {
  let mockPath = cordovaPath(mockProject.project);
  mockProject.project.CORDOVA_PLATFORM = 'ios';

  describe('assets path', function() {
    it('is valid for ios', function() {
      let assets = getAssets(mockProject.project);
      let expectedPath = path.join(mockPath, 'platforms/ios/www');
      expect(assets.path).to.equal(expectedPath);
    });

    it('is valid for android', function() {
      mockProject.project.CORDOVA_PLATFORM = 'android';
      let assets = getAssets(mockProject.project);
      let expectedPath = path.join(mockPath, 'platforms/android/assets/www');
      expect(assets.path).to.equal(expectedPath);
    });

    it('is valid for browser', function() {
      mockProject.project.CORDOVA_PLATFORM = 'browser';
      let assets = getAssets(mockProject.project);
      let expectedPath = path.join(mockPath, 'platforms/browser/www');
      expect(assets.path).to.equal(expectedPath);
    });
  });

  it('adds cordova_plugins.js to files', function() {
    let assets = getAssets(mockProject.project);
    expect(assets.files).to.deep.equal(['cordova_plugins.js']);
  });
});
