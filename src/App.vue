<template>
  <navBar title="Welcome to the world of Material Design"/>
  <div class="background">
  </div>
</template>

<script>
import navBar from './assets/navBar.vue'

export default {
  name: 'App',
  components: {
    navBar
  }
}
</script>

<style scoped>

.background {
  position: absolute;
  width: 100%;
  height: 89%;
  top: 11%;
  left: 0px;
  background: white;
  border-radius: 0 0 10px 10px;
}
</style>
