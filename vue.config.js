module.exports = {
  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  },
    configureWebpack: {
        module: {
            rules: [
                { test: /\.ts$/, use: 'ts-loader' }
            ],
        },

    }
}
