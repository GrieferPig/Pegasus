<template>
<h1>Versions</h1>
  <ul id="example-1">
    <li v-for="game in gameList">
      {{ game }}
    </li>
  </ul>
</template>

<script>
let gameList;
window.electron.exposeMe.VersionMgr.listAllLocalVersions('C:/Users/whoisthis/.minecraft/')
.then(value => {
  gameList = value
  console.log(gameList)
})
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