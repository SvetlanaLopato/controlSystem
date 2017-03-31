const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './index.js',
        vendor: './vendor.js',
    },
    output: {
        path: path.join(__dirname, 'public/dist'),
        publicPath: '/',
        filename: '[name].bundle.js',
    },
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
                presets: ['es2015', 'react', 'stage-0']
            }
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }, {
            test: /\.png$/,
            loader: "url-loader?limit=100000"
        }, {
            test: /\.less$/,
            loader: "less-loader!style-loader!css-loader"
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './index.html' }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', minChuncks: 2, }),
    ],
};
