export class Mojang{
    private static GameManifestPath: string = "https://launchermeta.mojang.com/version/"
    public static CLIENT: string = "/client"
    public static SERVER: string = "/server"
    public static JSON: string = "/json"
    public static VersionManifestPath: string = "http://launchermeta.mojang.com/mc/game/version_manifest.json"

    public static getGameManifestPath(ver: string, type:string): string {
        return this.GameManifestPath+ver+type;
    }
}