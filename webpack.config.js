var path = require('path');
var vue = require('vue-loader');
var webpack = require('webpack');

module.exports = {
    entry: './src/main.js',
    output: {
        path: './static',
        publicPath: '/static/',
        filename: 'app.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
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
                path.resolve(__dirname, "src/scripts/swiper.js"),
                /node_modules|vue\/src|vue-router\/|vue-loader\/|vue-hot-reload-api\//
            ],
            loader: 'babel'
        }, {
            test: /\.scss$/,
            loader: 'style!css!autoprefixer?browsers=last 2 versions!px2rem?remUnit=75&remPrecision=8!sass?outputStyle=expanded'
        }, {
            test: /\.(ttf|eot|svg|woff?)(\?[a-z0-9]+)?$/,
            loader: 'file-loader?name=fonts/[name].[ext]'
        }]
    },
    vue: {
        loaders: {
            sass: 'style!css!autoprefixer?browsers=last 2 versions!px2rem?remUnit=75&remPrecision=8!sass?outputStyle=expanded'
        }
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime'] //
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
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ]
} else {
    module.exports.devtool = '#source-map'
}
