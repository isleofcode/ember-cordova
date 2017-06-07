'use strict';
/* eslint-disable max-len */

var Command         = require('./-command');
var ProxyCommand    = require('./proxy');

var logger          = require('../utils/logger');

module.exports = Command.extend({
  name: 'cordova',
  aliases: ['cdv'],
  description: 'Deprecated',
  works: 'insideProject',

  run: function(options, rawArgs) {
    logger.warn(
      'DEPRECATION WARNING (ember-cordova): ember cdv proxy syntax has changed\n' +
      'The prior proxy command was "ember cdv $COMMAND" \n' +
      'To ease confusion this is now "ember cdv:proxy $COMMAND". No other changes are required. \n' +
      'So ember cdv run would now be ember cdv:proxy run \n \n' +
      'This is just a warning, your command has been proxied for now. The old proxy syntax will be fully deprecated on July 1 in favour of ember cdv:proxy.'
    );

    return new ProxyCommand({project: this.project}).validateAndRun(rawArgs);
  }
});
