<template>
  {{  }}
</template>

<script>

const backend = window.electron.exposeMe;
let gamePath, gameList;

function readGameList() {
  backend.File.getGameFolder().then(path =>{
    gamePath = path
    backend.VersionMgr.listAllLocalVersions(gamePath)
        .then(value => {
          gameList = value
        })
  })
}

export default {
  name: 'LaunchPage',
  data(){
    return{

    }
  }
}
</script>
