'use strict';

var td              = require('testdouble');

var ui              = require('../../../lib/utils/ui');
var expect          = require('../../helpers/expect');
var Promise         = require('ember-cli/lib/ext/promise');

var BuildTask       = require('../../../lib/tasks/ember-build');
var CdvBuildTask    = require('../../../lib/tasks/cordova-build');
var HookTask        = require('../../../lib/tasks/run-hook');
var PlatformTask    = require('../../../lib/tasks/validate/platform');

var mockProject     = require('../../fixtures/ember-cordova-mock/project');
var mockAnalytics   = require('../../fixtures/ember-cordova-mock/analytics');

var isAnything      = td.matchers.anything;

var setupBuild = function() {
  var BuildCmd = require('../../../lib/commands/build');

  var project = mockProject.project;
  project.config = function() {
    return {
      locationType: 'hash'
    };
  }

  var build = new BuildCmd({
    project: project,
    ui: mockProject.ui
  });
  build.analytics = mockAnalytics;

  return build;
};

describe('Build Command', function() {
  afterEach(function() {
    td.reset();
  });

  context('when locationType is hash', function() {
    var tasks;
    var cordovaPlatform;

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

      td.replace(CdvBuildTask.prototype, 'run', function() {
        cordovaPlatform = this.platform;

        tasks.push('cordova-build');
        return Promise.resolve();
      });
    }

    it('exits cleanly', function() {
      var build = setupBuild();

      return expect(function() {
        build.run({});
      }).not.to.throw(Error);
    });

    it('runs tasks in the correct order', function() {
      var build = setupBuild();

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

    it('parses cordova build opts', function() {
      var optDouble = td.replace('../../../lib/utils/parse-cordova-build-opts');
      var build = setupBuild();

      return build.run({}).then(function() {
        td.verify(optDouble(isAnything(), isAnything()));
      });
    });

    it('passes platform to cordova build task', function() {
      var passedPlatform = 'android';
      var build = setupBuild();

      return build.run({platform: passedPlatform}).then(function() {
        expect(cordovaPlatform).to.equal(passedPlatform);
      });
    });
  });

  context('when locationType is not hash', function() {
    beforeEach(function() {
      td.replace(ui, 'writeLine',  function() {
        throw new Error('Exit Called');
      });

    });

    it('throws', function() {
      var build = setupBuild();
      build.project.config = function() {
        return {
          locationType: 'auto'
        };
      };

      return expect(function() {
        build.run({});
      }).to.throw(Error);
    });
  });
});
