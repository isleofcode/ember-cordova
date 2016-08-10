'use strict';

const td            = require('testdouble');
const expect        = require('../../helpers/expect');
const Promise       = require('ember-cli/lib/ext/promise');
const cordovaPath   = require('../../../lib/utils/cordova-path');
const mockProject   = require('../../fixtures/ember-cordova-mock/project');

describe('Cordova Run Util', () => {
  let cdvPromise, chdirDouble;

  beforeEach(() => {
    cdvPromise = function() {
      return Promise.resolve();
    }

    chdirDouble = td.replace(process, 'chdir');

  });

  afterEach(() => {
    td.reset();
  });

  it('changes to cordova dir', () => {
    var cdvPath = cordovaPath(mockProject.project);

    var cordovaRun = require('../../../lib/utils/cordova-run');
    cordovaRun(cdvPromise, mockProject.project, []);

    td.verify(chdirDouble(cdvPath));
  });

  it('runs the passed function', () => {
    var cordovaRun = require('../../../lib/utils/cordova-run');

    var promiseDouble = td.function();
    cordovaRun(promiseDouble, mockProject.project, []);
    td.verify(promiseDouble());
  });

  it('changes back to ember dir on completion', () => {
    var emberPath = process.cwd();

    var cordovaRun = require('../../../lib/utils/cordova-run');
    return expect(
      cordovaRun(cdvPromise, mockProject.project, []).then(function() {
        var args = td.explain(chdirDouble).calls[1].args[0];
        return args
      })
    ).to.eventually.equal(emberPath);
  });
});
