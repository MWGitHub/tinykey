const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/, loader: 'babel',
        exclude: /(node_modules)/
      }
    ]
  },
  devTool: 'source-map'
};
