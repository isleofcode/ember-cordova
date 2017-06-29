'use strict';

module.exports = {
  'cordova:build'                   : require('./build'),
  'cordova:init'                    : require('./init'),
  'cordova:open'                    : require('./open'),
  'cordova:platform'                : require('./platform'),
  'cordova:plugin'                  : require('./plugin'),
  'cordova:prepare'                 : require('./prepare'),
  'cordova:proxy'                   : require('./proxy'),
  'cordova:serve'                   : require('./serve'),
  'cordova:make-icons'              : require('./make-icons'),
  'cordova:make-splashes'           : require('./make-splashes'),
  'cordova'                         : require('./cordova')
};
