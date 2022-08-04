use std::fs;
use std::io::{Read, Write};

use serde::{Deserialize, Serialize};
use tauri::api::path::data_dir;

const CONF_NAME: &str = "conf.json";

pub fn create_def_conf() -> bool {
    let mut mc_folder = data_dir().unwrap();
    mc_folder.push(".minecraft/");
    let mc_folder = String::from(mc_folder.to_str().unwrap());
    let def_conf: SettingStruct = SettingStruct {
        version: String::from(""),
        global_game_settings: GlobalGameSettings {
            game_dirs: vec![mc_folder.clone(), String::from(".")],
            selected_game_dir: mc_folder.clone(),
            mem_size: 1024,
            vm_args: String::new(),
            logging: true,
            window_x: 864,
            window_y: 480,
            fullscreen: false,
            java_exe_path: String::from(""),
            lwjgl_path: String::from(""),
        },
        launcher_settings: LauncherSettings {
            theme: String::from("default"),
            dark_mode: false,
            lang: String::from("zh-cn"),
            download_mirror: String::from("mojang"),
        },
        accounts: Accounts {
            selected_account_uuid: String::from(""),
            accounts: Vec::new(),
        },
    };
    let mut conf = data_dir().unwrap();
    conf.push(".pegasus");
    if fs::create_dir_all(&conf).is_err() {
        return false;
    }
    conf.push(CONF_NAME);
    if !fs::try_exists(&conf).unwrap() {
        let mut conf = fs::File::create(&conf).unwrap();
        write!(conf, "{}", serde_json::to_string(&def_conf).unwrap())
            .expect("Failed to write to conf file");
        true
    } else {
        false
    }
}

#[tauri::command]
pub fn write_conf(conf: SettingStruct) -> bool {
    let mut conf_path = data_dir().unwrap();
    conf_path.push(".pegasus");
    conf_path.push(CONF_NAME);
    let mut file = fs::File::create(conf_path).unwrap();
    write!(file, "{}", serde_json::to_string(&conf).unwrap())
        .expect("Failed to write to conf file");
    true
}

#[tauri::command]
pub fn read_conf() -> SettingStruct {
    let mut conf_path = data_dir().unwrap();
    conf_path.push(".pegasus");
    conf_path.push(CONF_NAME);
    let mut file = fs::File::open(conf_path).unwrap();
    let mut buf = String::new();
    file.read_to_string(&mut buf).expect("TODO: panic message");
    let conf: SettingStruct = serde_json::from_str(&buf).unwrap();
    conf
}

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(rename_all = "camelCase")]
pub struct SettingStruct {
    pub version: String,
    pub global_game_settings: GlobalGameSettings,
    pub launcher_settings: LauncherSettings,
    pub accounts: Accounts,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(rename_all = "camelCase")]
pub struct GlobalGameSettings {
    pub game_dirs: Vec<String>,
    pub selected_game_dir: String,
    pub mem_size: i32,
    pub vm_args: String,
    pub logging: bool,
    pub window_x: i32,
    pub window_y: i32,
    pub fullscreen: bool,
    pub java_exe_path: String,
    pub lwjgl_path: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Accounts {
    pub selected_account_uuid: String,
    pub accounts: Vec<Account>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Account {
    pub username: String,
    pub password_hashed: String,
    pub r#type: i8,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(rename_all = "camelCase")]
pub struct LauncherSettings {
    pub theme: String,
    pub dark_mode: bool,
    pub lang: String,
    pub download_mirror: String,
}
