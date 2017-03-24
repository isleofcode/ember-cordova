'use strict';

var td              = require('testdouble');
var expect          = require('../../helpers/expect');
var getCordovaPath  = require('../../../lib/utils/cordova-path');

var path            = require('path');

var mockProject     = require('../../fixtures/ember-cordova-mock/project');

describe('Get Added Platforms Util', function() {
  context('when project has platforms.json', function() {
    let subject;

    beforeEach(function() {
      var cordovaPath = getCordovaPath(mockProject.project);
      var platformsPath = path.join(cordovaPath, 'platforms/platforms.json');

      td.replace(platformsPath, { 'ios': '4.3.1' });

      /* eslint-disable max-len */
      var getAddedPlatforms = require('../../../lib/utils/get-added-platforms');
      /* eslint-enable max-len */

      subject = getAddedPlatforms(mockProject.project);
    });

    afterEach(function() {
      td.reset();
    });

    it('returns its keys', function() {
      expect(subject).to.deep.equal(['ios']);
    });
  });

  context('when project has no platforms.json', function() {
    let subject;

    beforeEach(function() {
      // Context relies on mockProject not including a platform.json.

      /* eslint-disable max-len */
      var getAddedPlatforms = require('../../../lib/utils/get-added-platforms');
      /* eslint-enable max-len */

      subject = getAddedPlatforms(mockProject.project);
    });

    it('returns an empty array', function() {
      expect(subject).to.be.empty;
    });
  });
});
