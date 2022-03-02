<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props:{
    msg: String
  }
}
</script>

<style scoped lang="scss">
$nav-color: #F90;
h1 {
  color: $nav-color
}

.hello-world{
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>