<template>
  <div class="background">
    <v-app :theme="theme">
      <v-main class="overflow-hidden">
        <v-app-bar
            color="primary"
        >
          <template v-slot:prepend>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          </template>

          <v-app-bar-title>Photos</v-app-bar-title>

          <template v-slot:append>
            <v-btn icon="mdi-dots-vertical"></v-btn>
          </template>
        </v-app-bar>
        <v-navigation-drawer
            v-model="drawer"
            temporary
            class="navDrawerStyle">
          <template v-slot:append>
            <v-btn color="transparent" icon flat @click="toggleTheme" class="toggleThemeSwitch">
              <font-awesome-icon v-if="theme === 'darkTheme'" icon="moon"/>
              <font-awesome-icon v-if="theme === 'lightTheme'" icon="sun"/>
            </v-btn>
          </template>
          <NavDrawer/>
        </v-navigation-drawer>
        <HelloWorld/>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import NavDrawer from './components/NavDrawer.vue'
import {ref} from 'vue'
export default {
  name: 'App',
  components: {
    HelloWorld,
    NavDrawer
  },
  data() {
    return {
      appTitle: 'Title Placeholder',
      hover: false,
      drawer: false,
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
      window.electron.close()
    }
  }
}
</script>

<style>
html::-webkit-scrollbar {
  width: 0px; /** hide scroolbar**/
}

.appTitle {
  display: block;
  width: 210px;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-app-region: drag;
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

.toggleThemeSwitch{
  margin-left: 90%;
  margin-bottom: 10px;
}

.navDrawerStyle{
  background: rgb(var(--v-theme-accent));
  border-color: transparent
}
</style>