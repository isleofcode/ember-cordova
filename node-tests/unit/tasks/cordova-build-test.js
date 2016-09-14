'use strict';

var td              = require('testdouble');
var mockProject     = require('../../fixtures/ember-cordova-mock/project');
var CdvRawTask      = require('../../../lib/tasks/cordova-raw');

var setupBuildTask = function() {
  var CdvBuildTask = require('../../../lib/tasks/cordova-build');
  return new CdvBuildTask({
    project: mockProject.project,
    ui: mockProject.ui,
    platform: 'ios'
  });
};

describe('Cordova Build Task', function() {
  var cdvBuild, build;

  beforeEach(function() {
    cdvBuild = td.replace(CdvRawTask.prototype, 'run');
    build = setupBuildTask();
  });

  afterEach(() => {
    td.reset();
  });

  describe('platform', function() {
    var DEFAULT_OPTS = ['--debug', '--emulator'];

    context('when ios', function() {
      it('creates a raw ios build task', function() {
        build.run();

        td.verify(cdvBuild({
          platforms: ['ios'],
          options: DEFAULT_OPTS
        }));
      });
    });

    context('when android', function() {
      it('sets platform to android', function() {
        build.platform = 'android';
        build.run();

        td.verify(cdvBuild({
          platforms: ['android'],
          options: DEFAULT_OPTS
        }));
      });
    });
  });

  describe('isRelease', function() {
    var DEFAULT_PLATFORMS = ['ios'];
    var BASE_OPTIONS = ['--emulator'];

    context('when not explicitly defined', function() {
      it('passes --debug', function() {
        build.run();

        td.verify(cdvBuild({
          platforms: DEFAULT_PLATFORMS,
          options: ['--debug'].concat(BASE_OPTIONS)
        }));
      });
    });

    context('when true', function() {
      it('passes --release', function() {
        build.isRelease = true;
        build.run();

        td.verify(cdvBuild({
          platforms: DEFAULT_PLATFORMS,
          options: ['--release'].concat(BASE_OPTIONS)
        }));
      });
    });

    context('when false', function() {
      it('passes --debug', function() {
        build.isRelease = false;
        build.run();

        td.verify(cdvBuild({
          platforms: DEFAULT_PLATFORMS,
          options: ['--debug'].concat(BASE_OPTIONS)
        }));
      });
    });
  });

  describe('isEmulator', function() {
    var DEFAULT_PLATFORMS = ['ios'];
    var DEFAULT_OPTS = ['--debug'];

    context('when not explicitly defined', function() {
      it('passes --emulator', function() {
        build.run();

        td.verify(cdvBuild({
          platforms: DEFAULT_PLATFORMS,
          options: DEFAULT_OPTS.concat('--emulator')
        }));
      });
    });

    context('when true', function() {
      it('passes --device', function() {
        build.isEmulator = true;
        build.run();

        td.verify(cdvBuild({
          platforms: DEFAULT_PLATFORMS,
          options: DEFAULT_OPTS.concat('--emulator')
        }));
      });
    });

    context('when false', function() {
      it('passes --emulator', function() {
        build.isEmulator = false;
        build.run();

        td.verify(cdvBuild({
          platforms: DEFAULT_PLATFORMS,
          options: DEFAULT_OPTS.concat('--device')
        }));
      });
    });
  });

  describe('buildConfig', function() {
    var DEFAULT_PLATFORMS = ['ios'];
    var DEFAULT_OPTS = ['--debug', '--emulator'];

    context('when not passed', function() {
      it('does not pass buildConfig', function() {
        build.run();

        td.verify(cdvBuild({
          platforms: DEFAULT_PLATFORMS,
          options: DEFAULT_OPTS
        }));
      });
    });

    context('when passed', function() {
      it('passes --buildConfig', function() {
        build.buildConfig = 'foo';
        build.run();

        td.verify(cdvBuild({
          platforms: DEFAULT_PLATFORMS,
          options: DEFAULT_OPTS.concat('--buildConfig=foo')
        }));
      });
    });
  });

  describe('platformOpts', function() {
    var DEFAULT_PLATFORMS = ['ios'];
    var DEFAULT_OPTS = ['--debug', '--emulator'];

    context('when not passed', function() {
      it('does not pass platformOpts', function() {
        build.run();

        td.verify(cdvBuild({
          platforms: DEFAULT_PLATFORMS,
          options: DEFAULT_OPTS
        }));
      });
    });

    context('when key values are undefined', function() {
      it('does not pass platformOpts', function() {

      });
    });

    context('when key values are defined', function() {
      it('does not pass platformOpts', function() {

      });
    });
  });

  it('sets device flag when passed', function() {
    build.isEmulator = false;
    build.run();

    td.verify(cdvBuild({
      platforms: ['ios'],
      options: ['--debug', '--device']
    }));
  });
});
