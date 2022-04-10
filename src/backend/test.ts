// test file
//
// i hate promise
import 'reflect-metadata';

import {Grabber} from "./util/Grabber"
import {JsonUtil} from "./util/JsonUtil"
import {DetectEnv} from './env/DetectEnv'
import {JavaVersion} from "./model/GameManifest"

async function test(){
    let usr = await new DetectEnv().getOsInfo()
    let _r:number = await new Grabber().download("http://baidu.com", usr.userHomeDir)
    console.log(_r)
    let _b:string = await new Grabber().getRaw("https://bmclapi2.bangbang93.com/v1/packages/ed5d8789ed29872ea2ef1c348302b0c55e3f3468/1.7.10.json")
    let _json: JSON = await new JsonUtil().toJson(_b)
    console.log(await new DetectEnv().getJreInfo())
    console.log(await new DetectEnv().getOsInfo())
    console.log(await new DetectEnv().isJrePresent()) // it's 3:11 in the morning i just want to finish this as quickly as possible
    console.log(_json['javaVersion'] as JavaVersion) 
    let _wtf:JavaVersion = <JavaVersion>_json['javaVersion']
    console.log(_wtf.majorVersion)
}
test()