'use strict';

var td              = require('testdouble');
var expect          = require('../../helpers/expect');
var Promise         = require('rsvp').Promise;

var mockProject     = require('../../fixtures/ember-cordova-mock/project');
var mockAnalytics   = require('../../fixtures/ember-cordova-mock/analytics');

describe('Make Icons Command', function() {
  var iconTaskOptions, MakeIconsCmd, makeIcons;
  var addedPlatforms = ['ios', 'android'];

  beforeEach(function() {
    // Manually replace function because icon task returns a promise.
    td.replace('splicon/dist/icon-task', function(options) {
      // Assign options for verification because td.verify doesn't work with
      // manually replaced functions.
      iconTaskOptions = options;

      return Promise.resolve();
    });

    td.replace('../../../lib/utils/get-added-platforms', function() {
      return addedPlatforms;
    });

    MakeIconsCmd = require('../../../lib/commands/make-icons');

    makeIcons = new MakeIconsCmd({
      project: mockProject.project,
      analytics: mockAnalytics
    });
  });

  afterEach(function() {
    iconTaskOptions = undefined;

    td.reset();
  });

  /* eslint-disable max-len */
  context('when options and platform is `added`', function() {
    var options = {
      source: 'ember-cordova/icon.svg',
      platform: ['added']
    };

    beforeEach(function() {
      return makeIcons.run(options);
    });

    it('calls icon task with passed source, added platforms, and projectPath', function() {
      expect(iconTaskOptions.source).to.equal(options.source);
      expect(iconTaskOptions.platforms).to.deep.equal(addedPlatforms);
      expect(iconTaskOptions.projectPath).to.equal('ember-cordova/cordova');
    });
  });

  context('when options and platform is not `added`', function() {
    var options = {
      source: 'ember-cordova/icon.svg',
      platform: ['ios']
    };

    beforeEach(function() {
      return makeIcons.run(options);
    });

    it('calls icon task with passed source, passed platform, and projectPath', function() {
      expect(iconTaskOptions.source).to.equal(options.source);
      expect(iconTaskOptions.platforms).to.equal(options.platform);
      expect(iconTaskOptions.projectPath).to.equal('ember-cordova/cordova');
    });
  });
  /* eslint-enable max-len */
});
