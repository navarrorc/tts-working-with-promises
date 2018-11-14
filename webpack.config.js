module.exports = {
  entry: {
    myApp: "./src/app/main.js"
  },
  output: {
    path: __dirname + "/docs/dist",
    filename: "bundle.js"
  },
  mode: "development",
  watch: true
};
