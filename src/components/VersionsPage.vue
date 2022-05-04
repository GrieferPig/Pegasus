<template>
<v-list>
  <h3>{{ gamePath }}</h3>
  <v-list-subheader v-if="hasVer">Installed Versions</v-list-subheader>
  <v-list-subheader v-if="!hasVer">No installed versions detected.</v-list-subheader>
  <v-list-item
      v-for="(games, i) in gameList"
      :key="i"
      :value="games"
      active-color="primary"
      rounded="xl"
  >
    <v-list-item-title v-text="games"></v-list-item-title>
  </v-list-item>
</v-list>
</template>

<script>
const backend = window.electron.exposeMe;

let gameList;
let hasVer = false;
let gamePath;

function readGameList() {
  backend.File.getGameFolder().then(path =>{
    gamePath = path
    backend.VersionMgr.listAllLocalVersions(gamePath)
        .then(value => {
          gameList = value
          if(gameList){
            hasVer = true;
          }else{
            hasVer = false;
          }
        })
  })
}
readGameList()
export default {
  name: "VersionsPage",
  data(){
      return {
        gameList,
        hasVer,
        gamePath
      }
  },
  methods: {
    readGameList,
  }
}
</script>

<style scoped>

</style>