import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faMoon, faSun, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { readConf } from "./utils/SettingMgr";
import { create } from './plugins/vuex'
import { mixin } from './plugins/mixin'

library.add(faBars, faSun, faMoon, faXmark)

import { createI18n } from 'vue-i18n'
import lang from './i18n/lang'

const i18n = createI18n(lang)

readConf().then((value) => {
    let store = create(value);
    let app = createApp(App);
    app.mixin(mixin)
    app.use(vuetify)
    app.use(store)
    app.use(i18n)
    app.component('font-awesome-icon', FontAwesomeIcon)
    app.mount('#app')
    app.config.globalProperties.conf = store.state.conf as SettingStructure.RootObject

    loadFonts()
})



