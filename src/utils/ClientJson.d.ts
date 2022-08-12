// Turns out typescript can handle .json files best

declare module ClientJson {

    export interface Arguments {
        game: any[];
        jvm: any[];
    }

    // Generic Rule for both game and jvm
    export interface Rule {
        action: 'allow' | 'disallow';
        features?: { [feature: string]: boolean };
        os?: {
            name?: 'osx' | 'windows' | 'linux';
            version?: string;
            arch?: string;
        };
    }

    export interface OptionalArgument {
        rules: Rule[];
        value: string | string[];
    }


    export interface AssetIndex {
        id: string;
        sha1: string;
        size: number;
        totalSize: number;
        url: string;
    }

    export interface Client {
        sha1: string;
        size: number;
        url: string;
    }

    export interface ClientMappings {
        sha1: string;
        size: number;
        url: string;
    }

    export interface Server {
        sha1: string;
        size: number;
        url: string;
    }

    export interface ServerMappings {
        sha1: string;
        size: number;
        url: string;
    }

    export interface Downloads {
        client: Client;
        client_mappings: ClientMappings;
        server: Server;
        server_mappings: ServerMappings;
    }

    export interface JavaVersion {
        component: string;
        majorVersion: number;
    }

    export interface Artifact {
        path: string;
        sha1: string;
        size: number;
        url: string;
    }

    export interface Downloads2 {
        artifact: Artifact;
    }

    export interface Os {
        name: string;
    }

    export interface Rule {
        action: string;
        os: Os;
    }

    export interface Library {
        downloads: Downloads2;
        name: string;
        rules: Rule[];
    }

    export interface File {
        id: string;
        sha1: string;
        size: number;
        url: string;
    }

    export interface Client2 {
        argument: string;
        file: File;
        type: string;
    }

    export interface Logging {
        client: Client2;
    }

    export interface RootObject {
        arguments: Arguments;
        assetIndex: AssetIndex;
        assets: string;
        complianceLevel: number;
        downloads: Downloads;
        id: string;
        javaVersion: JavaVersion;
        libraries: Library[];
        logging: Logging;
        mainClass: string;
        minimumLauncherVersion: number;
        releaseTime: Date;
        time: Date;
        type: string;
    }

}

