var path = require('path');

// used to merge webpack configs
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');

var ngToolsWebpack = require('@ngtools/webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

module.exports = webpackMerge(commonConfig, {
    entry: {
        'main': './main.aot.ts',
        'polyfill': './polyfill.ts'
    },
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {test: /\.ts$/, loader: '@ngtools/webpack'}
        ]
    },
    bail: true,
    tslint: {
        emitErrors: true,
        failOnHint: true
    },
    plugins: [
        new ngToolsWebpack.AotPlugin({
            tsConfigPath: './tsconfig.json',
            entryModule: path.resolve(__dirname, '..') + 'src/app/app.module#AppModule'
        }),
        new ExtractTextPlugin({
            filename: "[name].[chunkhash].css"
        }),
        new UglifyJsPlugin({
            compress: {
                dead_code: true,
                unused: true,
                warnings: false,
                screw_ie8: true
            },
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            output: {
                comments: false
            },
            drop_console: true
        })
    ]
});