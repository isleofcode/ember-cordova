'use strict';

const expect        = require('../../helpers/expect');
const td            = require('testdouble');
const Command       = require('../../../lib/commands/-command');
const mockProject   = require('../../fixtures/ember-cordova-mock/project');
const mockAnalytics = require('../../fixtures/ember-cordova-mock/analytics');
const isAnything    = td.matchers.anything();

describe('Command', function() {
  afterEach(function() {
    td.reset();
  });

  const setupCmd = function() {
    let cmd = new Command({
      project: mockProject.project
    });

    cmd.analytics = mockAnalytics;
    return cmd;
  };

  it('creates an analytics object on init', function() {
    let cmd = setupCmd();
    expect(cmd.analytics).not.to.be.null;
  });

  it('sets uuid if none exists', function(done) {
    td.replace(Command.prototype, 'getUUID', function() {
      done();
      return 'name';
    });
    let cmd = setupCmd();

    cmd.run();
  });

  it('tracks commands', function() {
    let cmd = setupCmd();
    var trackDouble = td.replace(mockAnalytics, 'track');
    cmd.analytics = { track: trackDouble };

    cmd.run();
    td.verify(trackDouble(isAnything));
  });
});

