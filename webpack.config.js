const path = require('path');
const vue = require('vue-loader');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        filename: '[name].js',
        chunkFilename: '[name].bundle.js',
        publicPath: '/',
        path: path.resolve(process.cwd(), 'build')
    },
    resolve: {
        extensions: ['', '.js'],
        modulesDirectories: [
            'components',
            'mixins',
            'node_modules'
        ]
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.jsx?$/,
            // excluding some local linked packages.
            // for normal use cases only node_modules is needed.
            exclude: [
                /node_modules|vue\/src|vue-router\/|vue-loader\/|vue-hot-reload-api\//
            ],
            loader: 'babel'
        }, {
            test: /\.(ttf|eot|svg|woff?)(\?[a-z0-9]+)?$/,
            loader: 'file-loader?name=fonts/[name].[ext]'
        }]
    },
    vue: {
        loaders: {
            // sass: 'style!css!autoprefixer?{browsers:["ios >= 7", "android >= 4.1"]}!pxtorem?root=75&threshold=1!sass?outputStyle=expanded'
            sass: ExtractTextPlugin.extract(
                    'style-loader',
                    'css!autoprefixer?{browsers:["ios >= 8", "android >= 4.1"]}!pxtorem?root=75&threshold=1!sass?outputStyle=expanded'                    
                ) 
        }
    },
    babel: { // consider tree-shaking ?
        presets: ['es2015']
    }
}

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
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
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin("[name].css"),
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {collapseWhitespace: true, minifyCSS: true},
            inject: true,
            hash: true
        })
    ]
} else {
    module.exports.plugins = [
        new ExtractTextPlugin("[name].css"),
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: true
        })
    ];
    module.exports.devtool = '#source-map';
}
