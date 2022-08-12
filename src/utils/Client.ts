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

const VERSIONS_FOLDER = 'versions'