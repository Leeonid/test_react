const path = require("path");
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./layouts/entry.js",
    output: {
        path: path.join(__dirname, "/web"),
        filename: "index.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "less-loader"
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'layouts/index.html',
        }),
    ]
};