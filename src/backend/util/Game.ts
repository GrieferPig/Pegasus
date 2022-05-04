const notfs = require('fs');
const path = require("path");

import GM = GameMeta.RootObject
export function validateGame(gamePath: string, gameName: string): boolean {
    console.log(path.join(gamePath,'versions', gameName, gameName + ".json"))
    return notfs.existsSync(path.join(gamePath, 'versions', gameName, gameName + ".json"));
}

function decodeGameMeta(gamePath: string, gameName: string): GM {
    return <GameMeta.RootObject>notfs.readFileSync(
        path.join(gamePath,gameName,gameName+".json"));
}