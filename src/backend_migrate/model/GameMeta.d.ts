declare module GameMeta {

    export interface Arguments {
        game: any[];
        jvm: any[];
    }

    export interface AssetIndex {
        totalSize: number;
        id: string;
        url: string;
        sha1: string;
        size: number;
    }

    export interface JavaVersion {
        component: string;
        majorVersion: number;
    }

    export interface Artifact {
        path: string;
        url: string;
        sha1: string;
        size: number;
    }

    export interface Javadoc {
        path: string;
        url: string;
        sha1: string;
        size: number;
    }

    export interface NativesLinux {
        path: string;
        url: string;
        sha1: string;
        size: number;
    }

    export interface NativesMacos {
        path: string;
        url: string;
        sha1: string;
        size: number;
    }

    export interface NativesWindows {
        path: string;
        url: string;
        sha1: string;
        size: number;
    }

    export interface Sources {
        path: string;
        url: string;
        sha1: string;
        size: number;
    }

    export interface NativesOsx {
        path: string;
        url: string;
        sha1: string;
        size: number;
    }

    export interface Classifiers {
        javadoc: Javadoc;
        'natives-linux': NativesLinux;
        'natives-macos': NativesMacos;
        'natives-windows': NativesWindows;
        sources: Sources;
        'natives-osx': NativesOsx;
    }

    export interface Downloads {
        artifact: Artifact;
        classifiers: Classifiers;
    }

    export interface Os {
        name: string;
    }

    export interface Rule {
        action: string;
        os: Os;
    }

    export interface Natives {
        osx: string;
        linux: string;
        windows: string;
    }

    export interface Extract {
        exclude: string[];
    }

    export interface Library {
        name: string;
        downloads: Downloads;
        rules: Rule[];
        natives: Natives;
        extract: Extract;
    }

    export interface ServerMappings {
        url: string;
        sha1: string;
        size: number;
    }

    export interface Server {
        url: string;
        sha1: string;
        size: number;
    }

    export interface ClientMappings {
        url: string;
        sha1: string;
        size: number;
    }

    export interface Client {
        url: string;
        sha1: string;
        size: number;
    }

    export interface Downloads2 {
        server_mappings: ServerMappings;
        server: Server;
        client_mappings: ClientMappings;
        client: Client;
    }

    export interface File {
        id: string;
        url: string;
        sha1: string;
        size: number;
    }

    export interface Client2 {
        file: File;
        argument: string;
        type: string;
    }

    export interface Logging {
        client: Client2;
    }

    export interface Arguments2 {
        game: any[];
        jvm: any[];
    }

    export interface AssetIndex2 {
        totalSize: number;
        id: string;
        url: string;
        sha1: string;
        size: number;
    }

    export interface JavaVersion2 {
        component: string;
        majorVersion: number;
    }

    export interface Artifact2 {
        path: string;
        url: string;
        sha1: string;
        size: number;
    }

    export interface Javadoc2 {
        path: string;
        url: string;
        sha1: string;
        size: number;
    }

    export interface NativesLinux2 {
        path: string;
        url: string;
        sha1: string;
        size: number;
    }

    export interface NativesMacos2 {
        path: string;
        url: string;
        sha1: string;
        size: number;
    }

    export interface NativesWindows2 {
        path: string;
        url: string;
        sha1: string;
        size: number;
    }

    export interface Sources2 {
        path: string;
        url: string;
        sha1: string;
        size: number;
    }

    export interface NativesOsx2 {
        path: string;
        url: string;
        sha1: string;
        size: number;
    }

    export interface Classifiers2 {
        javadoc: Javadoc2;
        'natives-linux': NativesLinux2;
        'natives-macos': NativesMacos2;
        'natives-windows': NativesWindows2;
        sources: Sources2;
        'natives-osx': NativesOsx2;
    }

    export interface Downloads3 {
        artifact: Artifact2;
        classifiers: Classifiers2;
    }

    export interface Os2 {
        name: string;
    }

    export interface Rule2 {
        action: string;
        os: Os2;
    }

    export interface Natives2 {
        osx: string;
        linux: string;
        windows: string;
    }

    export interface Extract2 {
        exclude: string[];
    }

    export interface Library2 {
        name: string;
        downloads: Downloads3;
        rules: Rule2[];
        natives: Natives2;
        extract: Extract2;
    }

    export interface ServerMappings2 {
        url: string;
        sha1: string;
        size: number;
    }

    export interface Server2 {
        url: string;
        sha1: string;
        size: number;
    }

    export interface ClientMappings2 {
        url: string;
        sha1: string;
        size: number;
    }

    export interface Client3 {
        url: string;
        sha1: string;
        size: number;
    }

    export interface Downloads4 {
        server_mappings: ServerMappings2;
        server: Server2;
        client_mappings: ClientMappings2;
        client: Client3;
    }

    export interface File2 {
        id: string;
        url: string;
        sha1: string;
        size: number;
    }

    export interface Client4 {
        file: File2;
        argument: string;
        type: string;
    }

    export interface Logging2 {
        client: Client4;
    }

    export interface Patch {
        id: string;
        version: string;
        priority: number;
        arguments: Arguments2;
        mainClass: string;
        assetIndex: AssetIndex2;
        assets: string;
        complianceLevel: number;
        javaVersion: JavaVersion2;
        libraries: Library2[];
        downloads: Downloads4;
        logging: Logging2;
        type: string;
        time: Date;
        releaseTime: Date;
        minimumLauncherVersion: number;
    }

    export interface RootObject {
        id: string;
        arguments: Arguments;
        mainClass: string;
        jar: string;
        assetIndex: AssetIndex;
        assets: string;
        complianceLevel: number;
        javaVersion: JavaVersion;
        libraries: Library[];
        downloads: Downloads2;
        logging: Logging;
        type: string;
        time: Date;
        releaseTime: Date;
        minimumLauncherVersion: number;
        root: boolean;
        patches: Patch[];
    }

}

