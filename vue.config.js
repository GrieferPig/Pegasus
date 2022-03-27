const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
      nodeIntegration: true,
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		},
      electronBuilder: {
        preload: './src/preload.js',
        builderOptions: {
          "productName": "Pegasus",
          "copyright": "All right reserved",
          "appId": "com.grieferpig.pegasus",
          "asar": true,
          "dmg": {
            "contents": [
              {
                "x": 410,
                "y": 150,
                "type": "link",
                "path": "/Applications"
              },
              {
                "x": 130,
                "y": 150,
                "type": "file"
              }
            ]
          },
          "mac": {
            "icon": "./src/assets/icon.png"
          },
          "win": {
            "icon": "./src/assets/icon.png",
            "target": [
              {
                "target": "nsis",
                "arch": [
                  "x64"
                ]
              }
            ]
          },
          "linux": {
            "icon": "./src/assets/icon.png"
          },
          "nsis": {
            "oneClick": true,
            "allowElevation": true,
            "allowToChangeInstallationDirectory": false,
            "createDesktopShortcut": true,
            "createStartMenuShortcut": true,
            "displayLanguageSelector": false,
            "multiLanguageInstaller": true,
            "installerLanguages": [
              "en_US",
              "zh_CN"
            ],
            "warningsAsErrors": false
          }
        }
      }

  }
})
