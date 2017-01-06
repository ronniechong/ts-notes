'use strict'

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

var options = {
  watch: true,
  cache: true,
  entry: {
    app: './src/app'
  },
  output: {
    filename: 'js/[name].js',
    path: path.join(__dirname, 'build/'),
		publicPath: '/build/'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.ts', '.tsx', '.js', '.jsx', '.scss']
  },
  module: {
    loaders: [{
      test: /\.tsx?$/,
      loader: 'babel-loader!ts-loader'
    },
    {
      test: /\.scss$/,
      loader:  ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
    }],
    noParse: []
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('css/main.css',{
      allChunks: true
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 1337,
      server: { baseDir: ['./'] }
    })
  ]
};

module.exports = options;
