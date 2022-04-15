// test file
//
// I hate promise (not pinkie's tho aww she's soo adorable)

import {isJrePresent, getOsInfo, getJreInfo, OsInfo} from "./util/DetectEnv"

async function testDetectEnv(){
    console.log("testing env/DetectEnv.ts: ")
    console.log("isJrePresent: "+await isJrePresent())
    console.log("getOsInfo: "+(await getOsInfo() as OsInfo).platform)
    console.log("getJreInfo: "+await getJreInfo())
}

import {getGameFolder, exist} from "./util/File"

async function testFile(){
    console.log("testing util/File.ts: ")
    console.log("exist: "+await exist("C:/"))
    console.log("getGameFolder: "+await getGameFolder())
}

import {getRaw, download} from "./util/Grabber"
import {toJson} from "./util/JsonUtil"
import {Bmclapi} from "./mirror/Bmclapi";
import Vm = VersionManifest.RootObject;
import Gm = GameManifest.RootObject; // aka G minor

async function testGrabberJson(){
    console.log("testing util/Grabber.ts, util/JsonUtil.ts: ")
    let _b:string = await getRaw(Bmclapi.VersionManifestPath)
    let _json: Vm = await toJson(_b) as unknown as Vm
    console.log("latest release of mc client: "+_json.latest.release)
    _b = await getRaw(Bmclapi.getGameManifestPath(_json.latest.release, Bmclapi.JSON))
    let _json1: Gm = await toJson(_b) as unknown as Gm
    console.log("time released: "+_json1.releaseTime)
    await download(_json1.downloads.client.url, await getGameFolder(), (what:any) => {
        console.log("remaining "+what.time.remaining+", "+Math.round(what.percent*100)+"%"+", total size "+Math.round(what.size.total/1024/1024))
    })
}

async function testAll(){
    console.log("started testing")
    await testDetectEnv()
    await testFile()
    await testGrabberJson()
}

testAll()