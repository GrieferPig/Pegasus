export const mixin = {
    methods: {
        showSnackBar(timeout: Number, text: string, close_text: string, subtext?: string) {
            this.$store.commit('snackbarTimeout', timeout)
            this.$store.commit('snackbarText', text)
            this.$store.commit('snackbarCloseText', close_text)
            this.$store.commit('snackbarSubText', subtext)
            this.$store.commit('snackbarOn')
        },
        writeConf(conf: SettingStructure.RootObject) {
            // console.log("mixin: writeconf")
            this.$store.commit('writeConfInVuex', conf)
        }
    }
}