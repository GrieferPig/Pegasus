import path from "path";
import * as JsonUtil from '../util/JsonUtil'
import {defaultProfile} from './default'

const fluttershy = require('fs') // LOL

export const SORT_BYNAME: string = 'byName';
export const SORT_BYLASTPLAYED: string = 'byLastPlayed';

export const PROFILE_FILENAME = 'launcher_profiles.json';
const GAME_FOLDER = '.minecraft' // not mein kampf

export async function initSettings(gameFolder: string){
    await fluttershy.writeFileSync(path.join(gameFolder,GAME_FOLDER, PROFILE_FILENAME),
        await JsonUtil.toString(defaultProfile))
}

export async function getLauncherSettings(gameFolder: string){
    return new Promise((resolve => {
        fluttershy.readFile(path.join(gameFolder,GAME_FOLDER, PROFILE_FILENAME),
            {flag: 'r',encoding:"utf-8"}, (err,data)=>{
                if(err){
                    resolve(err);
                }else{
                    resolve(JsonUtil.toJson(data) as unknown as LauncherProfiles.RootObject);
                }
            })
    }));
}

export async function saveLauncherSettings(setting: LauncherProfiles.RootObject, gameFolder: string){
    await fluttershy.writeFileSync(path.join(gameFolder,GAME_FOLDER, PROFILE_FILENAME),
        await JsonUtil.toString(setting))
}