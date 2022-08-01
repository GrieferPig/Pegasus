import {BaseDirectory, createDir, readTextFile, writeFile} from '@tauri-apps/api/fs'
import {join} from "@tauri-apps/api/path";
import {getTauriVersion} from "@tauri-apps/api/app";

const CONF_FOLDER = '.pegasus'
const CONF_NAME = 'conf.json'

export async function initConf() {
    await createDir(CONF_FOLDER, {dir: BaseDirectory.Data})
    await writeConf(DEFAULT_CONF)
}

export async function readConf(): Promise<SettingStructure.RootObject> {
    return JSON.parse(await readTextFile(
        await join(CONF_FOLDER, CONF_NAME),
        {dir: BaseDirectory.Data})
    ) as unknown as SettingStructure.RootObject
}

export async function writeConf(conf: SettingStructure.RootObject) {
    await writeFile({
        path: await join(CONF_FOLDER, CONF_NAME),
        contents: JSON.stringify(conf)
    }, {dir: BaseDirectory.Data})
}

export const DEFAULT_CONF: SettingStructure.RootObject = {
    version: await getTauriVersion(),
    globalGameSettings: {
        gameDirs: [],
        selectedGameDir: "",
        memSize: 1024,
        vmArgs: "",
        logging: true,
        windowX: 864,
        windowY: 480,
        fullscreen: false,
        javaExePath: "",
        lwjglPath: ""
    },
    launcherSettings: {
        theme: "default",
        darkMode: false,
        lang: "zh-cn",
        downloadMirror: "mojang"
    },
    accounts: {
        selectedAccountUuid: "114514-1919-810-1008654088IDK",
        accounts: []
    }
}