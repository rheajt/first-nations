const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

const entries = fs.readdirSync(path.join(__dirname, './src/pages/'))
    .filter(f => f.endsWith('.tsx'))
    .map(f => f.substring(0, f.length - 4));

console.log('Entry pages: ', entries);

const htmlPlugins = entries.map((entry) => {
    return new HtmlWebpackPlugin({
        filename: `${entry}.html`,
        templateContent: `
                <html>
                  <body>
                    <div id="app"></div>
                  </body>
                </html>
              `,
        chunks: [entry],
        inject: "body"
    });
});

module.exports = {
    entry: entries.reduce((acc, cur) => {
        acc[cur] = `./src/pages/${cur}.tsx`
        return acc;
    }, {}),
    module: {
        rules: [
            // { test: /\.hbs$/, use: ['handlebars-loader'] },
            {
                test: /\.scss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 20000,
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name].[contenthash].js',
        clean: true,
        publicPath: ''
    },
    plugins: [
        ...htmlPlugins,
        new HtmlInlineScriptPlugin(),
        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: ['./dist/*.html']
                },
                onEnd: {
                    copy: [
                        { source: './build/*.html', destination: 'dist/' },
                    ],
                    delete: ['./build/'],
                },
            },
        }),
    ],
    devServer: {
        hot: true,
        // watchFiles: ['src/pages/**/*.'],
    },
};
