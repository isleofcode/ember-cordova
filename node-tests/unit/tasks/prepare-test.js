'use strict';

const td            = require('testdouble');
const mockProject   = require('../../fixtures/ember-cordova-mock/project');
const CdvRawTask    = require('../../../lib/tasks/cordova-raw');

const setupPrepareTask = function() {
  const PrepareTask = require('../../../lib/tasks/prepare');
  return new PrepareTask(mockProject);
};

describe('Prepare Task', () => {
  afterEach(() => {
    td.reset();
  });

  it('runs cordova prepare', () => {
    let rawDouble = td.replace(CdvRawTask.prototype, 'run');
    let prepare = setupPrepareTask();
    prepare.run();

    td.verify(rawDouble());
  });
});
