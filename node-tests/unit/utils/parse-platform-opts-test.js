'use strict';

const parsePlatformOpts     = require('../../../lib/utils/parse-platform-opts');
const mockProject   = require('../../fixtures/ember-cordova-mock/project');

describe('Parse Platform Options Util', () => {
  describe('for ios', function() {
    mockProject.project.CORDOVA_PLATFORM = 'ios';

    it('returns ios options', function() {

    });
  });
  describe('for android', function() {
    mockProject.project.CORDOVA_PLATFORM = 'android';

    it('returns android options', function() {

    });
  });
});
