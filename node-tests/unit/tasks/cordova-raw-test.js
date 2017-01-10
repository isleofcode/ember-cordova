'use strict';

var RawTask         = require('../../../lib/tasks/cordova-raw');
var td              = require('testdouble');
var expect          = require('../../helpers/expect');
var cordovaPath     = require('../../../lib/utils/cordova-path');
var mockProject     = require('../../fixtures/ember-cordova-mock/project');
var Promise         = require('ember-cli/lib/ext/promise');
var cordovaLib      = require('cordova-lib');
var cordovaProj     = cordovaLib.cordova;
var events          = cordovaLib.events;
var logger          = require('cordova-common').CordovaLogger.get();

describe('Cordova Raw Task', function() {
  var setupTask = function() {
    return new RawTask({
      rawApi: 'platform',
      project: mockProject.project
    });
  };

  afterEach(function() {
    td.reset();
  });

  it('attempts to run a raw cordova call', function(done) {
    td.replace(cordovaProj.raw, 'platform', function() {
      done();
    });

    var raw = setupTask();
    return raw.run();
  });

  describe('with a mock function', function() {
    var chdirDouble;

    beforeEach(function() {
      chdirDouble = td.replace(process, 'chdir');

      td.replace(RawTask.prototype, 'cordovaRawPromise', function() {
        return Promise.resolve();
      });
    });

    it('changes to cordova dir', function() {
      var cdvPath = cordovaPath(mockProject.project);
      var raw = setupTask();

      return raw.run().then(function() {
        td.verify(chdirDouble(cdvPath));
      });
    });

    it('changes back to ember dir on compvarion', function() {
      var emberPath = process.cwd();
      var raw = setupTask();

      return expect(
        raw.run().then(function() {
          var args = td.explain(chdirDouble).calls[1].args[0];
          return args
        })
      ).to.eventually.equal(emberPath);
    });

    it('sets up Cordova logging', function() {
      td.replace(logger, 'subscribe');
      var raw = setupTask();

      return raw.run().then(function() {
        td.verify(logger.subscribe(events));
      });
    });

    it('logs verbosely when requested', function() {
      td.replace(logger, 'setLevel');
      var raw = setupTask();

      return raw.run({ verbose: true }).then(function() {
        td.verify(logger.setLevel('verbose'));
      });
    });
  });
});
