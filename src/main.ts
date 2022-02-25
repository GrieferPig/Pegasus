// @ts-nocheck
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
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

loadFonts()
library.add(faBars)

createApp(App)
  .use(vuetify).component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
