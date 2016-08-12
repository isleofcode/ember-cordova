'use strict';

const td            = require('testdouble');
const mockProject   = require('../../fixtures/ember-cordova-mock/project');
const CreateCordova = require('../../../lib/tasks/create-cordova-project');

describe('Blueprint Index', () => {
  afterEach(function() {
    td.reset();
  });

  it('attempts to create a cordova project', function() {
    let createDouble = td.replace(CreateCordova.prototype, 'run');
    let index = require('../../../blueprints/ember-cordova/index');
    index.project = mockProject.project;

    index.afterInstall({});

    td.verify(createDouble());
  });
});
