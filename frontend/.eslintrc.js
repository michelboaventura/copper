module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: 'eslint:recommended',
  env: {
    browser: true
  },
  rules: {
    'no-console': 0,
  },
  "globals": {
    "$": true,
    "d3": true,
    "gViz": true
  }
};
