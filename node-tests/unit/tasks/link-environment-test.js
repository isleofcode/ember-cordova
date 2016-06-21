'use strict';

const td            = require('testdouble');
const fs            = require('fs-extra');
const BashTask      = require('../../../lib/tasks/bash');
const LinkTask      = require('../../../lib/tasks/link-environment');
const VerifyTask    = require('../../../lib/tasks/verify-dist');

const mockProject   = require('../../fixtures/ember-cordova-mock/project');

describe('Link Environment Task', () => {
  it('runs verify dist task', () => {
    const verifyDouble = td.replace(VerifyTask.prototype, 'run');

    const linkEnv = new LinkTask(mockProject);
    linkEnv.run();

    td.verify(verifyDouble());
  });

  it('undoes prior symlink', () => {
    const linkEnv = new LinkTask(mockProject);
    linkEnv.run();

    td.replace(fs, 'removeSync', () => {
    });

    td.verify(fs.removeSync());
  });

  it('symlinks dist/ to ember-cordova/cordova/www', () => {
    const linkEnv = new LinkTask(mockProject);
    linkEnv.run();

    td.replace(fs, 'ensureSymlinkSync', () => {
      //no function here causes test to fail
    });

    td.verify(fs.ensureSymlinkSync());
  });
});
