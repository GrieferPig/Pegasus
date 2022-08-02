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
                <v-btn @click="testModifyConf">test me</v-btn>
                <Footer />
                <GlobalSnackBar />
            </v-main>
        </v-app>
    </div>
</template>

<script>
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
                return "default" + "DarkTheme"
            }
            return "default" + "LightTheme"
        },
        currentPage() {
            return this.$store.state.currentPage
        },
    },
    methods: {
        testModifyConf() {
            console.log("App: testModifyConf")
            if (this.conf.launcherSettings.lang === 'po-eq') {
                this.conf.launcherSettings.lang = 'zh-cn'
                return;
            }
            this.conf.launcherSettings.lang = 'po-eq'
        }
    },
    watch: {
        '$store.state.conf': {
            handler(newConf) {
                console.log("mixin: watch: conf handler")
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