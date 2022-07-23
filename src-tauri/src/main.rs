#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

use std::io::Read;

use serde::{Deserialize, Serialize};

fn main() {
    let context = tauri::generate_context!();
    tauri::Builder::default()
        .menu(tauri::Menu::os_default(&context.package_info().name))
        .invoke_handler(tauri::generate_handler![my_custom_command])
        .run(context)
        .expect("error while running tauri application");
}

#[tauri::command]
fn my_custom_command(path: String) -> Vec<Servers> {
    let mut file = std::fs::File::open(path).unwrap();
    let mut bytes = vec![];
    file.read_to_end(&mut bytes).unwrap();

    let server_list: ServerDat = fastnbt::from_bytes(&bytes).unwrap();
    server_list.servers
}

#[derive(Serialize, Deserialize)]
struct ServerDat {
    servers: Vec<Servers>,
}

#[derive(Serialize, Deserialize)]
struct Servers {
    icon: Option<String>,
    ip: String,
    name: String,
}
