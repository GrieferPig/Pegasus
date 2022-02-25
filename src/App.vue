<template>
  <div class="background">
  <v-app>
    <v-main>
      <v-app-bar>
        <v-app-bar-title>
          <span>{{ appTitle }}</span>
        </v-app-bar-title>
      </v-app-bar>
      <HelloWorld/>
    </v-main>
  </v-app>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',

  components: {
    HelloWorld
  },

  data: () => ({
    return: {
      appTitle: 'alr'
    }
  }),
}
</script>

<style>
.background{
  height: 600px;
  width: 350px;
  border-radius: 10px;
  display: block;
}

#app{
  height: 600px;
  width: 350px;
  border-radius: 10px;
  display: block;
}
</style>
