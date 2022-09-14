use std::fs;
use std::path::PathBuf;

use tauri::api::path::data_dir;

fn _create_temp_dir() -> bool {
    let mut temp_path: PathBuf = data_dir().unwrap();
    temp_path.push(".pegasus");
    temp_path.push("downloads");
    match fs::create_dir_all(temp_path) {
        Ok(()) => true,
        Err(_) => false,
    }
}
