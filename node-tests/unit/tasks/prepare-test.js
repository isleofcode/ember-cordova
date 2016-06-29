'use strict';

const td            = require('testdouble');
const BashTask      = require('../../../lib/tasks/bash');
const PrepareTask   = require('../../../lib/tasks/prepare');

const mockProject   = require('../../fixtures/ember-cordova-mock/project');
const isObject      = td.matchers.isA(Object);

describe('Prepare Task', () => {
  let bashDouble, prepare;

  beforeEach(() => {
    bashDouble = td.replace(BashTask.prototype, 'runCommand');

    prepare = new PrepareTask(mockProject);
  });

  afterEach(() => {
    td.reset();
  });

  it('runs cordova prepare', () => {
    prepare.run();
    td.verify(bashDouble('cordova prepare', isObject));
  });
});
