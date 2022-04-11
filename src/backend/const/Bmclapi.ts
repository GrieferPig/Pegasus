export class Bmclapi{
    const GameManifestPath: string = "https://bmclapi2.bangbang93.com/version/"
    const CLIENT: string = "/client"
    const SERVER: string = "/server"
    const JSON: string = "/json"
    public getGameManifestPath(ver: string, type:string): string {
        return this.GameManifestPath+ver+type;
    }

    const VersionManifestPath: string = "https://bmclapi2.bangbang93.com/mc/game/version_manifest.json"

}