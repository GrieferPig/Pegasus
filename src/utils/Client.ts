import { fs, path } from "@tauri-apps/api";

export class Client {
    gameRoot: string;
    clientName: string;
    constructor(gameRoot: string, clientName: string) {
        this.gameRoot = gameRoot;
        this.clientName = clientName;
    }
    private async getClientRoot(): Promise<string> {
        return await path.join(this.gameRoot, VERSIONS_FOLDER, this.clientName);
    }
    async getClientJar(): Promise<string> {
        return await path.join(await this.getClientRoot(), this.clientName + ".jar")
    }
    async getClientJson(): Promise<string> {
        return await path.join(await this.getClientRoot(), this.clientName + ".json")
    }
    async readClientJson(): Promise<ClientJson.RootObject> {
        return JSON
            .parse(
                await fs.readTextFile(await this.getClientJson())
            ) as unknown as ClientJson.RootObject
    }
    async validate(): Promise<boolean> {
        return !!(await this.readClientJson()).id;
    }

    // here's where the juice comes in
    async concatGameArgs(gg: ClientJson.RootObject): Promise<string[]> {
        let game = gg.arguments.game
        let args: string[] = [];
        for (let item in game) {
            if ((game[item] as unknown as ClientJson.OptionalArgument).value) { // dirty hack
                console.log("conditional")
            } else {
                args.push(game[item])
            }
        }
        for (let item in args) {
            switch (args[item]) {
                case "${auth_player_name}":
                    break;

                case "${version_name}":
                    break;

                case "${game_directory}":
                    break;

                case "${assets_root}":
                    break;

                case "${assets_index_name}":
                    break;

                case "${auth_uuid}":
                    break;

                case "${auth_access_token}":
                    break;

                case "${clientid}":
                    break;

                case "${auth_xuid}":
                    break;

                case "${user_type}":
                    break;

                case "${version_type}":
                    break;

                default:
                    break;
            }
        }
        return args;
    }

    async concatLegacyArgs() {
        //TODO: Impl
    }
}

export async function scanFolder(fpath: string){
    const folderList = await fs.readDir(fpath)
    for (const folder in folderList){
        console.log(folderList[folder])
    }
}

const VERSIONS_FOLDER = 'versions'