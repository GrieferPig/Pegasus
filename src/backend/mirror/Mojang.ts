
export const GameManifestPath: string = "https://launchermeta.mojang.com/version/"
export const  CLIENT: string = "/client"
export const  SERVER: string = "/server"
export const  JSON: string = "/json"
export const  VersionManifestPath: string = "http://launchermeta.mojang.com/mc/game/version_manifest.json"

    export function getGameManifestPath(ver: string, type:string): string {
        return this.GameManifestPath+ver+type;
    }