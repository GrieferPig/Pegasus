<template>
  <div class="navbar">
    <fa class="menu_icon" icon="bars" inverse/>
    <div class="app_title">
      {{ title }}
    </div>
    <fa class="close_icon" icon="xmark" inverse/>
    <fa class="min_icon" icon="window-minimize" inverse/>
  </div>
</template>

<script>
export default {
  name: "navBar",
  props: {
    title: String
  }
}
</script>

<style scoped>
.app_title{
  color: white;
  font-size: 20px;
  position: fixed;
  top: 20px;
  left: 60px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  right: 90px;
}

.menu_icon{
  position:fixed;
  top: 23px;
  left: 20px;
  font-size: 24px;
  -webkit-app-region: no-drag;
  transition: all 0.2s;
}

.menu_icon:hover{
  filter:drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.7));
  cursor: pointer;
  transition: all 0.1s;
}

.close_icon{
  position:fixed;
  top: 22px;
  right: 20px;
  font-size: 22px;
  -webkit-app-region: no-drag;
  transition: all 0.2s;
}

.close_icon:hover{
  filter:drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.7));
  cursor: pointer;
  transition: all 0.1s;
}

.min_icon{
  position:fixed;
  top: 19px;
  right: 50px;
  font-size: 16px;
  -webkit-app-region: no-drag;
}

.min_icon:hover{
  filter:drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.7));
  cursor: pointer;
  transition: all 0.1s;
}

.navbar {
  background-color: #009688;
  -webkit-app-region: drag;
  position: absolute;
  width: 100%;
  height: 11%;
  top: 0;
  left: 0;
  border-radius: 10px 10px 0 0;
}

.navbar:hover {
  cursor: move;
}
</style>