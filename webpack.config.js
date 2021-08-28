const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
      'bundle.js': './src/js/main.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Space Eventers',
      template: 'src/index.html'
    }),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};