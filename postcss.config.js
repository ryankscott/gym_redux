// TODO: add cssnano
module.exports = {
  plugins: [
    require("precss"),
    require("postcss-import"),
    require("postcss-cssnext")
  ]
};
