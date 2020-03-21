/* eslint-disable import/no-extraneous-dependencies, import/prefer-default-export */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const commonChunks = [];

module.exports = [
  new HtmlWebpackPlugin({
    template: 'views/index.html',
    filename: '../views/index.html',
    inject: true,
    // chunks: [],
    alwaysWriteToDisk: true,
  }),
  new HtmlWebpackPlugin({
    template: 'views/error.html',
    filename: '../views/error.html',
    inject: true,
    // chunks: [],
    alwaysWriteToDisk: true,
  }),
  new HtmlWebpackPlugin({
    template: 'views/document/params.html',
    filename: '../views/document/params.html',
    inject: true,
    chunks: commonChunks.concat(['login']),
    alwaysWriteToDisk: true,
  }),
  new HtmlWebpackHarddiskPlugin({
    // outputPath: path.resolve(__dirname, '../server/views/prod'),
  }),
];
