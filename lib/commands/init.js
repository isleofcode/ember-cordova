'use strict';
/* eslint-disable max-len */

var Command         = require('./-command');
var initProject     = require('../utils/init-project');

module.exports = Command.extend({
  name: 'init',
  aliases: ['i'],

  availableOptions: [
    {
      name: 'name',
      type: String
    }, {
      name: 'cordovaid',
      type: String
    }, {
      name: 'template-path',
      type: String
    }
  ],

  run: function(options, rawArgs) {
    return initProject(options, this.project, this.ui);
  }
});
