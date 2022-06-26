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
                <AboutPage/>
            </v-main>
        </v-app>
    </div>
</template>

<script>
import LaunchPage from './components/LaunchPage.vue'
import ConfigurationPage from './components/ConfigurationPage.vue'
import SettingsPage from './components/SettingsPage.vue'
import VersionsPage from "./components/VersionsPage.vue";
import AboutPage from "./components/AboutPage.vue";
import AppBar from "./components/misc/AppBar.vue"

export default {
    name: 'App',
    components: {
        LaunchPage,
        ConfigurationPage,
        SettingsPage,
        VersionsPage,
        AboutPage,
        AppBar,
    },
    computed: {
        theme() {
            return this.$store.state.theme
        },
        currentPage() {
            return this.$store.state.currentPage
        }
    }
}
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