var td              = require('testdouble');
var fs              = require('fs');
var createGitkeep   = require('../../../lib/utils/create-gitkeep');


describe('Create gitkeep util', function() {
  beforeEach(function() {
    td.reset();
  });

  it('attempts to write an empty gitkeep file', function() {
    td.replace(fs, 'writeSync');
    var openDouble = td.replace(fs, 'openSync');
    var closeDouble = td.replace(fs, 'closeSync');

    var path = 'fooPath';

    return createGitkeep(path).then(function() {
      td.verify(openDouble(path, 'w'));
      td.verify(closeDouble(td.matchers.isAnything));
    });
  });
});
