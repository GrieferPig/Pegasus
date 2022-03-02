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
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'imgs/[hash].ext',
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
        path: path.resolve(__dirname, 'dist')
    },
    mode: "development",
    target: "electron-renderer"
}