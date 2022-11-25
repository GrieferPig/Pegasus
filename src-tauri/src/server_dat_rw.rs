use std::fs::File;
use std::io::{Read, Write};
use std::path::PathBuf;

use serde::{Deserialize, Serialize};

#[tauri::command]
pub fn read_server_list(path: String) -> Vec<Servers> {
    let mut pb: PathBuf = PathBuf::from(&path);
    pb.pop();
    let pb = pb.as_path().read_dir().unwrap();
    for x in pb {
        if let Ok(p) = x {
            if p.file_name().ne("server.dat") {
                File::create(&path).expect("LMFAO WAT");
                write_server_dat(&path, ServerDat { servers: vec![] });
            }
        }
    }
    let mut file;
    match File::open(&path) {
        Ok(_file) => file = _file,
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
        Ok(_bytes) => server_list = _bytes,
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

#[tauri::command]
pub fn add_server(path: String, data: Servers) -> &'static str {
    let mut server_list = read_server_list(path.clone());
    let mut data = data;
    data.icon = None;
    server_list.push(data);
    let server_list = ServerDat {
        servers: server_list,
    };
    write_server_dat(&path, server_list)
}

#[tauri::command]
pub fn del_server(path: String, index: usize) -> &'static str {
    let mut server_list = read_server_list(path.clone());
    server_list.remove(index);
    let server_list = ServerDat {
        servers: server_list,
    };
    write_server_dat(&path, server_list)
}

fn write_server_dat(path: &String, data: ServerDat) -> &'static str {
    let new_bytes;
    match fastnbt::to_bytes(&data) {
        Ok(bytes) => new_bytes = bytes,
        Err(_) => {
            return "fastnbt";
        }
    }
    let mut outfile;
    match std::fs::File::create(path) {
        Ok(file) => outfile = file,
        Err(_) => {
            return "create";
        }
    }
    match outfile.write_all(&new_bytes) {
        Ok(_) => {
            return "ok";
        }
        Err(_) => {
            return "write";
        }
    }
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
