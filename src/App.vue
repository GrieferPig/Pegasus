<template>
  <v-app>
    <v-main>
      <HelloWorld/>
      <img src="./assets/lmfao.jpg" alt="LMFAO">
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
}
</script>
