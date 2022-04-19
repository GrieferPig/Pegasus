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

import * as Grabber from "./util/Grabber"
import Vm = VersionManifest.RootObject;
import Gm = GameManifest.RootObject; // aka G minor

async function testGrabberJson(){
    let _json: Vm = await Grabber.fetchVersions(Grabber.BMCLAPI)
    let _json1: Gm = await Grabber.getLatestVersionManifest(_json)
    console.log(_json1.type)
    await Grabber.download(_json1.downloads.client.url, await getGameFolder(), (what:any) => {
        console.log("remaining "+what.time.remaining+", "+Math.round(what.percent*100)+"%"+", total size "+Math.round(what.size.total/1024/1024))
    })
}

async function isin(){
    console.log(await Grabber.isConnectedToNetwork())
    console.log(await Grabber.isInChinaMainland())
}

import * as Lp from './settings/LauncherProfiles'

async function testLauncherProfiles(){
    await Lp.initSettings((await getOsInfo() as OsInfo).userHomeDir)
    let config: LauncherProfiles.RootObject = await Lp.getLauncherSettings((await getOsInfo() as OsInfo).userHomeDir) as LauncherProfiles.RootObject
    console.log(config.settings)
}

async function testAll(){
    console.log("started testing")
    await testDetectEnv()
    await testFile()
    await testGrabberJson()
    await isin()
    await testLauncherProfiles()
}

testAll()