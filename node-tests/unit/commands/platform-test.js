'use strict';

var td              = require('testdouble');
var expect          = require('../../helpers/expect');
var PlatformCmd     = require('../../../lib/commands/platform');
var CdvRawTask      = require('../../../lib/tasks/cordova-raw');
var SetupViewTask   = require('../../../lib/tasks/setup-webview');
var Promise         = require('rsvp');

var mockProject     = require('../../fixtures/ember-cordova-mock/project');
var mockAnalytics   = require('../../fixtures/ember-cordova-mock/analytics');

describe('Platform Command', function() {
  var platform;

  beforeEach(function() {
    platform = new PlatformCmd({
      project: mockProject.project
    });
    platform.analytics = mockAnalytics;
  });

  afterEach(function() {
    td.reset();
  });

  describe('Platform Install', function() {
    beforeEach(function() {
      td.replace(SetupViewTask.prototype, 'run', function() {
        return Promise.resolve();
      });
    });

    it('passes command to Cordova Raw Task', function() {
      var rawCommand, rawPlugins;

      td.replace(CdvRawTask.prototype, 'run', function(cmd, plugins) {
        rawCommand = cmd;
        rawPlugins = plugins;

        return Promise.resolve();
      });

      return platform.run({}, ['add', 'ios']).then(function() {
        expect(rawCommand).to.equal('add');
        expect(rawPlugins).to.equal('ios');
      });
    });

    it('passes the save flag', function() {
      var rawOpts;
      var opts = { save: false };

      td.replace(CdvRawTask.prototype, 'run', function(cmd, plugins, options) {
        rawOpts = options;
        return Promise.resolve();
      });

      return platform.run(opts, ['add', 'ios']).then(function() {
        expect(rawOpts).to.have.property('save').and.equal(false);
      });
    });
  });

  describe('webview upgrades', function() {
    beforeEach(function() {
      td.replace(CdvRawTask.prototype, 'run', function(cmd, plugins, options) {
        return Promise.resolve();
      });
    });

    it('calls SetupWebView to handle init', function() {
      var setupViewDouble = td.replace(SetupViewTask.prototype, 'run');

      return platform.run({}, ['add', 'ios']).then(function() {
        td.verify(setupViewDouble());
      });
    });
  });
});
