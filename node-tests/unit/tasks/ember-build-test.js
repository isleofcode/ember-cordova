'use strict';

const td            = require('testdouble');
const BashTask      = require('../../../lib/tasks/bash');
const EmberBldTask  = require('../../../lib/tasks/ember-build');

const mockProject   = require('../../fixtures/ember-cordova-mock/project');
const isObject      = td.matchers.isA(Object);

describe('Ember Build Task', () => {
  let bashDouble, build;

  beforeEach(() => {
    bashDouble = td.replace(BashTask.prototype, 'runCommand');

    build = new EmberBldTask(mockProject);
  });

  afterEach(() => {
    td.reset();
  });

  it('generates ember build command with EMBER_CORDOVA flag', () => {
    build.run('development');

    td.verify(bashDouble('EMBER_CORDOVA=true ember build --environment development', isObject));
  });
});
