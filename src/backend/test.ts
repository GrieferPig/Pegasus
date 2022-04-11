// test file
//
// I hate promise
import {Grabber} from "./util/Grabber"
import {JsonUtil} from "./util/JsonUtil"
import Vm = VersionManifest.RootObject;
import Gm = GameManifest.RootObject; // aka G minor

import {Bmclapi} from "./const/Bmclapi"

const bmclapi = "https://bmclapi2.bangbang93.com/version/"

async function fetchLatest(){
    let _b:string = await new Grabber().getRaw("https://launchermeta.mojang.com/mc/game/version_manifest_v2.json")
    let _json: Vm = await new JsonUtil().toJson(_b) as unknown as Vm
    console.log(_json.latest.release)
    _b = await new Grabber().getRaw(bmclapi+_json.latest.release+"/json")
    let _json1: Gm = await new JsonUtil().toJson(_b) as unknown as Gm
    console.log(_json1.releaseTime)
    Bmclapi.getGameManifestPath(_json1.latest.release, Bmclapi.JSON)
}
fetchLatest();