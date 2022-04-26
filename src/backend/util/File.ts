import {getOsInfo} from "./DetectEnv";
import path from "path";

const fs = require("fs")
const gameFolderName: string = "/.minecraft/"

export const NOT_FOUND: string = "not found"

export async function exist(filename: string){
    try{
        fs.accessSync(filename)
    }catch(sayonara){
        return false;
    }
    return true;
}

export async function getGameFolder(): Promise<string> {
    let _usrDir:any = await getOsInfo()
    _usrDir = _usrDir.userHomeDir
    if(await exist(path.join(_usrDir, gameFolderName))){
        return path.join(_usrDir, gameFolderName)
    }else if(await exist(path.join(__dirname, "/../../../",gameFolderName))){
        return path.join(__dirname, "/../../../",gameFolderName) // cuz too lazy
    }else {
        return NOT_FOUND
    }
}