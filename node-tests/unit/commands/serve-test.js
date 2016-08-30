'use strict';

var td              = require('testdouble');
var expect          = require('../../helpers/expect');
var Promise         = require('ember-cli/lib/ext/promise');

var ui              = require('../../../lib/utils/ui');
var ServeCmd        = require('../../../lib/commands/serve');
var ServeTask       = require('../../../lib/tasks/serve');
var CdvBuildTask    = require('../../../lib/tasks/cordova-build');
var BashTask        = require('../../../lib/tasks/bash');
var HookTask        = require('../../../lib/tasks/run-hook');
var PlatformTask    = require('../../../lib/tasks/validate/platform');
var PluginTask      = require('../../../lib/tasks/validate/plugin');
var LRloadShellTask = require('../../../lib/tasks/create-livereload-shell');

var mockProject     = require('../../fixtures/ember-cordova-mock/project');
var mockAnalytics   = require('../../fixtures/ember-cordova-mock/analytics');

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

      td.replace(PlatformTask.prototype, 'run', function(hookName) {
        tasks.push('validate-platform');
        return Promise.resolve();
      });

      td.replace(PluginTask.prototype, 'run', function(hookName) {
        tasks.push('validate-plugin');
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
  });

  context('when locationType is not hash', function() {
    beforeEach(function() {
      serveCmd.project.config = function() {
        return {
          locationType: 'auto'
        };
      };

      td.replace(ui, 'writeLine',  function() {
        throw new Error('Exit Called');
      });
    });

    it('throws', function() {
      return expect(function() {
        serveCmd.run({})
      }).to.throw(Error);
    });
  });
});
