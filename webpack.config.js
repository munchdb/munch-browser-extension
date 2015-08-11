var path = require('path')
var webpack = require('webpack')

var tmpPath = path.join(__dirname, 'tmp/')

module.exports = {
  devtool: 'source-map',
  entry: [
    'babel/polyfill',
    './src/extension'
  ],
  output: {
    path: tmpPath,
    filename: 'munchdb.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader'
        ]
      }
    ]
  }
}
