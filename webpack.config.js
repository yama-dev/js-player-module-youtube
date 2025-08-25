const env = process.env.NODE_ENV;

const webpack = require('webpack');

const pjson = require('./package.json');

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
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `${pjson.name} v${pjson.version} | ${pjson.author} | license: ${pjson.license}`
    })
  ],
};

module.exports = config;
