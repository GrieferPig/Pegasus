
export class Bmclapi{
    private static GameManifestPath: string = "https://bmclapi2.bangbang93.com/version/"
    public static CLIENT: string = "/client"
    public static SERVER: string = "/server"
    public static JSON: string = "/json"
    public static VersionManifestPath: string = "https://bmclapi2.bangbang93.com/mc/game/version_manifest.json"

    public static getGameManifestPath(ver: string, type:string): string {
        return this.GameManifestPath+ver+type;
    }
}