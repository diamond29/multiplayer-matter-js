const baseConfig = require('./webpack.base.config');

module.exports = function(env) {
  return baseConfig(Object.assign({}, env, { appType: 'client' }));
};
