'use strict';

const td             = require('testdouble');
const BashTask       = require('../../../lib/tasks/bash');
const EmberBuildTask = require('../../../lib/tasks/ember-build');

const mockProject    = require('../../fixtures/ember-cordova-mock/project');
const isObject       = td.matchers.isA(Object);

describe('Ember Build Task', () => {
  let bashDouble, build;

  beforeEach(() => {
    bashDouble = td.replace(BashTask.prototype, 'runCommand');

    build = new EmberBuildTask(mockProject);
  });

  afterEach(() => {
    td.reset();
  });

  it('generates ember build command with EMBER_CORDOVA flag', () => {
    build.run();

    td.verify(bashDouble('EMBER_CORDOVA=true ember build --environment development', isObject));
  });

  it('sets environment', () => {
    build.env = 'production';
    build.run();

    td.verify(bashDouble('EMBER_CORDOVA=true ember build --environment production', isObject));
  });
});
