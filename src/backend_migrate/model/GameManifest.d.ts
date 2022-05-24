declare module GameManifest {

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

    export interface Server {
        sha1: string;
        size: number;
        url: string;
    }

    export interface WindowsServer {
        sha1: string;
        size: number;
        url: string;
    }

    export interface Downloads {
        client: Client;
        server: Server;
        windows_server: WindowsServer;
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

    export interface NativesLinux {
        path: string;
        sha1: string;
        size: number;
        url: string;
    }

    export interface NativesOsx {
        path: string;
        sha1: string;
        size: number;
        url: string;
    }

    export interface NativesWindows {
        path: string;
        sha1: string;
        size: number;
        url: string;
    }

    export interface NativesWindows32 {
        path: string;
        sha1: string;
        size: number;
        url: string;
    }

    export interface NativesWindows64 {
        path: string;
        sha1: string;
        size: number;
        url: string;
    }

    export interface Classifiers {
        'natives-linux': NativesLinux;
        'natives-osx': NativesOsx;
        'natives-windows': NativesWindows;
        'natives-windows-32': NativesWindows32;
        'natives-windows-64': NativesWindows64;
    }

    export interface Downloads2 {
        artifact: Artifact;
        classifiers: Classifiers;
    }

    export interface Extract {
        exclude: string[];
    }

    export interface Natives {
        linux: string;
        osx: string;
        windows: string;
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
        extract: Extract;
        natives: Natives;
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
        assetIndex: AssetIndex;
        assets: string;
        complianceLevel: number;
        downloads: Downloads;
        id: string;
        javaVersion: JavaVersion;
        libraries: Library[];
        logging: Logging;
        mainClass: string;
        minecraftArguments: string;
        minimumLauncherVersion: number;
        releaseTime: Date;
        time: Date;
        type: string;
    }

}

