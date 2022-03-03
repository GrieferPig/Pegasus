const path = require('path');
const {VueLoaderPlugin} = require('vue-loader');

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
                            name: '../../dist/assets/[hash].ext', //wtf
                            publicPath: 'dist'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    entry: {
        "bundle": ["./src/vue.js"],
        "main": ["./src/electron.js"]
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, 'dist'),
    },
    mode: "development",
    target: "electron-renderer"
}