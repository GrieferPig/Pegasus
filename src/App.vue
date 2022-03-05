<template>
  <v-app>
    <v-main>
      <HelloWorld/>
      <v-img src="./assets/lmfao.jpg" alt="LMFAO"/>
    </v-main>
  </v-app>
</template>

<script>
import lmfao from './assets/lmfao.jpg'
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
