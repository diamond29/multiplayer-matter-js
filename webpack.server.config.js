const path = require('path');
const baseConfig = require('./webpack.base.config');
var nodeExternals = require('webpack-node-externals');

module.exports = function(env) {
  return Object.assign(
    baseConfig(Object.assign({}, env, { appType: 'server' })),
    {
      entry: './src/server.js',
      target: 'node',
      output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'dist')
      },
      externals: [nodeExternals()],
      devtool: 'eval-source-map',
    }
  );
};
