'use strict';
const parsePlatformOpts = require('../../../lib/utils/parse-platform-opts');

var td              = require('testdouble');

var ui              = require('../../../lib/utils/ui');
var expect          = require('../../helpers/expect');
var Promise         = require('ember-cli/lib/ext/promise');

var BuildCmd        = require('../../../lib/commands/build');
var BuildTask       = require('../../../lib/tasks/ember-build');
var CdvBuildTask    = require('../../../lib/tasks/cordova-build');
var HookTask        = require('../../../lib/tasks/run-hook');
var PlatformTask    = require('../../../lib/tasks/validate/platform');

var mockProject     = require('../../fixtures/ember-cordova-mock/project');
var mockAnalytics   = require('../../fixtures/ember-cordova-mock/analytics');

describe('Build Command', function() {
  var build;

  beforeEach(function() {
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

  afterEach(function() {
    td.reset();
  });

  context('when locationType is hash', () => {
    let tasks;
    let cordovaOptions;

    beforeEach(function() {
      mockTasks();
    });

    function mockTasks() {
      tasks = [];

      td.replace(PlatformTask.prototype, 'run', function() {
        tasks.push('check-platform');
        return Promise.resolve();
      });

      td.replace(HookTask.prototype, 'run', function(hookName) {
        tasks.push('hook ' + hookName);
        return Promise.resolve();
      });

      td.replace(BuildTask.prototype, 'run', function() {
        return Promise.resolve();
      });

      td.replace(CdvBuildTask.prototype, 'run', (_cordovaOptions) => {
        cordovaOptions = _cordovaOptions;

        tasks.push('cordova-build');
        return Promise.resolve();
      });
    }

    it('exits cleanly', function() {
      return expect(function() {
        build.run({});
      }).not.to.throw(Error);
    });

    it('runs tasks in the correct order', function() {
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

    context('when passedPlatform is ios', () => {
      it('platform eq ios', () => {
        let passedPlatform = 'ios';

        return build.run({
          platform: passedPlatform
        }).then(function() {
          expect(cordovaOptions.platform).to.equal(passedPlatform);
        });
      });
    });
    context('when passedPlatform is android', () => {
      it('platform eq android', () => {
        let passedPlatform = 'android';

        return build.run({
          platform: passedPlatform
        }).then(function() {
          expect(cordovaOptions.platform).to.equal(passedPlatform);
        });
      });
    });

    describe('isRelease', () => {
      context('when release is false', () => {
        it('isRelease eq false', () => {
          let passedPlatform = 'ios';
          let passedRelease = false;

          return build.run({
            platform: passedPlatform,
            isRelease: passedRelease,
          }).then(function() {
            expect(cordovaOptions.isRelease).to.equal(passedRelease);
          });
        });
      });
      context('when release is true', () => {
        it('isRelease eq true', () => {
          let passedPlatform = 'ios';
          let passedRelease = true;

          return build.run({
            platform: passedPlatform,
            isRelease: passedRelease,
          }).then(function() {
            expect(cordovaOptions.isRelease).to.equal(passedRelease);
          });
        });
      });
    });

    describe('isEmulator', () => {
      context('when device is false', () => {
        it('isEmulator eq true', () => {
          let passedPlatform = 'ios';
          let passedDevice = false;

          return build.run({
            platform: passedPlatform,
            isEmulator: passedDevice,
          }).then(function() {
            expect(cordovaOptions.isEmulator).to.equal(passedDevice);
          });
        });
      });
      context('when device is true', () => {
        it('isEmulator eq false', () => {
          let passedPlatform = 'ios';
          let passedDevice = true;

          return build.run({
            platform: passedPlatform,
            isEmulator: passedDevice,
          }).then(function() {
            expect(cordovaOptions.isEmulator).to.equal(passedDevice);
          });
        });
      });
    });

    describe('buildConfig', () => {
      context('when not passed', () => {
        it('does not append buildConfig to options', () => {
          let passedPlatform = 'ios';
          let passedBuildConfig = undefined;

          return build.run({
            platform: passedPlatform,
          }).then(function() {
            expect(cordovaOptions.buildConfig).to.equal(passedBuildConfig);
          });
        });
      });
      context('when buildConfig is passed', () => {
        it('appends buildConfig options to options', () => {
          let passedPlatform = 'ios';
          let passedBuildConfig = '/foo';

          return build.run({
            platform: passedPlatform,
            buildConfig: passedBuildConfig,
          }).then(function() {
            expect(cordovaOptions.buildConfig).to.equal(passedBuildConfig);
          });
        });
      });
    });

    describe('platformOpts', () => {
      context('when platform is ios', () => {
        it('passes ios options to CdvBuildTask', () => {
          let passedPlatform = 'ios';
          let platformOpts = parsePlatformOpts(
            cordovaOptions.platform,
            cordovaOptions
          );

          return build.run({
            platform: passedPlatform,
            platformOpts: platformOpts
          }).then(function() {
            expect('codeSignIdentity' in cordovaOptions.platformOpts)
            .to.equal('codeSignIdentity' in platformOpts);
          });
        });

        it('filters out android options', () => {
          let passedPlatform = 'ios';
          let platformOpts = parsePlatformOpts(
            cordovaOptions.platform,
            cordovaOptions
          );

          return build.run({
            platform: passedPlatform,
            platformOpts: platformOpts
          }).then(function() {
            expect('alias' in cordovaOptions.platformOpts)
            .to.equal('alias' in platformOpts);
          });
        });
      });

      context('when platform is android', () => {
        it('passes android options to CdvBuildTask', () => {
          let passedPlatform = 'android';
          let platformOpts = parsePlatformOpts(
            cordovaOptions.platform,
            cordovaOptions
          );

          return build.run({
            platform: passedPlatform,
            platformOpts: platformOpts
          }).then(function() {
            expect('alias' in cordovaOptions.platformOpts)
            .to.equal('alias' in platformOpts);
          });
        });

        it('filters out ios options', () => {
          let passedPlatform = 'android';
          let platformOpts = parsePlatformOpts(
            cordovaOptions.platform,
            cordovaOptions
          );

          return build.run({
            platform: passedPlatform,
            platformOpts: platformOpts
          }).then(function() {
            expect('codeSignIdentity' in cordovaOptions.platformOpts)
            .to.equal('codeSignIdentity' in platformOpts);
          });
        });
      });
    });
  });

  context('when locationType is not hash', function() {
    beforeEach(function() {
      build.project.config = function() {
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
        build.run({});
      }).to.throw(Error);
    });
  });
});
