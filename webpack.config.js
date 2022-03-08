const path = require('path');
const {VueLoaderPlugin} = require('vue-loader');
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            },
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.(s?css)$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './assets/[name].[ext]',
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CopyPlugin({
            patterns: [
                {from: "./src/index.html", to: "./"},
                {from: "./src/preload.js", to: "./"}
            ]
        })
    ],
    entry: {
        "bundle": ["./src/vue.js"],
        "main": ["./src/electron.js"]
    },
    output: {
        filename: "[name].js",
        publicPath: 'auto',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: "development",
    devtool: 'inline-source-map',
    target: "electron-renderer",
    watchOptions: {
        ignored: ['./node_modules','./dist*', '.idea'],
    }
}