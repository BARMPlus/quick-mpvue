var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  CONFIG_TEXT: '"开发环境"',
  NODE_ENV: '"development"',
  BASE_URL:'"https://localhost:3000/"'
})
