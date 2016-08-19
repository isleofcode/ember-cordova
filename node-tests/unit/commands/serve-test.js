'use strict';

const td            = require('testdouble');
const expect        = require('../../helpers/expect');
const Promise       = require('ember-cli/lib/ext/promise');

const ui            = require('../../../lib/utils/ui');
const ServeCmd      = require('../../../lib/commands/serve');
const ServeTask     = require('../../../lib/tasks/serve');
const CdvBuildTask  = require('../../../lib/tasks/cordova-build');
const BashTask      = require('../../../lib/tasks/bash');
const HookTask      = require('../../../lib/tasks/run-hook');
const PlatformTask  = require('../../../lib/tasks/validate/platform');
const PluginTask    = require('../../../lib/tasks/validate/plugin');
const LRloadShellTask = require('../../../lib/tasks/create-livereload-shell');

const mockProject   = require('../../fixtures/ember-cordova-mock/project');
const mockAnalytics = require('../../fixtures/ember-cordova-mock/analytics');

describe('Serve Command', () => {
  var serveCmd;

  afterEach(() => {
    td.reset();
  });

  beforeEach(() => {
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

  context('when locationType is hash', () => {
    let tasks = [];

    beforeEach(() => {
      mockTasks();
    });

    function mockTasks() {
      tasks = [];

      td.replace(HookTask.prototype, 'run',  (hookName) => {
        tasks.push('hook ' + hookName);
        return Promise.resolve();
      });

      td.replace(PlatformTask.prototype, 'run', (hookName) => {
        tasks.push('validate-platform');
        return Promise.resolve();
      });

      td.replace(PluginTask.prototype, 'run', (hookName) => {
        tasks.push('validate-plugin');
        return Promise.resolve();
      });

      td.replace(LRloadShellTask.prototype, 'run', () => {
        tasks.push('create-livereload-shell');
        return Promise.resolve();
      });

      td.replace(CdvBuildTask.prototype, 'run', () => {
        tasks.push('cordova-build');
        return Promise.resolve();
      });

      td.replace(ServeTask.prototype, 'run', () => {
        tasks.push('ember-build-serve');
        return Promise.resolve();
      });

      td.replace(BashTask.prototype, 'run', () => {
        tasks.push('serve-bash');
        return Promise.resolve();
      });

      td.replace(ServeCmd, '_serveHang', function() {
        return Promise.resolve();
      });
    }

    it('exits cleanly', () => {
      return expect(function() {
        serveCmd.run({})
      }).not.to.throw(Error);
    });

    it('runs tasks in the correct order', () => {
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

  context('when locationType is not hash', () => {
    beforeEach(() => {
      serveCmd.project.config = function() {
        return {
          locationType: 'auto'
        };
      };

      td.replace(ui, 'writeLine',  () => {
        throw new Error('Exit Called');
      });
    });

    it('throws', () => {
      return expect(function() {
        serveCmd.run({})
      }).to.throw(Error);
    });
  });
});
