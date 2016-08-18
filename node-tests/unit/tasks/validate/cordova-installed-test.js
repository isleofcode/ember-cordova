'use strict';

const td            = require('testdouble');
const childProcess  = require('child_process');

describe('Verify Cordova Installed Task', () => {
  let execDouble, verifyCmd;

  beforeEach(() => {
    execDouble = td.replace(childProcess, 'execSync');

    /* eslint-disable max-len */
    const VerifyTask = require('../../../../lib/tasks/validate/cordova-installed');
    /* eslint-enable max-len */

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
