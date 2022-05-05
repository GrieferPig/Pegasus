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

export const VERSION: string = 'version'

export async function getGameFolder(type?: string){
    let _usrDir:any = await getOsInfo()
    _usrDir = _usrDir.userHomeDir
    let _root;
    if(await exist(path.join(_usrDir, gameFolderName))){
        _root = path.join(_usrDir, gameFolderName)
    }else if(await exist(path.join(__dirname, "/../../../",gameFolderName))){
        _root = path.join(__dirname, "/../../../",gameFolderName) // cuz too lazy
    }else {
        return NOT_FOUND
    }
    switch (type) {
        case VERSION:
            return path.join(_root,'versions')
        default:
            return _root
    }
}

export async function rename(filePath: string, fileName: string, newName: string){
    await fs.renameSync(path.join(filePath,fileName),path.join(filePath,newName))
}

export async function createFolder(path: string){
    await fs.mkdirSync(path)
}