const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CommonsChunkPlugin = new require("webpack/lib/optimize/CommonsChunkPlugin");
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

module.exports = {
    entry: ['babel-polyfill', './src/main.js'],
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        path: path.resolve('build'),
        publicPath: '/'
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
        }, {
            test: /\.css$/,
            loaders: ['style', 'css']
        }]
    },
    vue: {
        loaders: {
            stylus: 'style!css!autoprefixer?{browsers:["ios >= 8", "android >= 4.1"]}!pxtorem?root=75&threshold=1!stylus'
        }
    },
    stats: {
        children: false
    }
}

let externalsPos = 0
if (process.env.NODE_ENV === 'production') {
    externalsPos = 4
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
    externalsPos = 3
    module.exports.plugins = [
        new webpack.ProvidePlugin({_: "lodash"}),
        new webpack.optimize.OccurenceOrderPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
    ];
    module.exports.devtool = 'source-map';
}

module.exports.plugins.splice(externalsPos, 0, new HtmlWebpackExternalsPlugin({
    externals: [
        {
            module: 'aliplayer',
            entry: 'https://g.alicdn.com/de/prismplayer/2.4.0/aliplayer-min.js',
            global: 'Aliplayer',
            append: true
        },
        {
            module: 'aliplayer-css',
            entry: 'https://g.alicdn.com/de/prismplayer/2.4.0/skins/default/aliplayer-min.css',
            append: true
        },
        {
            module: 'RongIMLib',
            entry: 'https://cdn.ronghub.com/RongIMLib-2.2.9.min.js',
            global: 'RongIMLib',
            append: true
        },
        {
            module: 'RongIMEmoji',
            entry: 'https://cdn.ronghub.com/RongEmoji-2.2.6.min.js',
            global: 'RongIMEmoji',
            append: true
        }
    ]
}))