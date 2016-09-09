'use strict';

var td              = require('testdouble');
var mockProject     = require('../../fixtures/ember-cordova-mock/project');
var CdvRawTask      = require('../../../lib/tasks/cordova-raw');

const setupBuildTask = function() {
  const CdvBuildTask = require('../../../lib/tasks/cordova-build');
  return new CdvBuildTask({
    project: mockProject.project,
    ui: mockProject.ui,
    platform: 'ios'
  });
};

describe('Cordova Build Task', () => {
  let cdvBuild, build;

  beforeEach(() => {
    cdvBuild = td.replace(CdvRawTask.prototype, 'run');
    build = setupBuildTask();
  });

  afterEach(() => {
    td.reset();
  });

  describe('platform', () => {
    const DEFAULT_OPTS = ['--debug', '--emulator'];

    context('when ios', () => {
      it('creates a raw ios build task', () => {
        build.run();

        td.verify(cdvBuild({
          platforms: ['ios'],
          options: DEFAULT_OPTS
        }));
      });
    });

    context('when android', () => {
      it('sets platform to android', () => {
        build.platform = 'android';
        build.run();

        td.verify(cdvBuild({
          platforms: ['android'],
          options: DEFAULT_OPTS
        }));
      });
    });
  });

  describe('isRelease', () => {
    const DEFAULT_PLATFORMS = ['ios'];
    const BASE_OPTIONS = ['--emulator'];

    context('when not explicitly defined', () => {
      it('passes --debug', () => {
        build.run();

        td.verify(cdvBuild({
          platforms: DEFAULT_PLATFORMS,
          options: ['--debug'].concat(BASE_OPTIONS)
        }));
      });
    });

    context('when true', () => {
      it('passes --release', () => {
        build.isRelease = true;
        build.run();

        td.verify(cdvBuild({
          platforms: DEFAULT_PLATFORMS,
          options: ['--release'].concat(BASE_OPTIONS)
        }));
      });
    });

    context('when false', () => {
      it('passes --debug', () => {
        build.isRelease = false;
        build.run();

        td.verify(cdvBuild({
          platforms: DEFAULT_PLATFORMS,
          options: ['--debug'].concat(BASE_OPTIONS)
        }));
      });
    });
  });

  describe('isEmulator', () => {
    const DEFAULT_PLATFORMS = ['ios'];
    const DEFAULT_OPTS = ['--debug'];

    context('when not explicitly defined', () => {
      it('passes --emulator', () => {
        build.run();

        td.verify(cdvBuild({
          platforms: DEFAULT_PLATFORMS,
          options: DEFAULT_OPTS.concat('--emulator')
        }));
      });
    });

    context('when true', () => {
      it('passes --device', () => {
        build.isEmulator = true;
        build.run();

        td.verify(cdvBuild({
          platforms: DEFAULT_PLATFORMS,
          options: DEFAULT_OPTS.concat('--emulator')
        }));
      });
    });

    context('when false', () => {
      it('passes --emulator', () => {
        build.isEmulator = false;
        build.run();

        td.verify(cdvBuild({
          platforms: DEFAULT_PLATFORMS,
          options: DEFAULT_OPTS.concat('--device')
        }));
      });
    });
  });

  describe('buildConfig', () => {
    const DEFAULT_PLATFORMS = ['ios'];
    const DEFAULT_OPTS = ['--debug', '--emulator'];

    context('when not passed', () => {
      it('does not pass buildConfig', () => {
        build.run();

        td.verify(cdvBuild({
          platforms: DEFAULT_PLATFORMS,
          options: DEFAULT_OPTS
        }));
      });
    });

    context('when passed', () => {
      it('passes --buildConfig', () => {
        build.buildConfig = 'foo';
        build.run();

        td.verify(cdvBuild({
          platforms: DEFAULT_PLATFORMS,
          options: DEFAULT_OPTS.concat('--buildConfig=foo')
        }));
      });
    });
  });

  describe('platformOpts', () => {
    const DEFAULT_PLATFORMS = ['ios'];
    const DEFAULT_OPTS = ['--debug', '--emulator'];

    context('when not passed', () => {
      it('does not pass platformOpts', () => {
        build.run();

        td.verify(cdvBuild({
          platforms: DEFAULT_PLATFORMS,
          options: DEFAULT_OPTS
        }));
      });
    });

    context('when key values are undefined', () => {
      it('does not pass platformOpts', () => {

      });
    });

    context('when key values are defined', () => {
      it('does not pass platformOpts', () => {

      });
    });
  });

  it('sets device flag when passed', () => {
    build.isEmulator = false;
    build.run();

    td.verify(cdvBuild({
      platforms: ['ios'],
      options: ['--debug', '--device']
    }));
  });
});
