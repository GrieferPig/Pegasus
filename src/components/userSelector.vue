<template>
  <div class="backCard"></div>
</template>

<script>
export default {
  name: "userSelector"
}
</script>

<style scoped>
.backCard{
  position: relative;
  margin:0 auto;
  top: 20px;
  height: 140px;
  width: 80%;
  background: rgb( 255, 255, 255 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 10.5px );
  -webkit-backdrop-filter: blur( 10.5px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
}
</style>
