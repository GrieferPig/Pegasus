module.exports = {
  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		},
      electronBuilder: {
          builderOptions: {
              "productName": "Pegasus Launcher",
              "copyright": "All right reserved",
              "appId": "com.grieferpig.pegasus",
              "asar": false,
              "extends": null,
              "asarUnpack":[
                  "preload.js"
              ],
              "directories": {
                  "output": "dist_electron"
              },
              "files": [
                  "dist_electron/**/*"
              ],
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
                  "icon": "src/assets/icon.ico"
              },
              "win": {
                  "icon": "src/assets/icon.ico",
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
                  "icon": "src/assets/icon.ico"
              },
              "nsis": {
                  "oneClick": true,
                  "allowElevation": true,
                  "allowToChangeInstallationDirectory": false,
                  "installerIcon":"src/assets/icon.ico",
                  "uninstallerIcon": "src/assets/icon.ico",
                  "installerHeaderIcon": "src/assets/icon.ico",
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
  },
    configureWebpack: {
        module: {
            rules: [
                { test: /\.ts$/, use: 'ts-loader' }
            ],
        },

    }
}
