// webpack.config.js
const path = require('path');
const miniCss = require('mini-css-extract-plugin');
const minify = require('optimize-css-assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './index.js',
    mode: 'production',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
              test: /\.scss$/,
              use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
              })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css')
    ]
};