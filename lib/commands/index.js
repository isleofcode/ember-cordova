'use strict';

module.exports = {
  'cordova:build'                   : require('./build'),
  'cordova:open'                    : require('./open'),
  'cordova:platform'                : require('./platform'),
  'cordova:plugin'                  : require('./plugin'),
  'cordova:prepare'                 : require('./prepare'),
  'cordova:link'                    : require('./link'),
  'cordova:serve'                   : require('./serve'),
  'cordova:make-icons'              : require('./make-icons'),
  'cordova'                         : require('./cordova')
};
