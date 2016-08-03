
module.exports = function getLastCommand() {
  var args = Array.prototype.slice.call(process.argv);

  args.shift();
  args.shift();

  return 'ember ' + args.join(' ');
};
