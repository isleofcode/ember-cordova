'use strict';

const td            = require('testdouble');
const expect        = require('../../helpers/expect');
const Promise       = require('ember-cli/lib/ext/promise');

const BuildCmd      = require('../../../lib/commands/build');
const EmberBldTask  = require('../../../lib/tasks/ember-build');
const CdvBuildTask  = require('../../../lib/tasks/cordova-build');
const LinkTask      = require('../../../lib/tasks/link-environment');
const HookTask      = require('../../../lib/tasks/run-hook');

const mockProject   = require('../../fixtures/ember-cordova-mock/project');
const defaults      = require('lodash').defaults;

describe('Build Command', () => {
  beforeEach(() => {
    BuildCmd.ui = mockProject.ui;
    BuildCmd.project = defaults(mockProject.project, {
      config: {
        cordova: {
          platform: 'android',
          reloadUrl: 'reloadUrl'
        }
      }
    });
  });

  afterEach(() => {
    td.reset();
  });

  function runBuild(_options) {
    let options = _options || mockProject;

    return BuildCmd.run(options);
  }

  context('when locationType is hash', () => {
    let tasks = [];
    let buildEnv;
    let cordovaPlatform;

    beforeEach(() => {
      mockTasks();
      BuildCmd.project.config.locationType = 'hash';
    });

    function mockTasks() {
      td.replace(HookTask.prototype, 'run',  (hookName) => {
        tasks.push('hook ' + hookName);
        return Promise.resolve();
      });

      td.replace(EmberBldTask.prototype, 'run', (_buildEnv) => {
        buildEnv = _buildEnv;

        tasks.push('ember-build');
        return Promise.resolve();
      });

      td.replace(CdvBuildTask.prototype, 'run', (_cordovaPlatform) => {
        cordovaPlatform = _cordovaPlatform;

        tasks.push('cordova-build');
        return Promise.resolve();
      });

      td.replace(LinkTask.prototype, 'run', () => {
        tasks.push('link');
        return Promise.resolve();
      });
    }

    it('exits cleanly', () => {
      expect(runBuild).not.to.throw;
    });

    it('runs tasks in the correct order', () => {
      runBuild();

      //h-t ember-electron for the pattern
      expect(tasks).to.deep.equal([
        'hook beforeBuild',
        'ember-build',
        'link',
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
      BuildCmd.project.config.locationType = 'auto';
    });

    it('throws', () => {
      expect(runBuild).to.throw;
    });
  });
});
