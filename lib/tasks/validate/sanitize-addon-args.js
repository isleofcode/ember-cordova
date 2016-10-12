var Task            = require('../-task');
var Promise         = require('ember-cli/lib/ext/promise');
var _pullAll        = require('lodash').pullAll;
var _intersection   = require('lodash').intersection;

var addCmds = ['add', 'a'];
var rmCmds = ['remove', 'rm', 'r'];

/*
 For a given platform/plugin command, return a hash with:
   {
     action: add or remove,
     name: name of platform/plugin, e.g. ios,
     varOpts: formatted plugin vars to cordova standards
   }
*/

module.exports = Task.extend({
  rawArgs: undefined,
  api: undefined,
  varOpts: undefined,

  //cordova commands are long strings - we need to manually see if it is add/rm
  getAction: function(rawArgs) {
    console.log('checking', rawArgs);
    if (_intersection(rawArgs, addCmds).length > 0) {
      return 'add';
    } else if (_intersection(rawArgs, rmCmds).length > 0) {
      return 'remove'
    }
  },

  //rm add/remove text from arguments
  cleanupArgs: function(rawArgs) {
    var availableActions = addCmds.concat(rmCmds);
    _pullAll(rawArgs, availableActions);
    return rawArgs;
  },

  /*
    Vars are passed from ember-cli as 'VAR_NAME=VALUE'
    Cordova requires { VAR_NAME: 'VALUE' }
  */
  hashifyVars: function(opts) {
    if (opts === undefined) { return {} };

    var hashedOpts = {};
    opts.forEach(function(s) {
      var eq = s.indexOf('=');
      var key = s.substr(0, eq).toUpperCase();
      var val = s.substr(eq + 1, s.length);
      hashedOpts[key] = val;
    });

    return hashedOpts;
  },

  run: function() {
    return new Promise(function(resolve, reject) {
      var action, sanitized;
      var rawArgs = this.rawArgs;

      action = this.getAction(this.rawArgs);
      if (!action) {
        reject('Missing add or remove flag, e.g. ember cdv:' + this.api + ' add ios');
      }

      //Cooerce rawArgs/Opts to cordova spec
      rawArgs = this.cleanupArgs(rawArgs);
      var hashedOpts = this.hashifyVars(this.varOpts);

      sanitized = {
        action: action,
        name: this.rawArgs,
        varOpts: hashedOpts
      };

      resolve(sanitized);
    }.bind(this));
  }
});
