'use strict';

var td              = require('testdouble');
var expect          = require('../../helpers/expect');
var Promise         = require('rsvp').Promise;

var mockProject     = require('../../fixtures/ember-cordova-mock/project');
var mockAnalytics   = require('../../fixtures/ember-cordova-mock/analytics');

describe('Make Splashes Command', function() {
  var splashTaskOptions, MakeSplashesCmd, makeSplashes;
  var addedPlatforms = ['ios', 'android'];

  beforeEach(function() {
    // Manually replace function because splash task returns a promise.
    td.replace('splicon/dist/splash-task', function(options) {
      // Assign options for verification because td.verify doesn't work with
      // manually replaced functions.
      splashTaskOptions = options;

      return Promise.resolve();
    });

    td.replace('../../../lib/utils/get-added-platforms', function() {
      return addedPlatforms;
    });

    MakeSplashesCmd = require('../../../lib/commands/make-splashes');

    makeSplashes = new MakeSplashesCmd({
      project: mockProject.project,
      analytics: mockAnalytics
    });
  });

  afterEach(function() {
    splashTaskOptions = undefined;

    td.reset();
  });

  /* eslint-disable max-len */
  context('when options and platform is `added`', function() {
    var options = {
      source: 'ember-cordova/splash.svg',
      platform: ['added']
    };

    beforeEach(function() {
      return makeSplashes.run(options);
    });

    it('calls splash task with passed source, added platforms, and projectPath', function() {
      expect(splashTaskOptions.source).to.equal(options.source);
      expect(splashTaskOptions.platforms).to.deep.equal(addedPlatforms);
      expect(splashTaskOptions.projectPath).to.equal('ember-cordova/cordova');
    });
  });

  context('when options and platform is not `added`', function() {
    var options = {
      source: 'ember-cordova/splash.svg',
      platform: ['ios']
    };

    beforeEach(function() {
      return makeSplashes.run(options);
    });

    it('calls splash task with passed source, passed platform, and projectPath', function() {
      expect(splashTaskOptions.source).to.equal(options.source);
      expect(splashTaskOptions.platforms).to.equal(options.platform);
      expect(splashTaskOptions.projectPath).to.equal('ember-cordova/cordova');
    });
  });
  /* eslint-enable max-len */
});
