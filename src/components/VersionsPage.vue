<template>
<v-list :key="componentKey">
  <v-btn v-on:click="readGameList()">GamePath = {{ gamePath }}</v-btn>
  <v-list-subheader v-if="hasVer">Installed Versions</v-list-subheader>
  <v-list-subheader v-if="!hasVer">No valid installed versions detected.</v-list-subheader>
  <v-list-item
      v-for="(games, i) in gameList"
      :key="i"
      :value="games"
      active-color="primary"
      rounded="s"
  >
    <v-list-item-title v-text="games"></v-list-item-title>
  </v-list-item>
</v-list>
</template>

<script>
const backend = window.electron.exposeMe;

export let gameList;
export let hasVer = false;
export let gamePath;

function readGameList() {
  backend.File.getGameFolder().then(path =>{
    gamePath = path
    backend.VersionMgr.listAllLocalVersions(gamePath)
        .then(value => {
          gameList = value
         gameList.forEach(function(item, index){
           if(!backend.Game.validateGame(gamePath, item)){
             gameList.splice(index,1);
             console.log('devalidated '+item+' at '+index+gameList)
           }
         })
          if(gameList){
            hasVer = true;
          }else{
            hasVer = false;
          }
          this.forceRerender()
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
        gamePath,
        componentKey: 0,
      }
  },
  methods: {
    readGameList,
    forceRerender() {
      this.componentKey += 1;
    }
  }
}
</script>

<style scoped>

</style>