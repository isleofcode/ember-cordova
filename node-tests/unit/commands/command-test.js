'use strict';

var expect          = require('../../helpers/expect');
var td              = require('testdouble');
var Command         = require('../../../lib/commands/-command');
var mockProject     = require('../../fixtures/ember-cordova-mock/project');
var mockAnalytics   = require('../../fixtures/ember-cordova-mock/analytics');
var isAnything      = td.matchers.anything();

describe('Command', function() {
  afterEach(function() {
    td.reset();
  });

  var setupCmd = function() {
    var cmd = new Command({
      project: mockProject.project
    });

    cmd.analytics = mockAnalytics;
    return cmd;
  };

  it('creates an analytics object on init', function() {
    var cmd = setupCmd();
    expect(cmd.analytics).not.to.be.null;
  });

  it('sets uuid if none exists', function(done) {
    td.replace(Command.prototype, 'getUUID', function() {
      done();
      return 'name';
    });
    var cmd = setupCmd();

    cmd.run();
  });

  it('tracks commands', function() {
    var cmd = setupCmd();
    var trackDouble = td.replace(mockAnalytics, 'track');
    cmd.analytics = { track: trackDouble };

    cmd.run();
    td.verify(trackDouble(isAnything));
  });
});

