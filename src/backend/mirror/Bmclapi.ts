

    export const GameManifestPath: string = "https://bmclapi2.bangbang93.com/version/"
    export const CLIENT: string = "/client"
    export const SERVER: string = "/server"
    export const JSON: string = "/json"
    export const VersionManifestPath: string = "https://bmclapi2.bangbang93.com/mc/game/version_manifest.json"

    export function getGameManifestPath(ver: string, type:string): string {
        return this.GameManifestPath+ver+type;
    }
