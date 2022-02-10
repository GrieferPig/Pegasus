<template>
  <div className="navbar"></div>
  <div className="background">
    <Label class="title">Eeyup.</Label>
    <div id="app" style="color: black">
      {{ message }}
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
.title {
  color: black;
  -webkit-app-region: drag;
}

.navbar {
  background-color: #009688;
  -webkit-app-region: no-drag;
  position: absolute;
  width: 100%;
  height: 12%;
  top: 0;
  left: 0;
  border-radius: 10px 10px 0 0;
}

.navbar:hover {
  cursor: move;
}

.background {
  position: absolute;
  width: 100%;
  height: 88%;
  top: 12%;
  left: 0px;
  background: white;
  border-radius: 10px;
}
</style>
