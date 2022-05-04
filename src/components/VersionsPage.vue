<template>
<v-list>
  <v-btn v-on:click="readGameList">REFRESH</v-btn>
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

let gameList;
let hasVer = false;
let gamePath;

function readGameList(){
  backend.File.getGameFolder().then(path =>{
    this.gamePath = path
    let _gamePath = this.gamePath
    backend.VersionMgr.listAllLocalVersions(this.gamePath)
        .then(value => {
          for(let i = 0; i<value.length;i++ ){
            if(!backend.Game.validateGame(_gamePath, value[i])){
              value.splice(i,1);
              i--; // go back one item bcs we deleted one. Ugh, dynamic arrays are ANNOYING
            }
          }
          this.gameList = value
          this.hasVer = !!this.gameList; // lol type converting
        })
  })
}

// these two are basically same except the latter one isn't using * this *
// there must be some workaround for this problem but im lazy
function _read(){
  backend.File.getGameFolder().then(path =>{
    gamePath = path
    let _gamePath = gamePath
    backend.VersionMgr.listAllLocalVersions(gamePath)
        .then(value => {
          for(let i = 0; i<value.length;i++ ){
            if(!backend.Game.validateGame(_gamePath, value[i])){
              value.splice(i,1);
              i--; // go back one item bcs we deleted one. Ugh, dynamic arrays are ANNOYING
            }
          }
          gameList = value
          hasVer = !!gameList; // lol type converting
        })
  })
}

_read()

export default {
  name: "VersionsPage",
  data(){
      return {
        gameList,
        hasVer,
        gamePath,
      }
  },
  methods:{
    readGameList
  },
  mounted() {
    _read() // reload list when page reloaded
  }
}
</script>

<style scoped>

</style>