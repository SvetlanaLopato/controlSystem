const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './index.js',
        // vendor: './vendor.js',
    },
    output: {
        path: path.join(__dirname, 'public/dist'),
        publicPath: '/',
        filename: '[name].bundle.js',
    },
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true,
        stats: 'minimal',
        port: 5000,
    },
    module: {
        loaders: [{
            test: /.js?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react', 'stage-0'],
            },
        }, {
            test: /\.(jpe?g|png|gif|svg)$/,
            loader: 'url-loader?limit=1000000',
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader',
        }, {
            test: /\.less$/,
            loader: 'style-loader!css-loader!less-loader',
        }, {
            test: /\.json$/,
            loader: 'json-loader',
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './index.html' }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', minChuncks: 2, }),
        new webpack.ProvidePlugin({ React: 'react' }),
    ],
};