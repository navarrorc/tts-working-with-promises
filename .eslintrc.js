module.exports = {
  extends: ["eslint:recommended"],
  env: {
    es6: true,
    browser: true,
    node: true,
    commonjs: true,
    jquery: true
  },
  rules: {
    "no-console": "warn",
    "no-unused-vars": "warn"
  }
};
