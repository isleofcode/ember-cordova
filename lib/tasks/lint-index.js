'use strict';

var Task            = require('./-task');
var HTMLParser      = require('htmlparser2').Parser;
var Promise         = require('rsvp').Promise;
var path            = require('path');
var fsUtils         = require('../utils/fs-utils');
var cordovaPath     = require('../utils/cordova-path');
var logger          = require('../utils/logger');

var ROOT_URL_PATTERN = /^\//;
var NEW_LINE_PATTERN = /\n/g;

module.exports = Task.extend({
  source: undefined,
  project: undefined,

  getPathAttributes: function(fileContents) {
    return new Promise(function(resolve, reject) {
      var attributes = [];
      var line = 1;

      var parser = new HTMLParser({
        ontext: function(text) {
          var matches = text.match(NEW_LINE_PATTERN);
          if (matches) { line += matches.length; }
        },
        onopentag: function(name, attrs) {
          if (attrs.src) {
            attributes.push({
              tagName: name,
              name: 'src',
              value: attrs.src,
              line: line
            });
          }

          if (attrs.href) {
            attributes.push({
              tagName: name,
              name: 'href',
              value: attrs.href,
              line: line
            });
          }
        },
        onend: function() {
          return resolve(attributes);
        }
      }, {decodeEntities: true});

      parser.end(fileContents);
    });
  },

  validate: function(attributes) {
    return attributes.filter(function(attribute) {
      return ROOT_URL_PATTERN.test(attribute.value);
    });
  },

  print: function(path, warnings) {
    if (warnings.length === 0) {
      return logger.success('0 problems');
    }

    var msg = '\n' + path + '\n';

    warnings.forEach(function(w) {
      msg += '  Line ' + w.line + '  ' +
        w.name + '-attribute contains unsupported path relative to root: ' +
        w.value + '\n';
    });

    msg += '\n' + '✖ ' + warnings.length + ' problem(s)';

    logger.warn(msg);
  },

  run: function() {
    var projectPath = cordovaPath(this.project);
    var indexPath = path.join(projectPath, this.source);

    logger.info('ember-cordova: Linting ' + indexPath + '...\n');

    return fsUtils.read(indexPath).then(function(fileContents) {
      return this.getPathAttributes(fileContents).then(function(attributes) {
        var warnings = this.validate(attributes);

        this.print(indexPath, warnings);

        return Promise.resolve(warnings);
      }.bind(this));
    }.bind(this));
  }
});
