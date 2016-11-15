var fs              = require('fs');
var RSVP            = require('rsvp')

var denodeify       = RSVP.denodeify
var fsReadFile      = denodeify(fs.readFile)
var fsWriteFile     = denodeify(fs.writeFile);

module.exports = {
  read: function() {
    return fsReadFile.apply(this, arguments);
  },

  write: function() {
    return fsWriteFile.apply(this, arguments);
  }
}
