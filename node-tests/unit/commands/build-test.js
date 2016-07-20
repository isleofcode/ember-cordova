'use strict';

const td            = require('testdouble');
const expect        = require('../../helpers/expect');
const Promise       = require('ember-cli/lib/ext/promise');

const BuildCmd      = require('../../../lib/commands/build');
const CdvBuildTask  = require('../../../lib/tasks/cordova-build');
const HookTask      = require('../../../lib/tasks/run-hook');

const mockProject   = require('../../fixtures/ember-cordova-mock/project');

describe('Build Command', () => {
  beforeEach(() => {
    BuildCmd.ui = mockProject.ui;

    BuildCmd.project = mockProject.project;
    BuildCmd.project.config = function() {
      return {
        locationType: 'hash'
      }
    }
  });

  afterEach(() => {
    td.reset();
  });

  function runBuild(_options) {
    let options = _options || mockProject;

    return BuildCmd.run(options);
  }

  context('when locationType is hash', () => {
    let tasks, buildEnv, cordovaPlatform;

    beforeEach(() => {
      tasks = mockTasks();
    });

    function mockTasks() {
      let tasks = [];

      td.replace(HookTask.prototype, 'run',  (hookName) => {
        tasks.push('hook ' + hookName);
        return Promise.resolve();
      });

      td.replace(CdvBuildTask.prototype, 'run', (_cordovaPlatform) => {
        cordovaPlatform = _cordovaPlatform;

        tasks.push('cordova-build');
        return Promise.resolve();
      });
    }

    it('exits cleanly', () => {
      expect(runBuild).not.to.throw(Error);
    });

    it('runs tasks in the correct order', () => {
      runBuild();

      //h-t ember-electron for the pattern
      expect(tasks).to.deep.equal([
        'hook beforeBuild',
        'cordova-build',
        'hook afterBuild'
      ]);
    });

    it('passes env to ember build task', () => {
      let passedEnv = 'development';

      runBuild({
        environment: passedEnv
      });

      expect(buildEnv).to.equal(passedEnv);
    });

    it('passes platform to cordova build task', () => {
      let passedPlatform = 'ios';

      runBuild({
        platform: passedPlatform
      });

      expect(cordovaPlatform).to.equal(passedPlatform);
    });
  });

  context('when locationType is not hash', () => {
    beforeEach(() => {
      BuildCmd.project.config = function() {
        return {
          locationType: 'auto'
        }
      }
    });

    it('throws', () => {
      expect(runBuild).to.throw(Error);
    });
  });
});
