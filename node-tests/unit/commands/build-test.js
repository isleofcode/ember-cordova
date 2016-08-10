'use strict';

const td            = require('testdouble');

const ui            = require('../../../lib/utils/ui');
const expect        = require('../../helpers/expect');
const Promise       = require('ember-cli/lib/ext/promise');

const BuildCmd      = require('../../../lib/commands/build');
const BuildTask     = require('../../../lib/tasks/ember-build');
const CdvBuildTask  = require('../../../lib/tasks/cordova-build');
const HookTask      = require('../../../lib/tasks/run-hook');
const PlatformTask  = require('../../../lib/tasks/validate-platform');

const mockProject   = require('../../fixtures/ember-cordova-mock/project');

describe('Build Command', () => {
  beforeEach(() => {
    BuildCmd.ui = mockProject.ui;

    BuildCmd.project = mockProject.project;
    BuildCmd.project.config = function() {
      return {
        locationType: 'hash'
      };
    };
  });

  afterEach(() => {
    td.reset();
  });

  function runBuild(_options) {
    let options = _options || mockProject;

    return BuildCmd.run(options);
  }

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
      expect(runBuild).not.to.throw(Error);
    });

    it('runs tasks in the correct order', () => {
      return runBuild()
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

      return runBuild({
        platform: passedPlatform
      }).then(function() {
        expect(cordovaPlatform).to.equal(passedPlatform);
      });
    });
  });

  context('when locationType is not hash', () => {
    beforeEach(() => {
      BuildCmd.project.config = function() {
        return {
          locationType: 'auto'
        };
      };

      td.replace(ui, 'writeLine',  () => {
        throw new Error('Exit Called');
      });

    });

    it('throws', () => {
      expect(runBuild).to.throw(Error);
    });
  });
});
