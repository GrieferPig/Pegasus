import { createApp } from 'vue'
import App from './App.vue'
import { loadFonts } from './plugins/webfontloader'
import {lightTheme} from './plugins/vuetify'
import {createVuetify} from 'vuetify'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'lightTheme',
        themes:{
            lightTheme
        }
    }
})

loadFonts()

createApp(App)
  .use(vuetify)
  .mount('#app')
