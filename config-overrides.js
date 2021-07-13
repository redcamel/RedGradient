const { override, addBabelPlugins } = require('customize-cra')

module.exports = override(
  addBabelPlugins(
    "transform-remove-console"
  )
)
