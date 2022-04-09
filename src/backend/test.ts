// test file
//
// i hate promise

import {detectJre, getOsInfo, isJrePresent} from "./env/DetectEnv";
import {download, getRaw} from "./util/Downloader"

getRaw("https://launchermeta.mojang.com/mc/game/version_manifest_v2.json").then(data=>{
    // @ts-ignore I know what I'm doing
    console.log(data.toString())
})