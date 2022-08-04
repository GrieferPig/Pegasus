declare module SettingStructure {
    export interface GlobalGameSettings {
        gameDirs: string[];
        selectedGameDir: string;
        memSize: number;
        vmArgs: string;
        logging: boolean;
        windowX: number;
        windowY: number;
        fullscreen: boolean;
        javaExePath: string;
        lwjglPath: string;
    }

    export interface LauncherSettings {
        theme: string;
        darkMode: boolean;
        lang: string;
        downloadMirror: string;
    }

    export interface Account {
        username: string;
        passwordHashed: string;
        type: number;
    }

    export interface Accounts {
        selectedAccountUuid: string;
        accounts: Account[];
    }

    export interface RootObject {
        version: string;
        globalGameSettings: GlobalGameSettings;
        launcherSettings: LauncherSettings;
        accounts: Accounts;
    }

}
