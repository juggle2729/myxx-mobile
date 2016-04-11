const path = require('path');
const vue = require('vue-loader');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
        alias: {
            'style': __dirname + '/src/styles/'
        }
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
            test: /\.scss$/,
            loader: 'style!css!autoprefixer?{browsers:["ios >= 7", "android >= 4.1"]}!pxtorem?root=75&threshold=1!sass?outputStyle=expanded'
        }, {
            test: /\.(ttf|eot|svg|woff?)(\?[a-z0-9]+)?$/,
            loader: 'file-loader?name=fonts/[name].[ext]'
        }]
    },
    vue: {
        loaders: {
            sass: 'style!css!autoprefixer?{browsers:["ios >= 7", "android >= 4.1"]}!pxtorem?root=75&threshold=1!sass?outputStyle=expanded'
        }
    },
    babel: {
        presets: ['es2015'],
        plugins: [  // tree-shaking
            'transform-es2015-template-literals',
            'transform-es2015-literals',
            'transform-es2015-function-name',
            'transform-es2015-arrow-functions',
            'transform-es2015-block-scoped-functions',
            'transform-es2015-classes',
            'transform-es2015-object-super',
            'transform-es2015-shorthand-properties',
            'transform-es2015-computed-properties',
            'transform-es2015-for-of',
            'transform-es2015-sticky-regex',
            'transform-es2015-unicode-regex',
            'check-es2015-constants',
            'transform-es2015-spread',
            'transform-es2015-parameters',
            'transform-es2015-destructuring',
            'transform-es2015-block-scoping',
            'transform-es2015-typeof-symbol',
            ['transform-regenerator', { async: false, asyncGenerators: false }]]
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
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {collapseWhitespace: true, minifyCSS: true},
            inject: true,
            hash: true
        })
    ]
} else {
    module.exports.plugins = [
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: true
        })
    ];
    module.exports.devtool = '#source-map';
}
