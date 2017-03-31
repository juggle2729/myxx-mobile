const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CommonsChunkPlugin = new require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
    entry: './src/main.js',
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        path: path.resolve('build'),
        publicPath: '/static/mobile/'
    },
    resolve: {
        extensions: ['', '.js'],
        modulesDirectories: [
            'vue',
            'mixin',
            'node_modules'
        ],
        alias: {
            'style': path.resolve('src/style')
        }
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.jsx?$/,
            loader: 'babel',
            exclude: /node_modules/
        }]
    },
    vue: {
        loaders: {
            stylus: 'style!css!autoprefixer?{browsers:["ios >= 8", "android >= 4.1"]}!pxtorem?root=75&threshold=1!stylus'
        }
    },
    babel: { // consider tree-shaking ?
        presets: ['es2015', 'stage-2']
    },
    stats: {
      children: false
    }
}

if (process.env.NODE_ENV === 'production') {
    module.exports.vue.loaders.stylus = ExtractTextPlugin.extract('style', 'css!autoprefixer?{browsers:["ios >= 8", "android >= 4.1"]}!pxtorem?root=75&threshold=1!stylus')
    module.exports.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.ProvidePlugin({_: "lodash"}),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                warnings: false,
                drop_console: true
            },
            output: {
                comments: false
            }
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {collapseWhitespace: true, minifyCSS: true},
            hash: true
        }),
        new ExtractTextPlugin("style.css"),
        new CommonsChunkPlugin("commons.chunk.js")
    ];
} else {
    module.exports.plugins = [
        new webpack.ProvidePlugin({_: "lodash"}),
        new webpack.optimize.OccurenceOrderPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ];
    module.exports.devtool = 'source-map';
}