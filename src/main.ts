import {createApp} from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import {loadFonts} from './plugins/webfontloader'

import {library} from '@fortawesome/fontawesome-svg-core'
import {faBars, faMoon, faSun, faXmark} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

library.add(faBars, faSun, faMoon, faXmark)

createApp(App)
    .use(vuetify).component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')

loadFonts()

