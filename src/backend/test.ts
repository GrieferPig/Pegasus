// test file
//
// i hate promise

import {detectJre, getOsInfo, isJrePresent} from "./env/DetectEnv";
import {download} from "./util/Downloader"

let osinfo;
getOsInfo().then(data =>{
    osinfo = data
    download("http://github.com",osinfo.userHomeDir).then(data =>{
        console.log(data)
    })
})