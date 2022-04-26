<template>
<v-list v-if="refresh">
  <v-btn @click="combo">{{ gamePath }}</v-btn>
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

let refresh = true;

function readGameList() {
  console.log(backend.File.NOT_FOUND)
  backend.File.getGameFolder().then(path =>{
    gamePath = path
    backend.VersionMgr.listAllLocalVersions(gamePath)
        .then(value => {
          gameList = value
          if(gameList){
            console.log('yay ' + value)
            hasVer = true;
          }else{
            console.log('bruh ' + value)
            hasVer = false;
          }
        })
  })
}
function refreshPage() {
  refresh = false;
  refresh = true;
}
function combo(){
  readGameList()
  refreshPage()
}
combo()
export default {
  name: "VersionsPage",
  data(){
      return {
        gameList,
        hasVer,
        refresh,
        gamePath
      }
  },
  methods: {
    readGameList,
    combo
  }
}
</script>

<style scoped>

</style>