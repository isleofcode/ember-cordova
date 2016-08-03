var fs = require('fs');
var xml2js = require('xml2js');
var Promise = require('ember-cli/lib/ext/promise');

module.exports = function parseXML(xmlPath) {
  return new Promise(function(resolve, reject) {
    var contents = fs.readFileSync(xmlPath, 'utf8');
    var parser = new xml2js.Parser();

    parser.parseString(contents, function (err, result) {
      if (err) {
        reject(err);
      }
      if (result) {
        resolve(result);
      }
    });
  });
};
