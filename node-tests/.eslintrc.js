module.exports = {
  'parserOptions': {
    'ecmaVersion': 6
  },

  'env': {
    'browser': false,
    'node': true,
    'mocha': true
  },

  'rules': {
    // JSHint "expr", disabled due to chai expect assertions
    'no-unused-expressions': 0
  }
};
