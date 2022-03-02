import { createApp } from 'vue';
import App from './App.vue'
import './style/common.scss'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

createApp(App)
    .use(vuetify)
    .mount('#app');