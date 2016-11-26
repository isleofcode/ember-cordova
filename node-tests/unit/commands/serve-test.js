'use strict';

var td              = require('testdouble');
var expect          = require('../../helpers/expect');
var Promise         = require('ember-cli/lib/ext/promise');

var ServeCmd        = require('../../../lib/commands/serve');
var ServeTask       = require('../../../lib/tasks/serve');
var CdvBuildTask    = require('../../../lib/tasks/cordova-build');
var BashTask        = require('../../../lib/tasks/bash');
var HookTask        = require('../../../lib/tasks/run-hook');
var LRloadShellTask = require('../../../lib/tasks/create-livereload-shell');

var mockProject     = require('../../fixtures/ember-cordova-mock/project');
var mockAnalytics   = require('../../fixtures/ember-cordova-mock/analytics');

/* eslint-disable max-len */
var ValidatePlatform        = require('../../../lib/tasks/validate/platform');
var ValidatePlugin          = require('../../../lib/tasks/validate/plugin');
var ValidateAllowNavigation = require('../../../lib/tasks/validate/allow-navigation');
var ValidateRootUrl         = require('../../../lib/tasks/validate/root-url');
/* eslint-enable max-len */

describe('Serve Command', function() {
  var serveCmd;

  afterEach(function() {
    td.reset();
  });

  beforeEach(function() {
    serveCmd = new ServeCmd({
      project: mockProject.project,
      ui: mockProject.ui
    });

    serveCmd.analytics = mockAnalytics;
    serveCmd.project.config = function() {
      return {
        locationType: 'hash'
      }
    }
  });

  context('when locationType is hash', function() {
    var tasks = [];

    beforeEach(function() {
      mockTasks();
    });

    function mockTasks() {
      tasks = [];

      td.replace(HookTask.prototype, 'run', function(hookName) {
        tasks.push('hook ' + hookName);
        return Promise.resolve();
      });

      td.replace(ValidatePlatform.prototype, 'run', function() {
        tasks.push('validate-platform');
        return Promise.resolve();
      });

      td.replace(ValidatePlugin.prototype, 'run', function() {
        tasks.push('validate-plugin');
        return Promise.resolve();
      });

      td.replace(ValidateAllowNavigation.prototype, 'run', function() {
        tasks.push('validate-allow-navigation');
        return Promise.resolve();
      });

      td.replace(ValidateRootUrl.prototype, 'run', function() {
        tasks.push('validate-root-url');
        return Promise.resolve();
      });

      td.replace(LRloadShellTask.prototype, 'run', function() {
        tasks.push('create-livereload-shell');
        return Promise.resolve();
      });

      td.replace(CdvBuildTask.prototype, 'run', function() {
        tasks.push('cordova-build');
        return Promise.resolve();
      });

      td.replace(ServeTask.prototype, 'run', function() {
        tasks.push('ember-build-serve');
        return Promise.resolve();
      });

      td.replace(BashTask.prototype, 'run', function() {
        tasks.push('serve-bash');
        return Promise.resolve();
      });

      td.replace(ServeCmd, '_serveHang', function() {
        return Promise.resolve();
      });
    }

    it('exits cleanly', function() {
      return expect(function() {
        serveCmd.run({})
      }).not.to.throw(Error);
    });

    it('runs tasks in the correct order', function() {
      return serveCmd.run({}).then(function() {
        expect(tasks).to.deep.equal([
          'validate-root-url',
          'validate-allow-navigation',
          'validate-platform',
          'validate-plugin',
          'hook beforeBuild',
          'create-livereload-shell',
          'cordova-build',
          'hook afterBuild',
          'ember-build-serve'
        ]);
      });
    });

    it('skips emer & cordova builds with --skip flags', function() {
      return serveCmd.run({
        skipEmberBuild: true,
        skipCordovaBuild: true
      }).then(function() {
        expect(tasks).to.deep.equal([
          'validate-root-url',
          'validate-allow-navigation',
          'validate-platform',
          'validate-plugin',
          'hook beforeBuild',
          'create-livereload-shell',
          'hook afterBuild'
        ]);
      });
    });
  });
});
