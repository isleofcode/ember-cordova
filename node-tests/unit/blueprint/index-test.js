'use strict';

const td            = require('testdouble');
const mockProject   = require('../../fixtures/ember-cordova-mock/project');
const CreateCordova = require('../../../lib/tasks/create-cordova-project');

describe('Blueprint Index', () => {
  let index, createDouble;

  beforeEach(function() {
    createDouble = td.replace(CreateCordova.prototype, 'run');
    index = require('../../../blueprints/ember-cordova/index');
    index.project = mockProject.project;
  });

  afterEach(function() {
    td.reset();
  });

  it('attempts to create a cordova project', function() {
    index.afterInstall({});
    td.verify(createDouble(undefined));
  });

  it('passes template path', function() {
    index.afterInstall({templatePath: 'templatePath'});
    td.verify(createDouble('templatePath'));
  });
});
