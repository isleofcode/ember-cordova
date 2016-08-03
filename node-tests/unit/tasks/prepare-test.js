'use strict';

const td            = require('testdouble');
const mockProject   = require('../../fixtures/ember-cordova-mock/project');
const isObject      = td.matchers.isA(Object);

const setupPrepareTask = function() {
  const PrepareTask = require('../../../lib/tasks/prepare');
  return new PrepareTask(mockProject);
};

describe('Prepare Task', () => {
  afterEach(() => {
    td.reset();
  });

  it('runs cordova prepare', () => {
    const cdvPrepare = td.replace('cordova-lib/src/cordova/prepare');
    let prepare = setupPrepareTask();

    prepare.run();
    td.verify(cdvPrepare(isObject));
  });

  it('proxies via cordova run', () => {
    const cordovaRun = td.replace('../../../lib/utils/cordova-run');
    let prepare = setupPrepareTask();

    prepare.run();
    td.verify(cordovaRun(isObject, isObject, []));
  });
});
