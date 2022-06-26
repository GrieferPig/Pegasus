import {createApp} from 'vue'
import {createStore} from "vuex";
import App from './App.vue'
import vuetify from './plugins/vuetify'
import {loadFonts} from './plugins/webfontloader'

import {library} from '@fortawesome/fontawesome-svg-core'
import {faBars, faMoon, faSun, faXmark} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

library.add(faBars, faSun, faMoon, faXmark)

const store = createStore({
    state() {
        return {
            theme: 'lightTheme',
            currentPage: 'Launch'
        }
    },
    mutations: {
        toggleTheme(store) {
            store.theme = store.theme === 'lightTheme' ? 'darkTheme' : 'lightTheme'
        },
        switchPage(store, pageName) {
            store.currentPage = pageName
        }
    }
})

createApp(App)
    .use(vuetify)
    .use(store)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')

loadFonts()

