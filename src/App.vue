<template>
  <div class="background">
    <v-app :theme="theme" style="overflow: scroll !important;">
      <v-main>
        <v-app-bar
            color="primary"
        >
          <template v-slot:prepend>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" @click="sendNot"></v-app-bar-nav-icon>
          </template>

          <v-app-bar-title class="appTitle" data-tauri-drag-region>{{ appTitle }}</v-app-bar-title>

          <template v-slot:append>
            <v-btn icon="mdi-dots-vertical"></v-btn>
          </template>
        </v-app-bar>
        <v-navigation-drawer
            v-model="drawer"
            temporaryn
            class="navDrawerStyle">
          <template v-slot:append>
            <v-divider/>
            <div style="float:right;margin-bottom: 5px;margin-right: 5px">
              <v-btn color="transparent" icon flat @click="close" class="closeWinSwitch">
                <v-icon icon="mdi-close" />
              </v-btn>
              <v-btn color="transparent" icon flat @click="toggleTheme" class="toggleThemeSwitch">
                <font-awesome-icon v-if="theme === 'darkTheme'" icon="moon"/>
                <font-awesome-icon v-if="theme === 'lightTheme'" icon="sun"/>
              </v-btn>
            </div>
          </template>
          <NavDrawer></NavDrawer>
        </v-navigation-drawer>
        <transition mode="out-in">
          <div style="overflow: scroll;">
            <component :is="currentPage"></component>
          </div>
        </transition>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import {markRaw, ref} from 'vue'
import LaunchPage from './components/LaunchPage.vue'
import ConfigPage from './components/ConfigPage.vue'
import SettingsPage from './components/SettingsPage.vue'
import VersionsPage from "./components/VersionsPage.vue";
import NavDrawer from './components/NavDrawer.vue'
import {appWindow} from "@tauri-apps/api/window";

export default {
  name: 'App',
  components: {
    LaunchPage: markRaw(LaunchPage),
    ConfigPage: markRaw(ConfigPage),
    SettingsPage: markRaw(SettingsPage),
    VersionsPage: markRaw(VersionsPage),
    NavDrawer
  },
  data() {
    return {
      appTitle: 'Launch',
      hover: false,
      drawer: false,
      currentPage: 'LaunchPage',
    }
  },
  setup() {
    const theme = ref('lightTheme')
    return {
      theme,
      toggleTheme: () => theme.value = theme.value === 'lightTheme' ? 'darkTheme' : 'lightTheme',
    }
  },methods: {
    close() {
      appWindow.close()
    },
    switchPage: function(pageName) {
      let vm = this; //copy of this
      switch (pageName) {
        case "Launch":
          vm.currentPage = LaunchPage;
          return;
        case "Configuration":
          vm.currentPage = ConfigPage;
          return;
        case "Settings":
          vm.currentPage = SettingsPage;
          return;
        case "Versions":
          vm.currentPage = VersionsPage;
          return;
        default:
          return;
      }
    }
  }
}
</script>

<style>
::-webkit-scrollbar {
  display: none; /* hide all the nasty scrollbar */
}

.appTitle {
  user-select: none;
  display: flex;
  justify-content: flex-start;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 0px !important;
}

.v-toolbar-title {
  padding: 6px 5px; /*why you need a 20px left padding*/
}



.background {
  height: 600px;
  width: 350px;
  border-radius: 10px;
  display: block;
  user-select: none;
}


.navDrawerStyle {
  background: rgb(var(--v-theme-accent));
  border-color: transparent
}

body {
  overflow: hidden
}
</style>