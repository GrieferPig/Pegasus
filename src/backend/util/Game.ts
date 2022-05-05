const notfs = require('fs');
const path = require("path");

import * as JsonUtil from './JsonUtil'
import GM = GameMeta.RootObject
export function validateGame(gamePath: string, gameName: string): boolean {
    console.log(path.join(gamePath,'versions', gameName, gameName + ".json"))
    return notfs.existsSync(path.join(gamePath, 'versions', gameName, gameName + ".json"));
}

function decodeGameMeta(gamePath: string, gameName: string): GM {
    return JsonUtil.toJsonSync(notfs.readFileSync(
        path.join(gamePath,gameName,gameName+".json"),"utf8")) as unknown as GM
}

export const tricksFromHMCL: string = // log4j bug fix / perf?
    "-Dfile.encoding=GB18030 -XX:+UnlockExperimentalVMOptions -XX:+UseG1GC -XX:G1NewSizePercent=20 -XX:G1ReservePercent=20 -XX:MaxGCPauseMillis=50 -XX:G1HeapRegionSize=16m -XX:-UseAdaptiveSizePolicy -XX:-OmitStackTraceInFastThrow -XX:-DontCompileHugeMethods -Dfml.ignoreInvalidMinecraftCertificates=true -Dfml.ignorePatchDiscrepancies=true -Djava.rmi.server.useCodebaseOnly=true -Dcom.sun.jndi.rmi.object.trustURLCodebase=false -Dcom.sun.jndi.cosnaming.object.trustURLCodebase=false -Dlog4j2.formatMsgNoLookups=true "

export function joinArgs(gameRootPath: string, gameName: string, name: string, version: string, assetIndex:string, uuid: string, accessToken:string, userType: string, versionType: string, isDemo?: boolean, height?: number, width?: number): string{
    let _finalArgs: string = '';
    let _decoded: GM = decodeGameMeta(path.join(gameRootPath,'versions'),gameName)
    _finalArgs.concat(tricksFromHMCL)
    console.log(_decoded)
    for(let jvmArgs in _decoded.arguments.jvm){

    }
    for(let gameArgs in _decoded.arguments.game){
        let _realArg: string = _decoded.arguments.game[gameArgs]
        console.log(typeof _realArg)
        if(_realArg.includes('$')){
            switch(_realArg){
                case '${auth_player_name}':
                    gameArgs = name
                    break;
                case '${version_name}':
                    gameArgs = version
                    break;
                case '${game_directory}':
                    gameArgs = gameRootPath
                    break;
                case '${assets_root}':
                    gameArgs = path.join(gameRootPath,'assets')
                    break;
                case '${assets_index_name}':
                    gameArgs = assetIndex
                    break;
                case '${auth_uuid}':
                    gameArgs = uuid
                    break;
                case '${auth_access_token}':
                    gameArgs = accessToken
                    break;
                case '${user_type}':
                    gameArgs = userType
                    break;
                case '${version_type}':
                    gameArgs = versionType
                    break;
            }
        }
        _finalArgs = _finalArgs.concat(_realArg,' ');
    }
    if(isDemo){
        _finalArgs.concat("--demo ")
    }
    if(height){
        _finalArgs.concat("--width ", String(width), " --height ", String(height))
    }
    return _finalArgs
}