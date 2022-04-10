// test file
//
// i hate promise

import {grabber} from "./util/Downloader"
import {JsonUtil} from "./util/JsonUtil"
import {DetectEnv} from './env/DetectEnv'

async function test(){
    let usr = await new DetectEnv().getOsInfo()
    let _r:number = await new grabber().download("http://baidu.com", usr.userHomeDir)
    console.log(_r)
    let _b:string = await new grabber().getRaw("https://bmclapi2.bangbang93.com/v1/packages/ed5d8789ed29872ea2ef1c348302b0c55e3f3468/1.7.10.json")
    console.log(await new JsonUtil().toJson(_b))

    console.log(await new DetectEnv().getJreInfo())
    console.log(await new DetectEnv().getOsInfo())
    console.log(await new DetectEnv().isJrePresent()) // it's 3:11 in the morning i just want to finish this as quickly as possible
}
test()