<template>
  <div class="background">
    <v-app :theme="theme">
      <v-main class="overflow-hidden">
        <v-app-bar color="primary" dense flat outlined>
          <v-app-bar-nav-icon
              color="primary" depressed icon @click.stop="drawer = !drawer">
            <font-awesome-icon icon="bars"/>
          </v-app-bar-nav-icon>
          <v-app-bar-title><span class="appTitle"> {{ appTitle }} </span></v-app-bar-title>
          <v-btn icon color="transparent" @click="close">
            <v-icon>mdi-window-close</v-icon>
          </v-btn>
        </v-app-bar>
        <v-navigation-drawer
            v-model="drawer"
            temporary
            class="navDrawerStyle">
          <v-list-item
              prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg"
              title="Place Holder"
          ></v-list-item>
          <v-divider></v-divider>
          <v-list color="transparent" density="compact">
            <v-list-item  v-for="(item, i) in items"
                          :key="i"
                          :value="item">
              <v-list-item-avatar left>
                <v-icon :icon="item.icon"></v-icon>
              </v-list-item-avatar>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item>
          </v-list>
          <v-btn color="transparent" icon flat @click="toggleTheme" class="toggleThemeSwitch">
            <font-awesome-icon v-if="theme === 'darkTheme'" icon="moon"/>
            <font-awesome-icon v-if="theme === 'lightTheme'" icon="sun"/>
          </v-btn>
        </v-navigation-drawer>
        <HelloWorld/>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import {ref} from 'vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      appTitle: 'Title Placeholder',
      hover: false,
      drawer: false,
      items: [
        {
          text: 'Test',
          icon: 'mdi-clock',
        },
      ],
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

.v-app-bar-title {
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
  position: fixed;
  margin-bottom: -850px;
  margin-left: 190px;
}

.navDrawerStyle{
  background: rgb(var(--v-theme-accent));
  border-color: transparent
}
</style>