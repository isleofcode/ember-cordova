var EmberCordovaError = function(content) {
  var message = content.message ? content.message : content;
  var stack = content.stack ? content.stack : (new Error()).stack;

  this.name = 'EmberCordovaError';
  this.message = 'EmberCordovaError: ' + message;
  this.stack = stack.substr(stack.indexOf('\n') + 1);
};

EmberCordovaError.prototype = Object.create(Error.prototype);
EmberCordovaError.constructor = EmberCordovaError;

module.exports = EmberCordovaError;
