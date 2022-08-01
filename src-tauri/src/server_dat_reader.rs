use std::fs::File;
use std::io::Read;

use serde::{Deserialize, Serialize};

#[tauri::command]
pub fn read_server_list(path: String) -> Vec<Servers> {
    let mut file;
    match File::open(path) {
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
pub struct ServerDat {
    pub servers: Vec<Servers>,
}

#[derive(Serialize, Deserialize)]
pub struct Servers {
    pub icon: Option<String>,
    pub ip: String,
    pub name: String,
}