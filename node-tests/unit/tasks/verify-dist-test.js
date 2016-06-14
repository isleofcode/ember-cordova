'use strict';

const td             = require('testdouble');
const fs             = require('fs');
const path           = require('path');
const expect         = require('../../helpers/expect');
const VerifyDistTask = require('../../../lib/tasks/verify-dist');
const assert = require('chai').assert;

const mockProject    = require('../../fixtures/ember-cordova-mock/project');
const isObject       = td.matchers.isA(Object);

describe('Verify Dist Task', () => {
  let verify, mkDir;

  beforeEach(() => {
    td.replace(fs, 'mkdirSync');
    verify = new VerifyDistTask(mockProject);
  });

  afterEach(() => {
    td.reset();
  });

  xit('resolves if dist exists', () => {
  });

  it('creates dist if it does not exist', () => {
    verify.run();

    const expectedPath = path.resolve(__dirname, '..', '..', 'fixtures', 'ember-cordova-mock', 'dist');
    td.verify(fs.mkdirSync(expectedPath));
  });
});
