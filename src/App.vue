<template>
    <div class="background">
        <v-app :theme="theme" style="overflow: scroll !important;">
            <v-main>
                <AppBar/>
                <transition mode="out-in" name="fade">
                    <div>
                        <component :is="currentPage+'Page'"></component>
                    </div>
                </transition>
                <Footer/>
                <GlobalSnackBar/>
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
import {invoke} from '@tauri-apps/api/tauri'

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
            return this.$store.state.theme
        },
        currentPage() {
            return this.$store.state.currentPage
        }
    },
}

invoke('my_custom_command', {
    path: "C:/Users/whoami/AppData/Roaming/.minecraft/servers.dat"
}).then((msg) => console.log(msg))
</script>

<style>
::-webkit-scrollbar {
    display: none; /* hide all the nasty scrollbar */
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