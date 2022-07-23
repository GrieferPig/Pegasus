#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

use std::io::Read;

use serde::{Deserialize, Serialize};
use tauri::{Menu, MenuItem};

fn main() {
    let context = tauri::generate_context!();
    tauri::Builder::default()
        .menu(Menu::new()
            .add_native_item(MenuItem::Copy)
            .add_native_item(MenuItem::Paste))
        .invoke_handler(tauri::generate_handler![read_server_list])
        .run(context)
        .expect("error while running tauri application");
}

#[tauri::command]
fn read_server_list(path: String) -> Vec<Servers> {
    let mut file;
    match std::fs::File::open(path) {
        Ok(_file) => { file = _file }
        Err(_) => {
            return vec![Servers {
                icon: None,
                ip: "error".to_string(),
                name: "cannot_open_server_dat".to_string(),
            }];
        }
    }
    let mut bytes = vec![];
    match file.read_to_end(&mut bytes) {
        Err(_) => {
            return vec![Servers {
                icon: None,
                ip: "error".to_string(),
                name: "cannot_read_server_dat".to_string(),
            }];
        }
        _ => {}
    }
    let server_list: ServerDat;
    match fastnbt::from_bytes(&bytes) {
        Ok(_bytes) => { server_list = _bytes }
        Err(_) => {
            return vec![Servers {
                icon: None,
                ip: "error".to_string(),
                name: "cannot_decode_server_dat".to_string(),
            }];
        }
    }
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
