import { createStore, Store } from "vuex";
import { writeConf } from '../utils/SettingMgr'

let last_timeout: NodeJS.Timeout;

export function create(conf_value: SettingStructure.RootObject) {
    return createStore({
        state() {
            return {
                conf: conf_value,

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
            writeConfInVuex(store, conf: SettingStructure.RootObject) {
                store.conf = conf
                writeConf(conf)
                // console.log("vuex: writeConf: Wrote")
            }
        }
    })
}