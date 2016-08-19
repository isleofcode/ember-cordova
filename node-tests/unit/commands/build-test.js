'use strict';

const td            = require('testdouble');

const ui            = require('../../../lib/utils/ui');
const expect        = require('../../helpers/expect');
const Promise       = require('ember-cli/lib/ext/promise');

const BuildCmd      = require('../../../lib/commands/build');
const BuildTask     = require('../../../lib/tasks/ember-build');
const CdvBuildTask  = require('../../../lib/tasks/cordova-build');
const HookTask      = require('../../../lib/tasks/run-hook');
const PlatformTask  = require('../../../lib/tasks/validate/platform');

const mockProject   = require('../../fixtures/ember-cordova-mock/project');
const mockAnalytics = require('../../fixtures/ember-cordova-mock/analytics');

describe('Build Command', () => {
  let build;

  beforeEach(() => {
    var project = mockProject.project;
    project.config = function() {
      return {
        locationType: 'hash'
      };
    }

    build = new BuildCmd({
      project: project,
      ui: mockProject.ui
    });
    build.analytics = mockAnalytics;
  });

  afterEach(() => {
    td.reset();
  });

  context('when locationType is hash', () => {
    let tasks;
    let cordovaPlatform;

    beforeEach(() => {
      mockTasks();
    });

    function mockTasks() {
      tasks = [];

      td.replace(PlatformTask.prototype, 'run', () => {
        tasks.push('check-platform');
        return Promise.resolve();
      });

      td.replace(HookTask.prototype, 'run',  (hookName) => {
        tasks.push('hook ' + hookName);
        return Promise.resolve();
      });

      td.replace(BuildTask.prototype, 'run', () => {
        return Promise.resolve();
      });

      td.replace(CdvBuildTask.prototype, 'run', (_cordovaPlatform) => {
        cordovaPlatform = _cordovaPlatform;

        tasks.push('cordova-build');
        return Promise.resolve();
      });
    }

    it('exits cleanly', () => {
      return expect(function() {
        build.run({});
      }).not.to.throw(Error);
    });

    it('runs tasks in the correct order', () => {
      return build.run({})
        .then(function() {
          //h-t ember-electron for the pattern
          expect(tasks).to.deep.equal([
            'check-platform',
            'hook beforeBuild',
            'cordova-build',
            'hook afterBuild'
          ]);
        });
    });

    it('passes platform to cordova build task', () => {
      let passedPlatform = 'ios';

      return build.run({
        platform: passedPlatform
      }).then(function() {
        expect(cordovaPlatform).to.equal(passedPlatform);
      });
    });
  });

  context('when locationType is not hash', () => {
    beforeEach(() => {
      build.project.config = function() {
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
        build.run({});
      }).to.throw(Error);
    });
  });
});
