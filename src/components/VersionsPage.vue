<template>
<h1>Versions</h1>
  <ul id="example-1">
    <li v-for="game in gameList">
      {{ game }}
    </li>
  </ul>
</template>

<script>
let gameList = window.electron.getGameList()
export default {
  name: "VersionsPage",
  data(){
    return {
      gameList
    }
  }
}
</script>

<style scoped>

</style>