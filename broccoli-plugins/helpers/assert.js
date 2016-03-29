module.exports = function assert(message, test) {
  if (!test) {
    chalk.red(message);
    process.exit();
  }
};
