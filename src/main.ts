import {createApp} from 'vue'
import {createStore} from "vuex";
import App from './App.vue'
import vuetify from './plugins/vuetify'
import {loadFonts} from './plugins/webfontloader'

import {library} from '@fortawesome/fontawesome-svg-core'
import {faBars, faMoon, faSun, faXmark} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {readConf, writeConf} from "./utils/SettingMgr";

library.add(faBars, faSun, faMoon, faXmark)

let last_timeout: NodeJS.Timeout;

readConf().then((value) => {
    console.log("INFO: conf loaded")
    const store = createStore({
        state() {
            return {
                conf: value,

                currentPage: 'Launch',
                currentPageTitle: 'Launch',

                snackbar_on: false,
                snackbar_timeout: 2000,
                snackbar_text: "",
                snackbar_subtext: undefined,
                snackbar_close_text: "Close",
            }
        },
        mutations: {
            toggleDarkMode(store) {
                store.conf.launcherSettings.darkMode = !store.conf.launcherSettings.darkMode
            },
            switchPage(store, pageid) {
                store.currentPage = pageid
            },
            switchPageName(store, pageName) {
                store.currentPageTitle = pageName
            },
            snackbarTimeout(store, timeout) {
                store.snackbar_timeout = timeout
            },
            snackbarText(store, text) {
                store.snackbar_text = text
            },
            snackbarCloseText(store, closeText) {
                store.snackbar_close_text = closeText
            },
            snackbarSubText(store, subText) {
                store.snackbar_subtext = subText
            },
            snackbarOn(store) {
                if (last_timeout) {
                    clearTimeout(last_timeout)
                    store.snackbar_on = false;
                }
                store.snackbar_on = true;
                last_timeout = setTimeout(() => {
                    store.snackbar_on = false;
                }, store.snackbar_timeout)
            },
            closeSnackBar(store) {
                if (last_timeout) {
                    clearTimeout(last_timeout)
                    store.snackbar_on = false;
                }
            },
            writeConf(store, conf: SettingStructure.RootObject) {
                store.conf = conf
                writeConf(conf)
            }
        }
    })

    const mixin = {
        methods: {
            showSnackBar(timeout: Number, text: string, close_text: string, subtext?: string) {
                this.$store.commit('snackbarTimeout', timeout)
                this.$store.commit('snackbarText', text)
                this.$store.commit('snackbarCloseText', close_text)
                this.$store.commit('snackbarSubText', subtext)
                this.$store.commit('snackbarOn')
            }
        }
    }

    createApp(App)
        .mixin(mixin)
        .use(vuetify)
        .use(store)
        .component('font-awesome-icon', FontAwesomeIcon)
        .mount('#app')

    loadFonts()
})



