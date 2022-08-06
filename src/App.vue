<template>
    <div class="background">
        <v-app :theme="theme" style="overflow: scroll !important;">
            <v-main>
                <AppBar />
                <transition mode="out-in" name="fade">
                    <div>
                        <component :is="currentPage + 'Page'"></component>
                    </div>
                </transition>
                <!-- <v-btn @click="testModifyConf">test me</v-btn> -->
                <Footer />
                <GlobalSnackBar />
                <v-btn @click='toggleLang'>toggle lang</v-btn>
            </v-main>
        </v-app>
    </div>
</template>

<script lang="ts">
import LaunchPage from './components/LaunchPage.vue'
import ConfigurationPage from './components/ConfigurationPage.vue'
import SettingsPage from './components/SettingsPage.vue'
import VersionsPage from "./components/VersionsPage.vue";
import ServerListPage from "./components/ServerListPage.vue";

import AppBar from "./components/misc/AppBar.vue"
import Footer from "./components/misc/Footer.vue"
import GlobalSnackBar from "./components/misc/GlobalSnackBar.vue";

export default {
    name: 'App',
    components: {
        Footer,
        LaunchPage,
        ConfigurationPage,
        ServerListPage,
        SettingsPage,
        VersionsPage,
        AppBar,
        GlobalSnackBar,
    },
    computed: {
        theme() {
            if (this.$store.state.conf.launcherSettings.darkMode) {
                return this.$store.state.conf.launcherSettings.theme + "DarkTheme"
            }
            return this.$store.state.conf.launcherSettings.theme + "LightTheme"
        },
        currentPage(): String {
            return this.$store.state.currentPage
        },
    },
    methods: {
        toggleLang() {
            if (this.$i18n.locale === "zhHans") {
                this.$i18n.locale = "en"
                return;
            }
            this.$i18n.locale = "zhHans"
        }
    },
    watch: {
        '$store.state.conf': {
            handler(newConf: SettingStructure.RootObject) {
                // sconsole.log("mixin: watch: conf handler")
                this.writeConf(newConf)
            },
            deep: true
        }
    }
}
</script>

<style>
::-webkit-scrollbar {
    display: none;
    /* hide all the nasty scrollbar */
}

.background {
    height: 600px;
    width: 350px;
    border-radius: 10px;
    display: block;
    user-select: none;
}

body {
    overflow: hidden
}

.v-toolbar-title__placeholder {
    pointer-events: none;
}
</style>