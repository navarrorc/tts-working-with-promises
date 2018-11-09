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
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-unused-vars": "warn"
  }
};
