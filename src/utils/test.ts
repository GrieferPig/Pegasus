// a test function that will be launched during app start
import { verify } from './Auth'
import { Client } from './Client'

export async function test() {
    // let cli = new Client("/home/grieferpig/.minecraft/", "1.19.2")
    // let cj = await cli.readClientJson()
    // console.log(cj);
    // console.log(await cli.concatGameArgs(cj))
    console.log("b4")
    console.log(await verify(), "GG")
    console.log("returend")
}