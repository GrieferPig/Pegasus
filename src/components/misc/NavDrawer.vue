<template>
    <v-navigation-drawer v-model="isDrawerOpened" class="navDrawerStyle" temporary="">
        <template v-slot:append>
            <v-divider />
            <v-btn-group rounded="true" style="float:right;margin-right: 5px;">
                <v-btn class="closeWinSwitch" color="transparent" flat="" icon="mdi-close" @click="close" />
                <v-btn class="toggleThemeSwitch" color="transparent" flat="" icon="" @click="toggleTheme">
                    <font-awesome-icon :icon="icon" />
                </v-btn>
            </v-btn-group>
        </template>
        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg" subtitle="Account Type"
            title="Username">
            <template v-slot:default>
                <v-btn flat="" icon="mdi-account-box-multiple" />
            </template>
        </v-list-item>
        <v-divider></v-divider>
        <v-list color="transparent" density="compact">
            <v-list-item v-for="(item, i) in items" :key="i" :active="item.selected" :value="item"
                active-color="secondary" @click="navClick(item, i)">
                <v-list-item-avatar left>
                    <v-icon :icon="item.icon"></v-icon>
                </v-list-item-avatar>
                <v-list-item-title v-text="$t(item.text)"></v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { appWindow } from "@tauri-apps/api/window";

export default {
    name: "NavDrawer",
    emits: ['onNavClick'],
    props: ['isDrawerOpened'],
    methods: {
        navClick(pageName, i) {
            for (let i = 0; i < this.items.length; i++) {
                this.items[i].selected = false
            }
            this.items[i].selected = true
            this.$store.commit('switchPage', pageName.id)
            this.$store.commit('switchPageName', pageName.text)
        },
        toggleTheme() {
            this.$store.commit("toggleDarkMode")
        },
        close() {
            appWindow.close()
        },
    },
    data() {
        return {
            items: [
                {
                    text: 'pages.Launch.title',
                    id: 'Launch',
                    icon: 'mdi-send',
                    selected: true
                },
                {
                    text: 'pages.Servers.title',
                    id: 'ServerList',
                    icon: 'mdi-server',
                    selected: false
                },
                {
                    text: 'pages.Versions.title',
                    id: 'Versions',
                    icon: 'mdi-format-list-bulleted',
                    selected: false
                },
                {
                    text: 'pages.Configuration.title',
                    id: 'Configuration',
                    icon: 'mdi-wrench',
                    selected: false
                },
                {
                    text: 'pages.Settings.title',
                    id: 'Settings',
                    icon: 'mdi-cog',
                    selected: false
                },
            ]
        }
    },
    computed: {
        icon() {
            if (this.$store.state.conf.launcherSettings.darkMode) {
                return 'moon'
            }
            return 'sun'
        }
    }
}
</script>

<style scoped>
</style>