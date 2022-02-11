<template>
  <navBar title="Launch"/>
  <div class="background">
    <userSelector/>
  </div>
</template>

<script>
import navBar from './components/navBar.vue'
import userSelector from './components/userSelector.vue'

export default {
  name: 'App',
  components: {
    navBar,
    userSelector
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
  background: linear-gradient(45deg,#FFFF00 6%,#FFA500 25%,#F14444 45%,#D53567 55%,#9A109A 94%);
  border-radius: 0 0 10px 10px;
}
</style>
