<template>
    <v-app-bar color="primary">
        <template v-slot:prepend>
            <v-app-bar-nav-icon @click="isDrawerOpened = !isDrawerOpened"></v-app-bar-nav-icon>
        </template>
        <v-toolbar-title data-tauri-drag-region>
            {{ currentPageName }}
        </v-toolbar-title>
        <v-btn icon="mdi-dots-vertical"></v-btn>
    </v-app-bar>
    <NavDrawer :is-drawer-opened="isDrawerOpened"/>
</template>

<script>
import NavDrawer from "./NavDrawer.vue";

export default {
    name: "AppBar",
    components: {
        NavDrawer
    },
    data() {
        return {
            isDrawerOpened: false,
        }
    },
    computed: {
        currentPage() {
            return this.$store.state.currentPage
        },
        currentPageName() {
            return this.$store.state.currentPageTitle
        }
    }
}
</script>

<style scoped>
NavDrawer {
    border-color: transparent;
}
</style>