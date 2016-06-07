const path = require('path');
const vue = require('vue-loader');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        path: path.resolve('build'),
        publicPath: '/'
    },
    resolve: {
        extensions: ['', '.js'],
        modulesDirectories: [
            'components',
            'mixins',
            'node_modules'
        ],
        alias: {
            'style': __dirname + '/src/styles'
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
            sass: 'style!css!autoprefixer?{browsers:["ios >= 8", "android >= 4.1"]}!pxtorem?root=75&threshold=1!sass?outputStyle=expanded'
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
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {collapseWhitespace: true, minifyCSS: true},
            hash: true
        })
    ]
} else {
    module.exports.plugins = [
        new webpack.optimize.OccurenceOrderPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ];
    module.exports.devtool = 'source-map';
}
