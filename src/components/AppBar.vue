<template>
    <v-app-bar color="primary">
        <template v-slot:prepend>
            <v-app-bar-nav-icon @click="isDrawerOpened = !isDrawerOpened"></v-app-bar-nav-icon>
        </template>
        <v-toolbar-title data-tauri-drag-region>
            {{ this.pageName }}
        </v-toolbar-title>
        <v-btn icon="mdi-dots-vertical"></v-btn>
    </v-app-bar>
    <v-navigation-drawer
            v-model="isDrawerOpened"
            class="navDrawerStyle"
            temporary>
        <template v-slot:append>
            <v-divider/>
            <div style="float:right;margin-bottom: 5px;margin-right: 5px">
                <v-btn class="closeWinSwitch" color="transparent" flat icon @click="close">
                    <v-icon icon="mdi-close"/>
                </v-btn>
                <v-btn class="toggleThemeSwitch" color="transparent" flat icon @click="toggleTheme">
                    <font-awesome-icon v-if="theme === 'darkTheme'" icon="moon"/>
                    <font-awesome-icon v-else icon="sun"/>
                </v-btn>
            </div>
        </template>
        <NavDrawer @onNavClick="updatePage"/>
    </v-navigation-drawer>
</template>

<script>
import NavDrawer from "./NavDrawer.vue";
import {appWindow} from "@tauri-apps/api/window";

export default {
    name: "AppBar",
    components: {
        NavDrawer
    },
    emits: ["update:theme", "update:pageName"],
    props: ['theme', 'pageName'],
    data() {
        let isDrawerOpened = false;
        return {
            isDrawerOpened,
        }
    },
    methods: {
        updatePage(pageName) {
            this.$emit("update:pageName", pageName)
        },
        toggleTheme() {
            let _theme =
                    this.theme === 'lightTheme' ? 'darkTheme' : 'lightTheme'
            this.$emit('update:theme', _theme)
        },
        close() {
            appWindow.close()
        },
    },
}
</script>

<style scoped>
NavDrawer {
    border-color: transparent;
}
</style>