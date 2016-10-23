const path = require('path');

module.exports = {
  entry: ['babel-polyfill', './index.js'],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /(node_modules)/,
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  watchOptions: {
    poll: true,
  },
  devtool: 'source-map',
};
