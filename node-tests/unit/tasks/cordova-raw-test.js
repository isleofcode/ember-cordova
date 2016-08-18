'use strict';

const RawTask       = require('../../../lib/tasks/cordova-raw');
const td            = require('testdouble');
const expect        = require('../../helpers/expect');
const cordovaPath   = require('../../../lib/utils/cordova-path');
const mockProject   = require('../../fixtures/ember-cordova-mock/project');
const Promise       = require('ember-cli/lib/ext/promise');
const cordovaProj   = require('cordova-lib').cordova;

describe('Cordova Raw Task', () => {
  const setupTask = function() {
    return new RawTask({
      rawApi: 'platform',
      project: mockProject.project
    });
  };

  afterEach(() => {
    td.reset();
  });

  it('attempts to run a raw cordova call', (done) => {
    td.replace(cordovaProj.raw, 'platform', function() {
      done();
    });

    let raw = setupTask();
    return raw.run();
  });

  describe('with a mock function', function() {
    let chdirDouble;

    beforeEach(function() {
      chdirDouble = td.replace(process, 'chdir');

      td.replace(RawTask.prototype, 'cordovaRawPromise', function() {
        return Promise.resolve();
      });
    });

    it('changes to cordova dir', () => {
      var cdvPath = cordovaPath(mockProject.project);
      let raw = setupTask();

      return raw.run().then(function() {
        td.verify(chdirDouble(cdvPath));
      });
    });

    it('changes back to ember dir on completion', () => {
      var emberPath = process.cwd();
      let raw = setupTask();

      return expect(
        raw.run().then(function() {
          var args = td.explain(chdirDouble).calls[1].args[0];
          return args
        })
      ).to.eventually.equal(emberPath);
    });
  });
});
