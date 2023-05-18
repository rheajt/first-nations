const webpack = require('webpack');
const path = require('path');
const GasPlugin = require('gas-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.(ts)?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'code.[contenthash].js',
        clean: true,
    },
    plugins: [
        new GasPlugin({
            autoGlobalExportsFiles: ['**/*.ts']
        }),
        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: ['./dist/*.js']
                },
                onEnd: {
                    copy: [
                        { source: './build/*.js', destination: 'dist/' },
                        { source: './appsscript.json', destination: 'dist/' },
                    ],
                    delete: ['./build/'],
                },
            },
        }),
    ],
    devServer: {
        hot: true,
        watchFiles: ['src/pages/**/*.hbs'],
    },
};
