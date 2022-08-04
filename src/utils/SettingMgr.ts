import {invoke} from "@tauri-apps/api/tauri";

export async function readConf(): Promise<SettingStructure.RootObject> {
    return await invoke("read_conf") as unknown as SettingStructure.RootObject;
}

export async function writeConf(conf: SettingStructure.RootObject) {
    await invoke("write_conf", {conf: conf})
}