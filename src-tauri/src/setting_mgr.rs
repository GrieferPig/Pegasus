use std::fs;
use std::io::{Error, Read, Write};

use serde::{Deserialize, Serialize};
use tauri::api::path::data_dir;

const CONF_NAME: &str = "conf.json";

const DEF_CONF: SettingStruct = SettingStruct {
    version: "",
    global_game_settings: GlobalGameSettings {
        game_dirs: Vec::new(),
        selected_game_dir: "",
        mem_size: 1024,
        vm_args: String::new(),
        logging: true,
        window_x: 864,
        window_y: 480,
        fullscreen: false,
        java_exe_path: "",
        lwjgl_path: "",
    },
    launcher_settings: LauncherSettings {
        theme: "default",
        dark_mode: false,
        lang: "zh-cn",
        download_mirror: "mojang",
    },
    accounts: Accounts {
        selected_account_uuid: "",
        accounts: Vec::new(),
    },
};

pub fn create_def_conf() -> Result<bool, Error> {
    let mut conf = data_dir().unwrap();
    conf.push(".pegasus");
    fs::create_dir_all(&conf)?;
    conf.push(CONF_NAME);
    let mut conf = fs::File::create(&conf)?;
    write!(conf, "{}", serde_json::to_string(&DEF_CONF).unwrap()).expect("Failed to write to conf file");
    Ok(true)
}

pub fn write_conf(conf: &SettingStruct) -> Result<bool, Error> {
    let mut conf_path = data_dir().unwrap();
    conf_path.push(".pegasus");
    conf_path.push(CONF_NAME);
    let mut file = fs::File::open(conf_path)?;
    write!(file, "{}", serde_json::to_string(&conf).unwrap()).expect("Failed to write to conf file");
    Ok(true)
}

pub fn read_conf<'a>() -> Result<SettingStruct, Error> {
    let mut conf_path = data_dir().unwrap();
    conf_path.push(".pegasus");
    conf_path.push(CONF_NAME);
    let mut file = fs::File::open(conf_path)?;
    let mut buf = String::new();
    file.read_to_string(&mut buf);
    let buf: &'a str = buf.as_str();
    let conf = serde_json::from_str(buf).unwrap();
    Ok(conf)
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct SettingStruct {
    version: &'static str,
    global_game_settings: GlobalGameSettings,
    launcher_settings: LauncherSettings,
    accounts: Accounts,
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct GlobalGameSettings {
    game_dirs: Vec<&'static str>,
    selected_game_dir: &'static str,
    mem_size: i32,
    vm_args: String,
    logging: bool,
    window_x: i32,
    window_y: i32,
    fullscreen: bool,
    java_exe_path: &'static str,
    lwjgl_path: &'static str,
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Accounts {
    selected_account_uuid: &'static str,
    accounts: Vec<Account>,
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Account {
    username: &'static str,
    password_hashed: &'static str,
    r#type: i8,
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct LauncherSettings {
    theme: &'static str,
    dark_mode: bool,
    lang: &'static str,
    download_mirror: &'static str,
}
