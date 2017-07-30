var path = require('path');

module.exports = function(env) {
  const deployType = (env && env.heroku) ? 'heroku' : 'local'
  const appType = env && env.appType

  console.log(path.resolve(__dirname, `src/config/${appType}/${deployType}`));
  return {
    entry: './src/client/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [/node_modules/],
          use: [{
            loader: 'babel-loader',
            options: { presets: ['es2015'] },
          }],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      alias: { config: path.resolve(__dirname, `src/config/${appType}/${deployType}`) },
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true
    }
  };
};
