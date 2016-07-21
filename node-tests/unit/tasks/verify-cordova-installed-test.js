'use strict';

const td            = require('testdouble');
const childProcess  = require('child_process');
const VerifyTask    = require('../../../lib/tasks/verify-cordova-installed');

describe('Verify Cordova Installed Task', () => {
  let execDouble, verifyCmd;

  beforeEach(() => {
    execDouble = td.replace(childProcess, 'execSync');

    verifyCmd = new VerifyTask({
      command: 'foo',
      options: {}
    });
  });

  afterEach(() => {
    td.reset();
  });

  it('attempts to exec cmd', () => {
    const expected = 'command -v cordova >/dev/null && ' +
      '{ echo >&1 \'command found\'; }';

    verifyCmd.run();
    td.verify(execDouble(expected));
  });
});
