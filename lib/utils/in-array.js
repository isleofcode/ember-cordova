'use strict';

module.exports = function inArray(keyArray, compArray) {
  for (var i = 0; i < keyArray.length; i++) {
    var key = keyArray[i];
    for (var n = 0; n < compArray.length; n++) {
      var item = compArray[n];
      if (item.includes(key)) {
        return true;
      }
    }
  }
  return false;
};

