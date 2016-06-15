'use strict';

const td            = require('testdouble');
const fs            = require('fs');
const path          = require('path');
const expect        = require('../../helpers/expect');
const VerifyTask    = require('../../../lib/tasks/verify-dist');
const assert        = require('chai').assert;

const mockProject   = require('../../fixtures/ember-cordova-mock/project');

describe('Verify Dist Task', () => {
  let verify;

  beforeEach(() => {
    verify = new VerifyTask(mockProject);
  });

  afterEach(() => {
    td.reset();
  });

  it('resolves if dist exists', () => {
   td.replace(fs, 'existsSync', () => {
     return true;
   });

   expect(verify.run()).to.be.fulfilled;
  });

  it('creates dist if it does not exist', () => {
    td.replace(fs, 'mkdirSync');

    td.replace(fs, 'existsSync', () => {
      return false;
    });

    verify.run();

    const expectedPath = path.resolve(__dirname, '..', '..', 'fixtures', 'ember-cordova-mock', 'dist');
    td.verify(fs.mkdirSync(expectedPath));
  });
});
