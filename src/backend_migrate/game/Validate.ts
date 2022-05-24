import path from "path";

import {readFileAsJson} from "../util/File"
import {verifySha1} from "../util/Crypto"

export function validateGame(gameRoot: string, gameName: string): boolean {
    let _gameRootPath = path.join(gameRoot, 'versions', gameName)
    let _jsonPath = path.join(_gameRootPath,  gameName + ".json")
    let _jarPath = path.join(_gameRootPath, gameName + ".jar")
    let _readJson: GameMeta.RootObject = readFileAsJson(_jsonPath) as unknown as GameMeta.RootObject
    if(_readJson.id){
        if(verifySha1(_jarPath, _readJson.downloads.client.sha1)){
            return true;
        }
    }
    return false;
}