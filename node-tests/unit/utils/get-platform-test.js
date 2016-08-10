'use strict';

const expect        = require('../../helpers/expect');
const getPlatform   = require('../../../lib/utils/get-platform');
const mockProject   = require('../../fixtures/ember-cordova-mock/project');

describe('Get Platform Util', () => {
  it('returns the default platform if one is set', function() {
    expect(
      getPlatform(mockProject)
    ).to.equal('ios');
  });

  it('returns the cflag platform is there is no default', function() {
    expect(
      getPlatform({}, {platform: 'android'})
    ).to.equal('android');
  });
});

