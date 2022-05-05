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

<script lang="ts">
import path from "path";

const backend = globalThis.electron.exposeMe;
const Grabber = backend.Grabber
const File = backend.File

let gameList;
let hasVer = false;
let gamePath;

import Vm = VersionManifest.RootObject;
import Gm = GameManifest.RootObject;

async function testGrabberJson(){
  let _json: Vm = await Grabber.fetchVersions(Grabber.BMCLAPI)
  let _json1: Gm = await Grabber.getLatestVersionManifest(_json)
  console.log(_json1.type)
  let _gameRoot = path.join(await File.getGameFolder(File.VERSION),_json1.id);
  await File.createFolder(_gameRoot)
  await Grabber.download(_json1.downloads.client.url, _gameRoot, (what:any) => {
    console.log("remaining "+what.time.remaining+", "+Math.round(what.percent*100)+"%"+", total size "+Math.round(what.size.total/1024/1024))
  })
  await File.rename(_gameRoot,"client.jar", _json1.id+".jar")
  console.log(await Grabber.verifySHA1(path.join(_gameRoot,_json1.id+".jar"))==_json1.downloads.client.sha1)
  await Grabber.download(_json.versions.find(e => e.id == _json1.id).url, _gameRoot, (what:any) => {
    console.log("remaining "+what.time.remaining+", "+Math.round(what.percent*100)+"%"+", total size "+Math.round(what.size.total/1024/1024))
  })
  console.log(backend.Game.joinArgs(await File.getGameFolder(),_json1.id,_json1.id,_json1.id,_json1.assetIndex,'6d60982101c04f94a0988c47f3959b22','' +
      'eyJhbGciOiJIUzI1NiJ9.eyJ4dWlkIjoiMjUzNTQwNTMyNTQyMTIzNSIsImFnZyI6IkFkdWx0Iiwic3ViIjoiMzhkOTgyM2QtNDY3MC00YTZkLTk3MTMtNWFhNmIzODQzZmZkIiwibmJmIjoxNjUxNjcxNzgxLCJhdXRoIjoiWEJPWCIsInJvbGVzIjpbXSwiaXNzIjoiYXV0aGVudGljYXRpb24iLCJleHAiOjE2NTE3NTgxODEsImlhdCI6MTY1MTY3MTc4MSwicGxhdGZvcm0iOiJVTktOT1dOIiwieXVpZCI6Ijc0NzAxOWU5OGZiY2RlYTg1ZWE0YzY0ZjAzZWU5MjY4In0.p2yd2HDdAnubNOncF2-UG3IEqJY1zMJ6AyIY7PmE4wE',
      'mojang','Pegasus', false, 854,480
  ))
}

testGrabberJson()

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