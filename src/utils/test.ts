// a test function that will be launched during app start
import { Client } from './Client'

export async function test() {
    let cli = new Client("/home/grieferpig/.minecraft/", "1.19.2")
    let cj = await cli.readClientJson()
    console.log(cj);
    console.log(await cli.concatGameArgs(cj))
}