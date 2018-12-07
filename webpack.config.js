const env = process.env.NODE_ENV;

const webpack = require('webpack');

const config = {
  mode: env || 'development',
  entry: './src/js-player-module-youtube.js',
  output: {
    path: `${__dirname}/dist`,
    filename: 'js-player-module-youtube.js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['env', {'modules': false}]
              ]
            }
          }
        ],
        exclude: /node_modules/,
      }
    ]
  }
};

module.exports = config;
