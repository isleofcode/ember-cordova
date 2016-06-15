'use strict';

const td            = require('testdouble');
const Promise       = require('ember-cli/lib/ext/promise');

const LinkCmd       = require('../../../lib/commands/prepare');
const LinkTask      = require('../../../lib/tasks/prepare');

const mockProject   = require('../../fixtures/ember-cordova-mock/project');

describe('Link Command', () => {
  beforeEach(() => {
    LinkCmd.ui = mockProject.ui;
    LinkCmd.project = mockProject.project;
  });

  afterEach(() => {
    td.reset();
  });

  it('runs Link Task', () => {
    let linkDouble = td.replace(LinkTask.prototype, 'run');
    LinkCmd.run();
    td.verify(linkDouble());
  });
});
