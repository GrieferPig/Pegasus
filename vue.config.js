module.exports = {
  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		},
      build: {
          assetsPublicPath: './',
          assetsSubDirectory: 'assets'
      },
      electronBuilder: {
          preload : 'dist/preload.js',
      }
  },
    devServer: {
        disableHostCheck: true
    }
}
