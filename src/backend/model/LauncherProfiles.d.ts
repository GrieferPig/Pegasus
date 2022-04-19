// def of LauncherProfiles.json in .meinkampf
// all available options are def-ed
// to fully compatible with original launcher

declare module LauncherProfiles {
    export interface Profiles {
        name: string;
        type: string;
        created: string;
        lastUsed: string;
        icon: string;
        lastVersionId: string
        gameDir: string;
        javaDir: string;
        javaArgs: string;
        logConfig: string;
        logConfigIsXML: boolean;
    }

    export interface LauncherVersion {
        name: string;
        format: number;
        profilesFormat: number;
    }

    export interface Settings {
        enableSnapshots: boolean;
        enableAdvanced: boolean;
        keepLauncherOpen: boolean;
        showGameLog: boolean;
        locale: string;
        showMenu: boolean;
        enableHistorical: boolean;
        profileSorting: string;
        crashAssistance: boolean;
        enableAnalytics: boolean;
    }

    export interface RootObject {
        selectedProfile: string;
        profiles: Profiles[];
        clientToken: string;
        launcherVersion: LauncherVersion;
        settings: Settings;
    }

}
