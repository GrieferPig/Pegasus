# <center>electron-vue-vuetify-ts-webpack-template</center>
#### <center>Template of electron, vue, vuetify, typescript and webpack.</center>
***
## Why this?
IDK really. 

There's a project which I need electron and vue settled up, then I saw Vuetify is darn good and want to add it to my project, then found out that only Typescript supports some certain option of vuetify so I integrated webpack and typescript.

And for another purpose: Don't waste time on setting up environment if you can use that time to develop your app.

***Notice:*** although this seems work, it literally 'runs', so please do not use this in a production environment (and probably you won't), in case you don't want tons of errors.

## How to build?
git clone this repo, then

`cd electron-vue-vuetify-ts-webpack-template`

for npm,

`npm install`

`npm run dev`

or for yarn,

`yarn install`

`yarn dev`

Be sure to check out options in `package.json` where you can config a lot of project-specific settings.

## Run Commands
    "build": "webpack --config webpack.config.js",
    "dev": "npm run build && npm run start",
    "dist": "npm run build && electron-builder",
    "pack": "electron-builder --dir",
    "postinstall": "electron-builder install-app-deps",
    "start": "electron ."

## Nutrition Facts

"@mdi/font": "5.9.55",

"roboto-fontface": "*",

"vue-style-loader": "^4.1.3",

"vuetify": "npm:@vuetify/nightly@next",

"webfontloader": "^1.0.0"
"css-loader": "^6.6.0",

"electron": "^17.1.0",

"electron-builder": "^22.14.13",

"lodash": "^4.17.21",

"node-sass": "^7.0.1",

"sass": "^1.38.0",

"sass-loader": "^12.6.0",

"style-loader": "^3.3.1",

"svg-inline-loader": "^0.8.2",

"ts-loader": "^9.2.7",

"typescript": "^4.6.2",

"vue": "^3.2.31",

"vue-cli-plugin-vuetify": "~2.4.6",

"vue-loader": "^17.0.0",

"vue-template-compiler": "^2.6.14",

"vuetify-loader": "^2.0.0-alpha.0",

"webpack": "^5.69.1",

"webpack-cli": "^4.9.2"