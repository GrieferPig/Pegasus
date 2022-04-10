declare module VersionManifest {

    export interface Latest {
        release: string;
        snapshot: string;
    }

    export interface Version {
        id: string;
        type: string;
        url: string;
        time: Date;
        releaseTime: Date;
        sha1: string;
        complianceLevel: number;
    }

    export interface RootObject {
        latest: Latest;
        versions: Version[];
    }

}

