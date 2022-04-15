// test file
//
// I hate promise
import {Grabber} from "./util/Grabber"
import {JsonUtil} from "./util/JsonUtil"
import {Bmclapi} from "./mirror/Bmclapi";
import {DetectEnv} from "./env/DetectEnv";
import Vm = VersionManifest.RootObject;
import Gm = GameManifest.RootObject; // aka G minor

const fs = require('fs')

import {getGameFolder, exist} from "./util/File"

async function fetchLatest(){
    console.log(await getGameFolder());
    console.log(await getGameFolder())
    let _b:string = await new Grabber().getRaw(Bmclapi.VersionManifestPath)
    let _json: Vm = await new JsonUtil().toJson(_b) as unknown as Vm
    console.log(_json.latest.release)
    _b = await new Grabber().getRaw(Bmclapi.getGameManifestPath(_json.latest.release, Bmclapi.JSON))
    let _json1: Gm = await new JsonUtil().toJson(_b) as unknown as Gm
    console.log(_json1.releaseTime)
    let _usrDir:any = await new DetectEnv().getOsInfo()
    await new Grabber().download(_json1.downloads.client.url, await getGameFolder(), (what:any) => {
        console.log("remaining "+what.time.remaining+", "+Math.round(what.percent*100)+"%"+", total size "+Math.round(what.size.total/1024/1024))
    })

}
fetchLatest();

